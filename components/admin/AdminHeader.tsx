"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/common/themeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { useAuth } from "../auth/AuthProvider";
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Shield,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  activeSection: string;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function AdminHeader({
  activeSection,
  onMobileMenuToggle,
  isMobileMenuOpen = false
}: AdminHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "New user registration", time: "2 min ago", unread: true },
    { id: 2, message: "System backup completed", time: "1 hour ago", unread: true },
    { id: 3, message: "Database maintenance scheduled", time: "3 hours ago", unread: false }
  ]);

  const { user, logout } = useAuth();

  const getSectionTitle = (section: string): string => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard Overview",
      users: "User Management",
      analytics: "Analytics & Reports",
      settings: "System Settings"
    };
    return titles[section] || "Admin Dashboard";
  };

  const getSectionDescription = (section: string): string => {
    const descriptions: Record<string, string> = {
      dashboard: "Monitor your application's performance and key metrics",
      users: "Manage user accounts, roles, and permissions",
      analytics: "View detailed reports and analytics data",
      settings: "Configure system settings and preferences"
    };
    return descriptions[section] || "Manage your application";
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically update your theme context or localStorage
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Title and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMobileMenuToggle}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Section Title */}
          <div>
            <h1 className="text-xl font-semibold text-card-foreground">
              {getSectionTitle(activeSection)}
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              {getSectionDescription(activeSection)}
            </p>
          </div>
        </div>

        {/* Right Section - Actions and User Menu */}
        <div className="flex items-center gap-3">
          {/* Search Button - Hidden on mobile */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          {/* <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button> */}
          <ModeToggle />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadNotifications > 0 && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {unreadNotifications} new
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                    <div className="flex items-center gap-2 w-full">
                      {notification.unread && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                      )}
                      <span className="text-sm font-medium flex-1">
                        {notification.message}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-4">
                      {notification.time}
                    </span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>
                  <span className="text-sm text-muted-foreground">No notifications</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center">
                <span className="text-sm text-primary">View all notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-card-foreground">
                    {user?.name || "Admin User"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name || "Admin User"}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {user?.email || "admin@astexo.com"}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Shield className="h-4 w-4 mr-2" />
                Admin Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <Link href="/" className="block">
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  Exit Admin Mode
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                variant="destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Breadcrumb Navigation - Optional */}
      <div className="hidden lg:block px-6 py-2 border-t border-border bg-muted/30">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/admin" className="hover:text-card-foreground transition-colors">
            Admin
          </Link>
          <span>/</span>
          <span className="text-card-foreground font-medium">
            {getSectionTitle(activeSection)}
          </span>
        </nav>
      </div>
    </header>
  );
}