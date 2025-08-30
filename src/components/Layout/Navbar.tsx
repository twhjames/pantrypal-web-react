import React from "react";
import {
    Home,
    Package,
    ChefHat,
    ShoppingCart,
    Settings,
    ShoppingBag,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

const navigationItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Package, label: "Pantry", path: "/pantry" },
    { icon: ChefHat, label: "Recipes", path: "/recipes" },
    { icon: ShoppingBag, label: "Expiring Deals", path: "/deals" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", showBadge: true },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalItems } = useCart();

    return (
        <>
            {/* Desktop Sticky Header */}
            <header className="hidden md:block bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="px-4 py-3 max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-green-600">
                                PantryPal
                            </h1>
                        </div>
                        <nav className="flex items-center gap-2">
                            {navigationItems.map(
                                ({ icon: Icon, label, path, showBadge }) => {
                                    const isActive = location.pathname === path;
                                    return (
                                        <button
                                            key={path}
                                            onClick={() => navigate(path)}
                                            className={cn(
                                                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium",
                                                isActive
                                                    ? "bg-green-50 text-green-600"
                                                    : "text-gray-700 hover:bg-gray-50"
                                            )}
                                        >
                                            <div className="relative">
                                                <Icon size={18} />
                                                {showBadge &&
                                                    totalItems > 0 && (
                                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                            {totalItems > 99
                                                                ? "99+"
                                                                : totalItems}
                                                        </span>
                                                    )}
                                            </div>
                                            <span>{label}</span>
                                        </button>
                                    );
                                }
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
                <div className="flex items-center justify-between w-full">
                    {navigationItems.map(
                        ({ icon: Icon, label, path, showBadge }) => {
                            const isActive = location.pathname === path;
                            return (
                                <button
                                    key={path}
                                    onClick={() => navigate(path)}
                                    className={cn(
                                        "flex-1 flex flex-col items-center p-2 transition-colors",
                                        isActive
                                            ? "text-green-600 bg-green-50"
                                            : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    <div className="relative">
                                        <Icon size={20} />
                                        {showBadge && totalItems > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {totalItems > 99
                                                    ? "99+"
                                                    : totalItems}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs mt-1">
                                        {label}
                                    </span>
                                </button>
                            );
                        }
                    )}
                </div>
            </nav>
        </>
    );
};
