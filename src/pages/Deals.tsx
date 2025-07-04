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
import { MapPin, Calendar, Tag, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Deals = () => {
    const [deals, setDeals] = useState<ExpiringDeal[]>([]);
    const [filteredDeals, setFilteredDeals] = useState<ExpiringDeal[]>([]);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("expiry");
    const [isLoading, setIsLoading] = useState(true);

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
                    image: "/placeholder.svg",
                    expiryDate: "2024-06-25",
                    originalPrice: 4.99,
                    discountedPrice: 2.49,
                    retailer: {
                        name: "FreshMart",
                        location: "123 Main St, Downtown",
                    },
                    category: "dairy",
                },
                {
                    id: "2",
                    name: "Banana Bundle (6 pcs)",
                    image: "/placeholder.svg",
                    expiryDate: "2024-06-24",
                    originalPrice: 3.99,
                    discountedPrice: 1.99,
                    retailer: {
                        name: "Green Grocer",
                        location: "456 Oak Ave, Uptown",
                    },
                    category: "fruits",
                },
                {
                    id: "3",
                    name: "Whole Wheat Bread",
                    image: "/placeholder.svg",
                    expiryDate: "2024-06-26",
                    originalPrice: 2.99,
                    discountedPrice: 1.49,
                    retailer: {
                        name: "Corner Bakery",
                        location: "789 Pine St, Midtown",
                    },
                    category: "bakery",
                },
                {
                    id: "4",
                    name: "Greek Yogurt 4-pack",
                    image: "/placeholder.svg",
                    expiryDate: "2024-06-27",
                    originalPrice: 6.99,
                    discountedPrice: 3.99,
                    retailer: {
                        name: "FreshMart",
                        location: "123 Main St, Downtown",
                    },
                    category: "dairy",
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

    const handleViewOffer = (deal: ExpiringDeal) => {
        // TODO: API Call to track deal click
        console.log("API Call: POST /deals/track-click", { dealId: deal.id });

        toast({
            title: "Redirecting to Retailer",
            description: `Opening ${deal.retailer.name} deal page...`,
        });
    };

    if (isLoading) {
        return (
            <AppLayout>
                <div className="space-y-6 mx-auto">
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
            <div className="space-y-6 mx-auto">
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

                            return (
                                <Card
                                    key={deal.id}
                                    className="hover:shadow-lg transition-shadow"
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">
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
                                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                            <span className="text-4xl">📦</span>
                                        </div>

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
                                                <Badge
                                                    variant="outline"
                                                    className="capitalize"
                                                >
                                                    {deal.category}
                                                </Badge>
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
                                                        {deal.retailer.location}
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                onClick={() =>
                                                    handleViewOffer(deal)
                                                }
                                                className="w-full bg-orange-600 hover:bg-orange-700"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                View Offer
                                            </Button>
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
            </div>
        </AppLayout>
    );
};

export default Deals;
