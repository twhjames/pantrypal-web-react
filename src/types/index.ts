export interface User {
    id: string;
    email: string;
    name: string;
}

export interface PantryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    purchaseDate: string;
    expiryDate: string;
    status: "fresh" | "expiring-soon" | "expiring-today" | "expired";
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    cookTime: number;
    servings: number;
    ingredients: {
        name: string;
        available: boolean;
    }[];
    matchedIngredients: number;
    totalIngredients: number;
    instructions: string[];
}

export interface ExpiringDeal {
    id: string;
    name: string;
    image: string;
    expiryDate: string;
    originalPrice: number;
    discountedPrice: number;
    retailer: {
        name: string;
        location: string;
    };
    category: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}
