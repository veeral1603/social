"use client";
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import useAuthModal from "@/src/stores/authModalStore";
import AuthWelcome from "./AuthWelcome";
import Login from "./Login";
import SignUp from "./Signup";
import Verify from "./Verify";
import { useAuthContext } from "@/src/hooks/useAuthContext";

export default function AuthModal() {
  const { isOpen, close, page } = useAuthModal();
  const { auth } = useAuthContext();

  if (!isOpen || (auth.status === "authenticated" && auth.user)) return null;

  return (
    <div className="absolute inset-0 z-100 bg-background h-screen">
      <div className="h-full w-full relative">
        {page === "welcome" && (
          <Button
            variant="outline"
            className="absolute top-4 right-4 aspect-square! p-0!"
            size="lg"
            onClick={close}
          >
            <X strokeWidth={2.5} />
          </Button>
        )}
        <div
          className={`max-w-md mx-auto p-8 w-full h-full ${page === "welcome" ? "items-center" : ""} flex sm:items-center justify-center `}
        >
          {page === "welcome" && <AuthWelcome />}
          {page === "login" && <Login />}
          {page === "signup" && <SignUp />}
          {page === "verify-email" && <Verify />}
        </div>
      </div>
    </div>
  );
}
