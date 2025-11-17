import type { Metadata } from "next";
import "../../assets/css/globals.css";

export const metadata: Metadata = {
  title: "Astexo - Reset Password",
  description: "Reset your Astexo account password. Enter your email address to receive a password reset link.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen">
        {children}
      </div>
    </>
  );
}
