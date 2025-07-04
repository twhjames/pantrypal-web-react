import React from "react";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="px-4 py-4 pb-20 lg:pb-4 max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto">
                {children}
            </main>
        </div>
    );
};
