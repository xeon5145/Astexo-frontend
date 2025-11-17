"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function EmailVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implement actual OTP verification API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate validation
      if (otpValue === "123456") {
        setSuccess(true);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendCooldown(60);
    setError("");
    
    try {
      // TODO: Implement actual resend OTP API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-6 shadow-2xl bg-card/80 backdrop-blur-sm border-2">
          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-card-foreground">
                  Verify Your Email
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-sm font-medium text-card-foreground mt-1">
                  your@email.com
                </p>
              </div>

              {/* OTP Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Input */}
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      disabled={isLoading}
                      className="w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-md bg-red-50 border border-red-200">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || otp.join("").length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>

                {/* Resend Code */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{" "}
                    {resendCooldown > 0 ? (
                      <span className="text-muted-foreground">
                        Resend in {resendCooldown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-primary hover:underline font-medium"
                      >
                        Resend code
                      </button>
                    )}
                  </p>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-card-foreground mb-2">
                  Email Verified!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your email has been successfully verified. You can now access your account.
                </p>
              </div>
              <Link href="/">
                <Button className="w-full">
                  Continue to Dashboard
                </Button>
              </Link>
            </div>
          )}
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
