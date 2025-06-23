
import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
