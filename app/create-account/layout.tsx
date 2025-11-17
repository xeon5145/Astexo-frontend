import type { Metadata } from "next";
import "../../assets/css/globals.css";

export const metadata: Metadata = {
  title: "Astexo - Create Account",
description: "Create your new Astexo account to get started with our platform. Join thousands of users who trust Astexo for their business needs.",
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
