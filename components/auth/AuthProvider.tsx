"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/lib/api';
import { setAuthCookie, deleteAuthCookie } from '@/app/actions/auth';

interface User {
  id: number;
  name: string;
  email: string;
  account_type: 0 | 1;
  role: number;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo?: string }>;
  logout: () => Promise<void>;
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

  const login = async (email: string, password: string):
    Promise<{ success: boolean; redirectTo?: string }> => {
    try {
      setIsLoading(true);
      const res = await api.post<{ message: string; token: string }>('/auth/login', {
        email, password,
      });

      if (!res.token) {
        return { success: false };
      }

      const payload = JSON.parse(atob(res.token.split('.')[1]));

      const userData: User = {
        id: payload.id,
        name: payload.name || 'User',
        email: payload.email,
        role: payload.role,
        account_type: payload.account_type,
      };

      localStorage.setItem('auth_token', res.token);
      localStorage.setItem('user_data', JSON.stringify(userData));

      // Set cookie for middleware route protection
      await setAuthCookie(payload.account_type);

      setUser(userData);

      const redirectTo = userData.account_type === 0 ? '/admin' : '/client';
      return { success: true, redirectTo };

    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }


  const logout = async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    await deleteAuthCookie();
    setUser(null);
    router.push('/');
  };

  const isAdmin = (): boolean => {
    return user?.account_type === 0;
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