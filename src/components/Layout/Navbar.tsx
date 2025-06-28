import {
    Home,
    Package,
    ChefHat,
    ShoppingCart,
    Settings,
    LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navigationItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Package, label: "Pantry", path: "/pantry" },
    { icon: ChefHat, label: "Recipes", path: "/recipes" },
    { icon: ShoppingCart, label: "Expiring Deals", path: "/deals" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            {/* Desktop Sticky Header */}
            <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-green-600">
                            PantryPal
                        </h1>
                    </div>

                    <nav className="flex items-center gap-2">
                        {navigationItems.map(({ icon: Icon, label, path }) => {
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
                                    <Icon size={18} />
                                    <span>{label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold text-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar (Hidden by default, shown by BottomNavigation) */}
            <aside className="hidden">
                {/* This is kept for backward compatibility but not used */}
            </aside>
        </>
    );
};
