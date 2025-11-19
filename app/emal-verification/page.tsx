"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { api } from '@/lib/api';
import { useSearchParams } from "next/navigation";

export default function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState("Verifying your email address...");

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
        // Assuming the backend has an endpoint like /auth/verify-email that accepts the token
        // and finalizes the account creation.
        const response = await api.post('/auth/verify-email', { token });

        if (response) {
          setVerificationStatus("success");
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
            <Link href="/">
              <Button className="w-full">
                Continue to Dashboard
              </Button>
            </Link>
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
