import React, { createContext, useContext, useState } from "react";
import type { AuthState } from "@/types";
import {
    loginAccount,
    registerAccount,
    updateAccountProfile,
} from "@/api/account";

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
    // Check for stored auth token on app load
    const [authState, setAuthState] = useState<AuthState>(() => {
        const storedToken = localStorage.getItem("pantrypal_token");
        const storedUserId = localStorage.getItem("pantrypal_user_id");

        if (storedToken && storedUserId) {
            return {
                isAuthenticated: true,
                userId: Number(storedUserId),
                token: storedToken,
            };
        }
        return {
            isAuthenticated: false,
            userId: null,
            token: null,
        };
    });

    const login = async (email: string, password: string) => {
        try {
            const data = await loginAccount(email, password);
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
            await registerAccount(email, password, username);
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
            await updateAccountProfile(
                authState.userId,
                authState.token,
                userData
            );
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
