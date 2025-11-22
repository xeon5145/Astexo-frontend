"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { api } from '@/lib/api';
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error" | "account-created">("pending");
  const [message, setMessage] = useState("Verifying your email address...");
  const [userData, setUserData] = useState<any>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setIsCreatingAccount(true);

    // Gather User Data
    const user = {
      "name": userData.data.name,
      "email": userData.data.email,
      "account_type": userData.data.account_type,
      "role": userData.data.role,
      "passowrd": password
    };

    try {
      const accountCreation = await api.post<{ status: number; message: string }>('/auth/create-verified-account', { user });

      if (accountCreation.status === 200) {
        setVerificationStatus("account-created");
        setMessage("Your account has been created successfully! You can now login.");
        toast.success(accountCreation.message);
        
        // Redirect to landing page after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsCreatingAccount(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setVerificationStatus("error");
      setMessage("Verification token is missing. Please ensure you clicked the full link from your email.");
      setIsLoading(false);
      return;
    }

    const verifyEmail = async () => {
      setIsLoading(true);
      setVerificationStatus("pending");
      setMessage("Verifying your email address...");

      try {
        const response = await api.post('/auth/get-token-data', { token });

        if (response) {
          setVerificationStatus("success");
          setUserData(response);
          setMessage("Your email has been successfully verified! You can now access your account.");
        } else {
          // Handle case where API returns a non-error response but verification failed (e.g., token expired)
          setVerificationStatus("error");
          setMessage("Verification failed. The token may be invalid or expired. Please try registering again or contact support.");
        }
      } catch (err: any) {
        setVerificationStatus("error");
        // Use a more user-friendly error message from the API if available
        const errorMessage = err.message || "An unexpected error occurred during verification.";
        setMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]);




  const renderContent = () => {
    switch (verificationStatus) {
      case "pending":
        return (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-card-foreground mb-2">
                Email Verification
              </h2>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-card-foreground mb-2">
                Email Verified!
              </h2>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>

            {/* Password Creation */}
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-card-foreground">
                  Create Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-card-foreground">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <Button className="w-full" onClick={handleAccountCreation} disabled={isCreatingAccount}>
                {isCreatingAccount ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Set Password"
                )}
              </Button>
            </div>
            {/* Password Creation */}

          </div>

        );
      case "error":
        return (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-3">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-card-foreground mb-2">
                Verification Failed
              </h2>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
            <Link href="/create-account">
              <Button variant="outline" className="w-full">
                Try Registering Again
              </Button>
            </Link>
          </div>
        );
      case "account-created":
        return (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-card-foreground mb-2">
                Account Created Successfully!
              </h2>
              <p className="text-sm text-muted-foreground">{message}</p>
              <p className="text-xs text-muted-foreground mt-2">Redirecting to login page...</p>
            </div>
            <Link href="/">
              <Button className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-6 shadow-2xl bg-card/80 backdrop-blur-sm border-2">
          {renderContent()}
        </Card>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <p className="text-xs text-muted-foreground">
          Need help?{" "}
          <Link href="/support" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
