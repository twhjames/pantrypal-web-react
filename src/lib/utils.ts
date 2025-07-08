import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPantryStatus(
    expiryDate: string
): "fresh" | "expiring-soon" | "expiring-today" | "expired" {
    if (!expiryDate) return "fresh";
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil(
        (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff < 0) return "expired";
    if (diff === 0) return "expiring-today";
    if (diff <= 3) return "expiring-soon";
    return "fresh";
}

export function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
}
