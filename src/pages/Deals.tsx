import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { ExpiringDeal } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, ShoppingCart } from "lucide-react";
import PullToRefresh from "react-pull-to-refresh";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const Deals = () => {
    const [deals, setDeals] = useState<ExpiringDeal[]>([]);
    const [filteredDeals, setFilteredDeals] = useState<ExpiringDeal[]>([]);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("expiry");
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<ExpiringDeal | null>(null);
    const [desiredQty, setDesiredQty] = useState<number>(1);

    const { addToCart } = useCart();

    const categories = [
        "all",
        "dairy",
        "fruits",
        "vegetables",
        "meat",
        "bakery",
        "beverages",
    ];

    useEffect(() => {
        fetchExpiringDeals();
    }, []);

    useEffect(() => {
        filterAndSortDeals();
    }, [deals, categoryFilter, sortBy]);

    const fetchExpiringDeals = async () => {
        try {
            // TODO: API Call to GET /deals/expiring endpoint
            console.log("API Call: GET /deals/expiring");

            // Mock data - replace with actual API call
            const mockDeals: ExpiringDeal[] = [
                {
                    id: "1",
                    name: "Organic Milk 1L",
                    image: "/deals/milk.png",
                    expiryDate: "2025-06-25",
                    originalPrice: 4.99,
                    discountedPrice: 2.49,
                    retailer: {
                        name: "FreshMart",
                        location: "123 Main St, Downtown",
                    },
                    category: "dairy",
                    quantityLeft: 7,
                },
                {
                    id: "2",
                    name: "Banana Bundle (6 pcs)",
                    image: "/deals/banana.png",
                    expiryDate: "2025-06-24",
                    originalPrice: 3.99,
                    discountedPrice: 1.99,
                    retailer: {
                        name: "Green Grocer",
                        location: "456 Oak Ave, Uptown",
                    },
                    category: "fruits",
                    quantityLeft: 12,
                },
                {
                    id: "3",
                    name: "Whole Wheat Bread",
                    image: "/deals/bread.png",
                    expiryDate: "2025-06-26",
                    originalPrice: 2.99,
                    discountedPrice: 1.49,
                    retailer: {
                        name: "Corner Bakery",
                        location: "789 Pine St, Midtown",
                    },
                    category: "bakery",
                    quantityLeft: 3,
                },
                {
                    id: "4",
                    name: "Greek Yogurt 4-pack",
                    image: "/deals/yogurt.png",
                    expiryDate: "2025-06-27",
                    originalPrice: 6.99,
                    discountedPrice: 3.99,
                    retailer: {
                        name: "FreshMart",
                        location: "123 Main St, Downtown",
                    },
                    category: "dairy",
                    quantityLeft: 0,
                },
            ];

            setDeals(mockDeals);
        } catch (error) {
            console.error("Failed to fetch expiring deals:", error);
            toast({
                title: "Error",
                description: "Failed to load expiring deals",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const filterAndSortDeals = () => {
        let filtered = deals;

        // Filter by category
        if (categoryFilter !== "all") {
            filtered = filtered.filter(
                (deal) => deal.category === categoryFilter
            );
        }

        // Sort deals
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "expiry":
                    return (
                        new Date(a.expiryDate).getTime() -
                        new Date(b.expiryDate).getTime()
                    );
                case "discount":
                    const discountA =
                        ((a.originalPrice - a.discountedPrice) /
                            a.originalPrice) *
                        100;
                    const discountB =
                        ((b.originalPrice - b.discountedPrice) /
                            b.originalPrice) *
                        100;
                    return discountB - discountA;
                case "price":
                    return a.discountedPrice - b.discountedPrice;
                default:
                    return 0;
            }
        });

        setFilteredDeals(filtered);
    };

    const calculateDiscount = (original: number, discounted: number) => {
        return Math.round(((original - discounted) / original) * 100);
    };

    const getDaysUntilExpiry = (expiryDate: string) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const handleAddToCart = (deal: ExpiringDeal, qty: number = 1) => {
        // TODO: API Call to POST /cart/add
        console.log("API Call: POST /cart/add", { dealId: deal.id, qty });
        addToCart(deal, qty);
    };

    const openDetails = (deal: ExpiringDeal) => {
        setSelectedDeal(deal);
        setDesiredQty(1);
        setIsDialogOpen(true);
    };

    if (isLoading) {
        return (
            <AppLayout>
                <div className="p-6 max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-gray-200 rounded-lg h-64"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Expiring Deals 🛒
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Discover discounted groceries from partner retailers
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
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

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="expiry">Expiry Date</SelectItem>
                            <SelectItem value="discount">
                                Highest Discount
                            </SelectItem>
                            <SelectItem value="price">Lowest Price</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <PullToRefresh
                    onRefresh={async () => {
                        // TODO: GET /deals/expiring (latest)
                        await fetchExpiringDeals();
                        toast({
                            title: "Refreshed",
                            description: "Latest deals loaded.",
                        });
                    }}
                >
                    {/* Deals Grid */}
                    {filteredDeals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDeals.map((deal) => {
                                const discount = calculateDiscount(
                                    deal.originalPrice,
                                    deal.discountedPrice
                                );
                                const daysLeft = getDaysUntilExpiry(
                                    deal.expiryDate
                                );
                                const soldOut = (deal.quantityLeft ?? 0) <= 0;
                                return (
                                    <Card
                                        key={deal.id}
                                        className="hover:shadow-lg transition-shadow"
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-lg line-clamp-2 mr-2">
                                                    {deal.name}
                                                </CardTitle>
                                                <Badge
                                                    variant="destructive"
                                                    className="bg-red-100 text-red-700"
                                                >
                                                    {discount}% OFF
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <button
                                                className="w-full"
                                                onClick={() =>
                                                    openDetails(deal)
                                                }
                                                aria-label={`View details of ${deal.name}`}
                                            >
                                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                                                    <img
                                                        src={deal.image}
                                                        alt={deal.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                                                        }}
                                                    />
                                                </div>
                                            </button>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-2xl font-bold text-green-600">
                                                            $
                                                            {deal.discountedPrice.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                        <span className="text-sm text-gray-500 line-through ml-2">
                                                            $
                                                            {deal.originalPrice.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge
                                                            variant="outline"
                                                            className="capitalize"
                                                        >
                                                            {deal.category}
                                                        </Badge>
                                                        <div
                                                            className={`text-xs mt-1 ${
                                                                soldOut
                                                                    ? "text-red-600"
                                                                    : "text-muted-foreground"
                                                            }`}
                                                        >
                                                            {soldOut
                                                                ? "Sold out"
                                                                : `${
                                                                      deal.quantityLeft ??
                                                                      "—"
                                                                  } left`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar size={16} />
                                                    <span>
                                                        Expires{" "}
                                                        {daysLeft === 0
                                                            ? "today"
                                                            : daysLeft === 1
                                                            ? "tomorrow"
                                                            : `in ${daysLeft} days`}
                                                    </span>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                                    <MapPin
                                                        size={16}
                                                        className="mt-0.5 flex-shrink-0"
                                                    />
                                                    <div>
                                                        <div className="font-medium">
                                                            {deal.retailer.name}
                                                        </div>
                                                        <div>
                                                            {
                                                                deal.retailer
                                                                    .location
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                deal
                                                            )
                                                        }
                                                        className="w-full"
                                                        disabled={soldOut}
                                                    >
                                                        <ShoppingCart className="mr-2 h-4 w-4" />{" "}
                                                        Add to cart
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            openDetails(deal)
                                                        }
                                                    >
                                                        Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🛒</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No deals found
                            </h3>
                            <p className="text-gray-600">
                                {categoryFilter !== "all"
                                    ? "Try selecting a different category"
                                    : "Check back later for new expiring deals"}
                            </p>
                        </div>
                    )}

                    {/* Deal Details Modal */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{selectedDeal?.name}</DialogTitle>
                                <DialogDescription>
                                    {selectedDeal?.retailer.name} •{" "}
                                    {selectedDeal?.retailer.location}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xl font-semibold">
                                            $
                                            {selectedDeal?.discountedPrice.toFixed(
                                                2
                                            )}
                                        </span>
                                        <span className="text-sm text-muted-foreground line-through ml-2">
                                            $
                                            {selectedDeal?.originalPrice.toFixed(
                                                2
                                            )}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {selectedDeal?.quantityLeft ?? "—"} left
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label htmlFor="qty" className="text-sm">
                                        Quantity
                                    </label>
                                    <input
                                        id="qty"
                                        type="number"
                                        min={1}
                                        max={
                                            selectedDeal?.quantityLeft ??
                                            undefined
                                        }
                                        value={desiredQty}
                                        onChange={(e) =>
                                            setDesiredQty(
                                                Math.max(
                                                    1,
                                                    Number(e.target.value)
                                                )
                                            )
                                        }
                                        className="w-24 border rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (selectedDeal) {
                                            handleAddToCart(
                                                selectedDeal,
                                                desiredQty
                                            );
                                            setIsDialogOpen(false);
                                        }
                                    }}
                                >
                                    Add to cart
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </PullToRefresh>
            </div>
        </AppLayout>
    );
};

export default Deals;
