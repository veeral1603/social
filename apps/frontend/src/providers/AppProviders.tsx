"use client";
import React from "react";
import AuthProvider from "../context/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileProvider from "../context/profile/ProfileProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
