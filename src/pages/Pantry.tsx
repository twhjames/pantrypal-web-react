import React, { useState, useEffect } from "react";
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
import { Plus, Search, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { PantryItem } from "@/types";

const Pantry = () => {
    const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<PantryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PantryItem | null>(null);

    // Form state for add/edit item
    const [itemForm, setItemForm] = useState({
        name: "",
        category: "",
        quantity: 1,
        purchaseDate: "",
        expiryDate: "",
    });

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
        try {
            // TODO: API Call to GET /pantry/items endpoint
            console.log("API Call: GET /pantry/items");

            // Mock data - replace with actual API call
            const mockItems: PantryItem[] = [
                {
                    id: "1",
                    name: "Milk",
                    category: "dairy",
                    quantity: 1,
                    purchaseDate: "2024-06-20",
                    expiryDate: "2024-06-25",
                    status: "expiring-today",
                },
                {
                    id: "2",
                    name: "Bananas",
                    category: "fruits",
                    quantity: 6,
                    purchaseDate: "2024-06-21",
                    expiryDate: "2024-06-26",
                    status: "expiring-soon",
                },
                {
                    id: "3",
                    name: "Bread",
                    category: "grains",
                    quantity: 1,
                    purchaseDate: "2024-06-22",
                    expiryDate: "2024-06-28",
                    status: "fresh",
                },
                {
                    id: "4",
                    name: "Yogurt",
                    category: "dairy",
                    quantity: 4,
                    purchaseDate: "2024-06-19",
                    expiryDate: "2024-06-30",
                    status: "fresh",
                },
            ];
            setPantryItems(mockItems);
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
        try {
            // TODO: API Call to POST /pantry/items endpoint
            console.log("API Call: POST /pantry/items", itemForm);

            const newItem: PantryItem = {
                id: Date.now().toString(),
                ...itemForm,
                status: "fresh", // Backend will calculate actual status
            };

            setPantryItems([...pantryItems, newItem]);
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
        if (!editingItem) return;

        try {
            // TODO: API Call to PUT /pantry/items/{id} endpoint
            console.log(
                "API Call: PUT /pantry/items/" + editingItem.id,
                itemForm
            );

            const updatedItems = pantryItems.map(
                (item): PantryItem =>
                    item.id === editingItem.id
                        ? { ...item, ...itemForm, status: "fresh" }
                        : item
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
        try {
            // TODO: API Call to DELETE /pantry/items/{id} endpoint
            console.log("API Call: DELETE /pantry/items/" + id);

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
        // TODO: API Call to POST /pantry/scan-receipt endpoint
        console.log("API Call: POST /pantry/scan-receipt");
        toast({
            title: "Feature Coming Soon",
            description: "Receipt scanning will be available soon!",
        });
    };

    return (
        <AppLayout>
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
                            <div className="flex gap-2 pt-4">
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
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Pantry;
