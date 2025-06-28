import React from "react";
import { Navbar } from "./Navbar";
import { MobileNavbar } from "./MobileNavbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pb-20 md:pb-0 md:pt-20">{children}</main>
            <MobileNavbar />
        </div>
    );
};
