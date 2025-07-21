import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthState } from "@/types";
import { decodeTokenExpiration } from "@/lib/auth";
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
        const storedExp = localStorage.getItem("pantrypal_token_exp");

        if (storedToken && storedUserId) {
            const exp = storedExp
                ? Number(storedExp)
                : decodeTokenExpiration(storedToken);
            if (exp && Date.now() >= exp) {
                localStorage.removeItem("pantrypal_token");
                localStorage.removeItem("pantrypal_user_id");
                localStorage.removeItem("pantrypal_token_exp");
            } else {
                return {
                    isAuthenticated: true,
                    userId: Number(storedUserId),
                    token: storedToken,
                    tokenExpiration: exp,
                };
            }
        }
        return {
            isAuthenticated: false,
            userId: null,
            token: null,
            tokenExpiration: null,
        };
    });

    const login = async (email: string, password: string) => {
        try {
            const data = await loginAccount(email, password);
            const tokenValue = data.token;
            const userId = data.user_id;
            const exp = decodeTokenExpiration(tokenValue);

            localStorage.setItem("pantrypal_token", tokenValue);
            if (exp) {
                localStorage.setItem("pantrypal_token_exp", String(exp));
            }
            if (userId !== undefined) {
                localStorage.setItem("pantrypal_user_id", String(userId));
            }

            setAuthState({
                isAuthenticated: true,
                userId: userId ?? null,
                token: tokenValue,
                tokenExpiration: exp ?? null,
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
        localStorage.removeItem("pantrypal_token_exp");
        setAuthState({
            isAuthenticated: false,
            userId: null,
            token: null,
            tokenExpiration: null,
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

    useEffect(() => {
        if (authState.isAuthenticated && authState.tokenExpiration) {
            const timeout = authState.tokenExpiration - Date.now();
            if (timeout <= 0) {
                logout();
                return;
            }
            const timer = setTimeout(logout, timeout);
            return () => clearTimeout(timer);
        }
    }, [authState.isAuthenticated, authState.tokenExpiration]);

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
