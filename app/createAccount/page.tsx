"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeClosed, Loader2, UserPlus } from "lucide-react";
import Link from "next/link";

export default function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implement actual account creation API call
      // For now, simulate API call
      // await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
      }


      setIsSuccess(true);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Navigation */}
      {/* <NavbarHome /> */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-sm p-6 shadow-2xl bg-card/80 backdrop-blur-sm border-2">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-3">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-card-foreground">
                  Create Your Account
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Join thousands of users worldwide
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          type="button"
                          aria-label="Toggle password visibility"
                          size="icon-xs"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Must be at least 6 characters long
                    </FieldDescription>
                  </Field>

                </FieldGroup>

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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-card-foreground mb-2">
                  Account Created Successfully!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Welcome to Astexo! You can now sign in to your new account.
                </p>
              </div>
              <Link href="/">
                <Button className="w-full">
                  Continue to Login
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <p className="text-xs text-muted-foreground">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
