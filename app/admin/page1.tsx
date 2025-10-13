"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardOverview from "@/components/admin/DashboardOverview";
import UserManagement from "@/components/admin/UserManagement";
import Analytics from "@/components/admin/Analytics";
import SystemSettings from "@/components/admin/SystemSettings";
import AdminErrorBoundary from "@/components/admin/AdminErrorBoundary";
import { AdminDashboardProvider, useAdminDashboard } from "@/components/admin/AdminDashboardContext";
import AdminNotifications from "@/components/admin/AdminNotifications";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Loader2 } from "lucide-react";

// Helper function to get section title
function getSectionTitle(section: string): string {
  const titles: Record<string, string> = {
    dashboard: "Dashboard Overview",
    users: "User Management",
    analytics: "Analytics",
    settings: "System Settings"
  };
  return titles[section] || "Admin Dashboard";
}

// Helper function to render active section content
function renderActiveSection(activeSection: string) {
  switch (activeSection) {
    case "dashboard":
      return <DashboardOverview />;
    case "users":
      return <UserManagement />;
    case "analytics":
      return <Analytics />;
    case "settings":
      return <SystemSettings />;
    default:
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">Section not found</h3>
        </div>
      );
  }
}

// Separate component for the dashboard content that uses dashboard context
function AdminDashboardContent() {
  const { 
    activeSection, 
    isMobileMenuOpen, 
    setActiveSection, 
    setIsMobileMenuOpen,
    isLoading 
  } = useAdminDashboard();

  return (
    <AdminErrorBoundary>
      <div className="min-h-screen bg-background">
        {/* Global Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm font-medium">Loading...</span>
              </div>
            </Card>
          </div>
        )}

        {/* Notifications */}
        <AdminNotifications />

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
          {/* Sidebar Navigation */}
          <div className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:block fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-auto`}>
            <AdminSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <main className="flex flex-col">
            {/* Admin Header */}
            <AdminHeader 
              activeSection={activeSection}
              onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isMobileMenuOpen={isMobileMenuOpen}
            />

            {/* Dynamic Content Area with smooth transitions */}
            <div id="main-content" className="flex-1 p-6" role="main" aria-label="Admin dashboard main content">
              <div className="animate-in fade-in-50 duration-200">
                <AdminErrorBoundary>
                  {renderActiveSection(activeSection)}
                </AdminErrorBoundary>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminErrorBoundary>
  );
}

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  // Check admin access
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/');
        return;
      }
      
      if (!isAdmin()) {
        router.push('/client'); // Redirect non-admin users to client dashboard
        return;
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <h2 className="text-lg font-semibold text-card-foreground mb-2">
              Verifying Access
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we verify your admin credentials...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show unauthorized state
  if (!isAuthenticated || !isAdmin()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-lg font-semibold text-card-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              You need administrator privileges to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <AdminDashboardProvider>
        <AdminDashboardContent />
      </AdminDashboardProvider>
    </AdminAuthGuard>
  );
}
