import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ExpiringDeal } from "@/types";
import { toast } from "@/components/ui/use-toast";

export interface CartItem {
    id: string; // unique cart item id (deal id)
    name: string;
    image: string;
    price: number; // discounted price per unit
    retailerName: string;
    quantity: number; // in cart
    maxQuantity?: number; // optional stock limit from backend
}

interface CartContextValue {
    items: CartItem[];
    addToCart: (deal: ExpiringDeal, qty?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart";

export const CartProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? (JSON.parse(raw) as CartItem[]) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (deal: ExpiringDeal, qty: number = 1) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === deal.id);
            const maxQ = deal.quantityLeft ?? undefined;
            if (existing) {
                const newQty = Math.min(
                    existing.quantity + qty,
                    maxQ ?? Infinity
                );
                const updated = prev.map((i) =>
                    i.id === deal.id ? { ...i, quantity: newQty } : i
                );
                toast({
                    title: "Cart updated",
                    description: `Updated ${deal.name} to ${newQty}`,
                });
                return updated;
            }
            const newItem: CartItem = {
                id: deal.id,
                name: deal.name,
                image: deal.image,
                price: deal.discountedPrice,
                retailerName: deal.retailer.name,
                quantity: Math.min(qty, maxQ ?? qty),
                maxQuantity: maxQ,
            };
            toast({
                title: "Added to cart",
                description: `${deal.name} added to your cart`,
            });
            return [...prev, newItem];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQuantity = (id: string, qty: number) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const subtotal = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [items]
    );
    const totalItems = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity, 0),
        [items]
    );

    const value: CartContextValue = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
