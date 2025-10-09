"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview and metrics"
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    description: "Manage user accounts"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: TrendingUp,
    description: "Reports and insights"
  },
  {
    id: "settings",
    label: "System Settings",
    icon: Settings,
    description: "Configure application"
  }
];

export default function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className="bg-sidebar border-r border-border flex flex-col h-full lg:relative lg:translate-x-0">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">Astexo Admin</h1>
        <p className="text-sm text-sidebar-accent-foreground mt-1">Manage your application</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSectionChange(item.id);
                }
              }}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Navigate to ${item.label}: ${item.description}`}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{item.label}</div>
                <div className="text-xs text-sidebar-accent-foreground/70 truncate">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Link href="/" className="block">
          <Button variant="outline" className="w-full justify-start gap-2">
            <ArrowLeft className="h-4 w-4" />
            Exit Admin
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}