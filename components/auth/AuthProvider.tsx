"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo?: string }>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; redirectTo?: string }> => {
    try {
      setIsLoading(true);
      
      // Mock authentication - replace with real API call
      let mockUser: User;
      let redirectTo: string;

      // Admin login
      if (email === 'admin@astexo.com' && password === 'admin123') {
        mockUser = {
          id: '1',
          name: 'John Admin',
          email: 'admin@astexo.com',
          role: 'super_admin',
          permissions: ['users.read', 'users.write', 'users.delete', 'analytics.read', 'settings.write']
        };
        redirectTo = '/admin';
      }
      // Regular user login
      else if (email === 'user@astexo.com' && password === 'user123') {
        mockUser = {
          id: '2',
          name: 'John User',
          email: 'user@astexo.com',
          role: 'user'
        };
        redirectTo = '/client';
      }
      // Invalid credentials
      else {
        return { success: false };
      }
      
      // Store auth data
      localStorage.setItem('auth_token', 'mock_token_123');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return { success: true, redirectTo };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    router.push('/');
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin' || user?.role === 'super_admin';
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}