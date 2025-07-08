const API_BASE_URL = import.meta.env.PANTRYPAL_API_BASE_URL || "";

export interface LoginResult {
    token: string;
    user_id: number;
}

export async function loginAccount(
    email: string,
    password: string
): Promise<LoginResult> {
    const response = await fetch(`${API_BASE_URL}/account/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}

export async function registerAccount(
    email: string,
    password: string,
    username: string
): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/account/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }
    await response.json();
}

export async function updateAccountProfile(
    userId: number,
    token: string | null,
    userData: { username?: string; email?: string; password?: string }
): Promise<void> {
    const response = await fetch(
        `${API_BASE_URL}/account/update?user_id=${userId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        }
    );

    if (!response.ok) {
        throw new Error("Profile update failed");
    }
    await response.json();
}
