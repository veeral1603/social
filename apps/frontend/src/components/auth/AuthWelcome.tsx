"use client";
import { Button } from "@/components/ui/button";
import useAuthModal from "@/src/stores/authModalStore";
import Image from "next/image";
import React from "react";

export default function AuthWelcome() {
  const { setPage } = useAuthModal();
  return (
    <div className="flex flex-col items-center w-full gap-6 md:gap-8">
      <div className="relative flex items-center justify-center w-35 h-25">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="text-center">
        <h2 className="font-montserrat font-bold text-5xl">social.</h2>
        <p className="text-muted-foreground font-semibold">What's up?</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-70">
        <Button size="lg" onClick={() => setPage("signup")}>
          Create Account
        </Button>
        <Button variant="outline" size="lg" onClick={() => setPage("login")}>
          Log In
        </Button>
      </div>
    </div>
  );
}
