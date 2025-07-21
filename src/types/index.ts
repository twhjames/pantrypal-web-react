export interface User {
    id: number;
    email: string;
    username: string;
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

export interface ChatMessage {
    user_id: number;
    session_id?: number;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp?: string;
}

export interface ChatReply {
    reply: string;
    session_id: number;
}

export interface ChatSession {
    id: number;
    title: string;
    summary?: string;
    prep_time?: number;
    instructions: string[];
    ingredients: string[];
    available_ingredients: number | string[];
    total_ingredients: number;
}

export interface AuthState {
    isAuthenticated: boolean;
    userId: number | null;
    token: string | null;
    tokenExpiration?: number | null;
}

export * from "./pantry";
