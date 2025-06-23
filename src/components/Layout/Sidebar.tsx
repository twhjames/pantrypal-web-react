
import React from 'react';
import { Home, Package, ChefHat, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Package, label: 'Pantry', path: '/pantry' },
  { icon: ChefHat, label: 'Recipes', path: '/recipes' },
  { icon: ShoppingCart, label: 'Expiring Deals', path: '/deals' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-green-600">PantryPal</h1>
        <p className="text-sm text-gray-600 mt-1">Smart Pantry Assistant</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                    isActive
                      ? 'bg-green-50 text-green-600 border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
