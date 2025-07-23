import React, { useState, useEffect, useRef } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { PantryItemCard } from "@/components/Pantry/PantryItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Camera, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { PantryItem, Category } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import {
    listPantryItems,
    addPantryItems,
    updatePantryItem,
    deletePantryItems,
} from "@/api/pantry";
import { getReceiptPresignedUrl } from "@/api/receipt";
import LoadingOverlay from "@/components/Pantry/LoadingOverlay";

const Pantry = () => {
    const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<PantryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { userId, token } = useAuth();

    // Form state for add/edit item
    const [itemForm, setItemForm] = useState({
        name: "",
        category: "",
        quantity: 1,
        purchaseDate: "",
        expiryDate: "",
    });

    const cameraInputRef = useRef<HTMLInputElement | null>(null);
    const galleryInputRef = useRef<HTMLInputElement | null>(null);

    const categories = [
        "all",
        "dairy",
        "fruits",
        "vegetables",
        "meat",
        "grains",
        "beverages",
        "snacks",
        "other",
    ];

    useEffect(() => {
        fetchPantryItems();
    }, []);

    useEffect(() => {
        filterItems();
    }, [pantryItems, searchTerm, categoryFilter]);

    const fetchPantryItems = async () => {
        if (!userId) return;
        try {
            const items = await listPantryItems(userId, token);
            setPantryItems(items);
        } catch (error) {
            console.error("Failed to fetch pantry items:", error);
            toast({
                title: "Error",
                description: "Failed to load pantry items",
                variant: "destructive",
            });
        }
    };

    const filterItems = () => {
        let filtered = pantryItems;

        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter !== "all") {
            filtered = filtered.filter(
                (item) => item.category === categoryFilter
            );
        }

        setFilteredItems(filtered);
    };

    const handleAddItem = async () => {
        if (!userId) return;
        try {
            const payload = {
                item_name: itemForm.name,
                quantity: itemForm.quantity,
                unit: "pieces" as const,
                category: itemForm.category
                    ? ((itemForm.category.charAt(0).toUpperCase() +
                          itemForm.category.slice(1)) as Category)
                    : undefined,
                purchase_date: itemForm.purchaseDate || undefined,
                expiry_date: itemForm.expiryDate || undefined,
            };
            const added = await addPantryItems(userId, token, [payload]);
            setPantryItems([...pantryItems, ...added]);
            setItemForm({
                name: "",
                category: "",
                quantity: 1,
                purchaseDate: "",
                expiryDate: "",
            });
            setIsAddModalOpen(false);

            toast({
                title: "Success",
                description: "Item added to pantry",
            });
        } catch (error) {
            console.error("Failed to add item:", error);
            toast({
                title: "Error",
                description: "Failed to add item",
                variant: "destructive",
            });
        }
    };

    const handleEditItem = (item: PantryItem) => {
        setEditingItem(item);
        setItemForm({
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            purchaseDate: item.purchaseDate,
            expiryDate: item.expiryDate,
        });
        setIsAddModalOpen(true);
    };

    const handleUpdateItem = async () => {
        if (!editingItem || !userId) return;

        try {
            const payload = {
                item_id: Number(editingItem.id),
                item_name: itemForm.name,
                quantity: itemForm.quantity,
                unit: "pieces" as const,
                category: itemForm.category
                    ? ((itemForm.category.charAt(0).toUpperCase() +
                          itemForm.category.slice(1)) as Category)
                    : undefined,
                purchase_date: itemForm.purchaseDate || undefined,
                expiry_date: itemForm.expiryDate || undefined,
            };
            const updated = await updatePantryItem(userId, token, payload);
            const updatedItems = pantryItems.map(
                (item): PantryItem =>
                    item.id === editingItem.id ? updated : item
            );

            setPantryItems(updatedItems);
            setItemForm({
                name: "",
                category: "",
                quantity: 1,
                purchaseDate: "",
                expiryDate: "",
            });
            setEditingItem(null);
            setIsAddModalOpen(false);

            toast({
                title: "Success",
                description: "Item updated successfully",
            });
        } catch (error) {
            console.error("Failed to update item:", error);
            toast({
                title: "Error",
                description: "Failed to update item",
                variant: "destructive",
            });
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!userId) return;
        try {
            await deletePantryItems(userId, token, [Number(id)]);

            setPantryItems(pantryItems.filter((item) => item.id !== id));

            toast({
                title: "Success",
                description: "Item deleted from pantry",
            });
        } catch (error) {
            console.error("Failed to delete item:", error);
            toast({
                title: "Error",
                description: "Failed to delete item",
                variant: "destructive",
            });
        }
    };

    const handleScanReceipt = () => {
        cameraInputRef.current?.click();
    };

    const handleUploadReceipt = () => {
        galleryInputRef.current?.click();
    };

    const handleReceiptSelected = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file || !userId) return;
        // Request a presigned URL from the backend and upload the receipt
        try {
            const url = await getReceiptPresignedUrl(userId, token);
            if (!url) {
                toast({
                    title: "Error",
                    description: "Failed to obtain upload URL",
                    variant: "destructive",
                });
                return;
            }
            await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });

            toast({
                title: "Upload Success",
                description: "Receipt uploaded. Processing...",
            });

            // Show a short loading screen while the backend processes the receipt
            setIsProcessing(true);

            // Give the backend a brief moment to store the parsed items,
            // then refresh the pantry list automatically.
            setTimeout(() => {
                fetchPantryItems().catch((err) =>
                    console.error("Failed to refresh pantry items:", err)
                );
                setIsProcessing(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to upload receipt:", error);
            toast({
                title: "Error",
                description: "Failed to upload receipt",
                variant: "destructive",
            });
        }
    };

    return (
        <AppLayout>
            {isProcessing && <LoadingOverlay message="Processing receipt..." />}
            <div className="pt-2 space-y-6 mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Pantry 🧺
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your grocery inventory and track expiry dates
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <Input
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                    >
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category === "all"
                                        ? "All Categories"
                                        : category.charAt(0).toUpperCase() +
                                          category.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Items Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {filteredItems.map((item) => (
                            <PantryItemCard
                                key={item.id}
                                item={item}
                                onEdit={handleEditItem}
                                onDelete={handleDeleteItem}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🧺</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No items found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || categoryFilter !== "all"
                                ? "Try adjusting your search or filter"
                                : "Start by adding some items to your pantry"}
                        </p>
                    </div>
                )}

                {/* Floating Add Button */}
                <Dialog
                    open={isAddModalOpen}
                    onOpenChange={(open) => {
                        setIsAddModalOpen(open);
                        if (!open) {
                            setEditingItem(null);
                            setItemForm({
                                name: "",
                                category: "",
                                quantity: 1,
                                purchaseDate: "",
                                expiryDate: "",
                            });
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <Button
                            className="fixed bottom-24 right-6 md:bottom-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
                            size="icon"
                        >
                            <Plus size={24} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {editingItem ? "Edit Item" : "Add New Item"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Item Name</Label>
                                <Input
                                    id="name"
                                    value={itemForm.name}
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., Milk, Bananas"
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={itemForm.category}
                                    onValueChange={(value) =>
                                        setItemForm({
                                            ...itemForm,
                                            category: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.slice(1).map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    category.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={itemForm.quantity}
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            quantity:
                                                parseInt(e.target.value) || 1,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="purchaseDate">
                                    Purchase Date
                                </Label>
                                <Input
                                    id="purchaseDate"
                                    type="date"
                                    value={itemForm.purchaseDate}
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            purchaseDate: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                    id="expiryDate"
                                    type="date"
                                    value={itemForm.expiryDate}
                                    onChange={(e) =>
                                        setItemForm({
                                            ...itemForm,
                                            expiryDate: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4">
                                <Button
                                    onClick={
                                        editingItem
                                            ? handleUpdateItem
                                            : handleAddItem
                                    }
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    disabled={
                                        !itemForm.name || !itemForm.category
                                    }
                                >
                                    {editingItem ? "Update Item" : "Add Item"}
                                </Button>
                                <Button
                                    onClick={handleScanReceipt}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Camera size={16} />
                                    Scan
                                </Button>
                                <Button
                                    onClick={handleUploadReceipt}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <ImageIcon size={16} />
                                    Gallery
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                    <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleReceiptSelected}
                    />
                    <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleReceiptSelected}
                    />
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Pantry;
