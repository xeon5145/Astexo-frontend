"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminDashboardContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  notifications: AdminNotification[];
  addNotification: (notification: Omit<AdminNotification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface AdminNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  autoClose?: boolean;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export function useAdminDashboard() {
  const context = useContext(AdminDashboardContext);
  if (context === undefined) {
    throw new Error('useAdminDashboard must be used within an AdminDashboardProvider');
  }
  return context;
}

interface AdminDashboardProviderProps {
  children: ReactNode;
}

export function AdminDashboardProvider({ children }: AdminDashboardProviderProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  // Load saved section from localStorage
  useEffect(() => {
    const savedSection = localStorage.getItem('admin_active_section');
    if (savedSection && ['dashboard', 'users', 'analytics', 'settings'].includes(savedSection)) {
      setActiveSection(savedSection);
    }
  }, []);

  // Save active section to localStorage
  useEffect(() => {
    localStorage.setItem('admin_active_section', activeSection);
  }, [activeSection]);

  // Close mobile menu when section changes
  const handleSetActiveSection = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const addNotification = (notification: Omit<AdminNotification, 'id' | 'timestamp'>) => {
    const newNotification: AdminNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove notification after 5 seconds if autoClose is true
    if (notification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value: AdminDashboardContextType = {
    activeSection,
    setActiveSection: handleSetActiveSection,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isLoading,
    setIsLoading,
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
}