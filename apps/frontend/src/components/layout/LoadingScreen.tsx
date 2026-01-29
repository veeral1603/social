"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import Image from "next/image";
import React from "react";

export default function LoadingScreen() {
  const { auth } = useAuthContext();
  if (auth.status !== "loading") {
    return null;
  }
  return (
    <div className="absolute inset-0 flex items-center z-1000 justify-center bg-background">
      <div className="relative flex items-center justify-center w-35 h-25 animate-pulse ">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}
