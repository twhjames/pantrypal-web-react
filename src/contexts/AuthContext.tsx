
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    // Check for stored auth token on app load
    const storedToken = localStorage.getItem('pantrypal_token');
    const storedUser = localStorage.getItem('pantrypal_user');
    
    if (storedToken && storedUser) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        token: storedToken,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call to PantryPal backend /auth/login endpoint
      console.log('API Call: POST /auth/login', { email, password });
      
      // Mock response - replace with actual API call
      const mockResponse = {
        token: 'mock-jwt-token-12345',
        user: {
          id: '1',
          email,
          name: 'Demo User',
        },
      };

      localStorage.setItem('pantrypal_token', mockResponse.token);
      localStorage.setItem('pantrypal_user', JSON.stringify(mockResponse.user));
      
      setAuthState({
        isAuthenticated: true,
        user: mockResponse.user,
        token: mockResponse.token,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // TODO: Replace with actual API call to PantryPal backend /auth/register endpoint
      console.log('API Call: POST /auth/register', { email, password, name });
      
      // Mock registration - replace with actual API call
      const mockResponse = {
        token: 'mock-jwt-token-12345',
        user: {
          id: '1',
          email,
          name,
        },
      };

      localStorage.setItem('pantrypal_token', mockResponse.token);
      localStorage.setItem('pantrypal_user', JSON.stringify(mockResponse.user));
      
      setAuthState({
        isAuthenticated: true,
        user: mockResponse.user,
        token: mockResponse.token,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('pantrypal_token');
    localStorage.removeItem('pantrypal_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      // TODO: Replace with actual API call to PantryPal backend /user/profile endpoint
      console.log('API Call: PUT /user/profile', userData);
      
      const updatedUser = { ...authState.user!, ...userData };
      localStorage.setItem('pantrypal_user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      console.error('Profile update failed:', error);
      throw new Error('Profile update failed');
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
