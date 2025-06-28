import { Home, Package, ChefHat, ShoppingCart, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Package, label: "Pantry", path: "/pantry" },
    { icon: ChefHat, label: "Recipes", path: "/recipes" },
    { icon: ShoppingCart, label: "Deals", path: "/deals" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export const MobileNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
            <div className="flex justify-around items-center">
                {navigationItems.map(({ icon: Icon, label, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            className={cn(
                                "flex flex-col items-center p-2 rounded-lg transition-colors",
                                isActive
                                    ? "text-green-600 bg-green-50"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <Icon size={20} />
                            <span className="text-xs mt-1">{label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
