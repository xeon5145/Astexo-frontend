"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import NavbarDashboard from "@/components/common/navbarDashboard";
import SideBar from "@/components/common/sideBar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";

export default function ClientDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <h2 className="text-lg font-semibold text-card-foreground mb-2">
              Loading Dashboard
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we load your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-lg font-semibold text-card-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Please log in to access your dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <SideBar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <NavbarDashboard />
          
          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-muted-foreground">Manage your account and access your features.</p>
              </div>
              
              {/* Placeholder content - you can expand this */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Feature 1</h3>
                  <p className="text-muted-foreground">Description of feature 1</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Feature 2</h3>
                  <p className="text-muted-foreground">Description of feature 2</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Feature 3</h3>
                  <p className="text-muted-foreground">Description of feature 3</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
