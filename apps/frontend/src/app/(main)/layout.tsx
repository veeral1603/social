import AuthModal from "@/src/components/auth/AuthModal";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full relative">
      {children} <AuthModal />
    </div>
  );
}
