const API_BASE_URL = import.meta.env.PANTRYPAL_API_BASE_URL || "";

import type { PantryItem, Unit, Category } from "@/types";
import { getPantryStatus, formatDate } from "@/lib/utils";

export interface AddPantryItemPayload {
    item_name: string;
    quantity: number;
    unit: Unit;
    category?: Category;
    purchase_date?: string;
    expiry_date?: string;
}

export interface UpdatePantryItemPayload extends AddPantryItemPayload {
    item_id: number;
}

function mapItem(item: any): PantryItem {
    return {
        id: String(item.id),
        name: item.item_name,
        category: item.category?.toLowerCase() || "other",
        quantity: item.quantity,
        purchaseDate: formatDate(item.purchase_date),
        expiryDate: formatDate(item.expiry_date),
        status: getPantryStatus(item.expiry_date),
    };
}

export async function listPantryItems(
    userId: number,
    token: string | null
): Promise<PantryItem[]> {
    const response = await fetch(
        `${API_BASE_URL}/pantry/list?user_id=${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch pantry items");
    }
    const data = await response.json();
    return data.map(mapItem);
}

export async function addPantryItems(
    userId: number,
    token: string | null,
    items: AddPantryItemPayload[]
): Promise<PantryItem[]> {
    const response = await fetch(
        `${API_BASE_URL}/pantry/add?user_id=${userId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(items),
        }
    );
    if (!response.ok) {
        throw new Error("Failed to add pantry items");
    }
    const data = await response.json();
    return data.map(mapItem);
}

export async function updatePantryItem(
    userId: number,
    token: string | null,
    item: UpdatePantryItemPayload
): Promise<PantryItem> {
    const response = await fetch(
        `${API_BASE_URL}/pantry/update?user_id=${userId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(item),
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update pantry item");
    }
    const data = await response.json();
    return mapItem(data);
}

export async function deletePantryItems(
    userId: number,
    token: string | null,
    itemIds: number[]
): Promise<void> {
    const response = await fetch(
        `${API_BASE_URL}/pantry/delete?user_id=${userId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ item_ids: itemIds }),
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete pantry items");
    }
}

export interface PantryStats {
    total: number;
    expiringSoon: number;
    expiringToday: number;
    expired: number;
}

export async function getPantryStats(
    userId: number,
    token: string | null
): Promise<PantryStats> {
    const response = await fetch(
        `${API_BASE_URL}/pantry/stats?user_id=${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch pantry stats");
    }
    const data = await response.json();
    return {
        total: data.total_items ?? data.total ?? 0,
        expiringSoon: data.expiring_soon ?? data.expiringSoon ?? 0,
        expiringToday: data.expiring_today ?? data.expiringToday ?? 0,
        expired: data.expired ?? 0,
    };
}

export async function listExpiringPantryItems(
    userId: number,
    token: string | null
): Promise<PantryItem[]> {
    const response = await fetch(
        `${API_BASE_URL}/pantry/expiring?user_id=${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch expiring pantry items");
    }
    const data = await response.json();
    return data.map(mapItem);
}
