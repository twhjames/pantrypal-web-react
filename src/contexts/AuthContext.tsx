import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthState } from "@/types";

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        username: string
    ) => Promise<void>;
    logout: () => void;
    updateProfile: (userData: {
        username?: string;
        email?: string;
        password?: string;
    }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        userId: null,
        token: null,
    });

    useEffect(() => {
        // Check for stored auth token on app load
        const storedToken = localStorage.getItem("pantrypal_token");
        const storedUserId = localStorage.getItem("pantrypal_user_id");

        if (storedToken && storedUserId) {
            setAuthState({
                isAuthenticated: true,
                userId: Number(storedUserId),
                token: storedToken,
            });
        }
    }, []);

    const API_BASE_URL = import.meta.env.PANTRYPAL_API_BASE_URL || "";

    const login = async (email: string, password: string) => {
        try {
            // Mock response
            // const mockResponse = {
            //     token: "mock-jwt-token-12345",
            //     user: {
            //         id: "1",
            //         email,
            //         name: "Demo User",
            //     },
            // };
            // localStorage.setItem("pantrypal_token", mockResponse.token);
            // localStorage.setItem(
            //     "pantrypal_user",
            //     JSON.stringify(mockResponse.user)
            // );

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

            const data = await response.json();

            const tokenValue = data.token;
            const userId = data.user_id;

            localStorage.setItem("pantrypal_token", tokenValue);
            if (userId !== undefined) {
                localStorage.setItem("pantrypal_user_id", String(userId));
            }

            setAuthState({
                isAuthenticated: true,
                userId: userId ?? null,
                token: tokenValue,
            });
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

    const register = async (
        email: string,
        password: string,
        username: string
    ) => {
        try {
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
        } catch (error) {
            console.error("Registration failed:", error);
            throw new Error("Registration failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("pantrypal_token");
        localStorage.removeItem("pantrypal_user_id");
        setAuthState({
            isAuthenticated: false,
            userId: null,
            token: null,
        });
    };

    const updateProfile = async (userData: {
        username?: string;
        email?: string;
        password?: string;
    }) => {
        try {
            if (!authState.userId) {
                throw new Error("Not authenticated");
            }

            const response = await fetch(
                `${API_BASE_URL}/account/update?user_id=${authState.userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState.token}`,
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                throw new Error("Profile update failed");
            }

            // Nothing to update in local authState
            await response.json();
        } catch (error) {
            console.error("Profile update failed:", error);
            throw new Error("Profile update failed");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                register,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
