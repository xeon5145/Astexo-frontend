"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogIn, Eye, EyeClosed, Loader2 } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginBox() {
  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { login, isLoading, isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const toggleInputType = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    
    if (result.success && result.redirectTo) {
      setIsOpen(false);
      router.push(result.redirectTo);
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  // If user is authenticated, show logout button
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Welcome, {user.name}
        </span>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            Login <LogIn />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login to your account</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/resetPassword"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={inputType}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      aria-label="Toggle password visibility"
                      title="Toggle password visibility"
                      size="icon-xs"
                      onClick={toggleInputType}
                    >
                      {inputType === "password" ? <EyeClosed /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
              
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/createAccount">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@astexo.com / admin123</p>
              <p><strong>User:</strong> user@astexo.com / user123</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
