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

export interface ReceiptUploadResponse {
    receipt_id: string;
}

export async function uploadReceipt(
    userId: number,
    token: string | null,
    imageBase64: string
): Promise<ReceiptUploadResponse> {
    const response = await fetch(
        `${API_BASE_URL}/receipt/upload?user_id=${userId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ image_base64: imageBase64 }),
        }
    );
    if (!response.ok) {
        throw new Error("Failed to upload receipt");
    }
    return response.json();
}

export async function getReceiptResult(
    receiptId: string,
    token: string | null
): Promise<any | null> {
    const response = await fetch(
        `${API_BASE_URL}/receipt/result/${receiptId}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );
    if (
        response.status === 202 ||
        response.status === 204 ||
        response.status === 404
    ) {
        return null;
    }
    if (!response.ok) {
        throw new Error("Failed to fetch receipt result");
    }
    const text = await response.text();
    if (!text) {
        return null;
    }

    return JSON.parse(text);
}
