"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import React from "react";
import AuthenticatedSidebar from "./AuthenticatedSidebar";
import GuestSidebarCTA from "./GuestSidebarCTA";

export default function LeftSidebar() {
  const { auth } = useAuthContext();
  const isAuthenticated = auth.status === "authenticated" && auth.user !== null;
  return (
    <aside className="sticky  top-0 h-screen hidden md:block  p-2 xl:p-6">
      {isAuthenticated && <AuthenticatedSidebar />}
      {!isAuthenticated && <GuestSidebarCTA />}
    </aside>
  );
}
