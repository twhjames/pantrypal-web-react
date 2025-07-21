import type { ChatMessage, ChatReply, ChatSession } from "@/types";
const API_BASE_URL = import.meta.env.PANTRYPAL_API_BASE_URL || "";

async function postChat(
    endpoint: string,
    message: ChatMessage,
    token?: string | null
): Promise<ChatReply> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(message),
    });

    if (!response.ok) {
        throw new Error("Chatbot request failed");
    }

    return response.json();
}

export async function recommendRecipe(
    message: ChatMessage,
    token?: string | null
): Promise<ChatReply> {
    return postChat("/chatbot/recommend", message, token);
}

export async function chatWithHistory(
    message: ChatMessage,
    token?: string | null
): Promise<ChatReply> {
    return postChat("/chatbot/chat", message, token);
}

export async function listChatSessions(
    userId: number,
    token: string | null
): Promise<ChatSession[]> {
    const response = await fetch(
        `${API_BASE_URL}/chatbot/sessions?user_id=${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to list chat sessions");
    }
    return response.json();
}

export async function getChatSessionHistory(
    sessionId: number,
    token: string | null
): Promise<ChatMessage[]> {
    const response = await fetch(
        `${API_BASE_URL}/chatbot/sessions/${sessionId}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch chat history");
    }
    return response.json();
}

export async function deleteChatSession(
    sessionId: number,
    token: string | null
): Promise<void> {
    const response = await fetch(
        `${API_BASE_URL}/chatbot/sessions/${sessionId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete chat session");
    }
}

export async function getRecipeTitleSuggestions(
    token?: string | null
): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/chatbot/title-suggestions`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch recipe title suggestions");
    }
    const data = await response.json();
    // Endpoint may return the suggestions array directly or wrapped in an object
    return Array.isArray(data) ? data : data.suggestions ?? [];
}
