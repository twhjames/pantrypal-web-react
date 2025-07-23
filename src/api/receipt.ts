const API_BASE_URL = import.meta.env.PANTRYPAL_API_BASE_URL || "";

export async function getReceiptPresignedUrl(
    userId: number,
    token: string | null
): Promise<string | null> {
    const response = await fetch(`${API_BASE_URL}/receipt/presigned-url`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) {
        throw new Error("Failed to get receipt upload URL");
    }
    const data = await response.json();
    return data.url ?? data.presigned_url ?? data ?? null;
}
