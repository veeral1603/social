"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import useAuthModal from "@/src/stores/authModalStore";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function FooterAuthCTA() {
  const { auth } = useAuthContext();
  const { open } = useAuthModal();
  const isAuthenticated = auth?.status === "authenticated";

  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="w-full items-center inset-x-0 justify-between h-16 bg-background border-t border-border fixed bottom-0 px-4 z-10 xl:hidden flex">
      <div className="relative flex items-center justify-center w-13 h-8">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-2">
        {" "}
        <Button variant="default" size="sm" onClick={() => open("signup")}>
          Create Account
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => open("login")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
