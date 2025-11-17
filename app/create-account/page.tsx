"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { api } from '@/lib/api';

export default function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);
    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
      });

      console.log(response);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account. Please try again.");
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
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="name"
                        type="text"
                        placeholder="You Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                      />
                    </InputGroup>
                  </Field>

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
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-card-foreground mb-2">
                  Verify Your Email Address
                </h2>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification link to your registered email address. Please check your inbox and click the link to activate your account.
                </p>
              </div>
              <Link href="/">
                <Button className="w-full">
                  Back to Login
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
