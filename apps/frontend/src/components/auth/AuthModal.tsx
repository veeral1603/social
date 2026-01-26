"use client";
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthModal from "@/src/stores/authModalStore";
import AuthWelcome from "./AuthWelcome";
import Login from "./Login";
import SignUp from "./Signup";

export default function AuthModal() {
  const { isOpen, close, page } = useAuthModal();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-background h-screen">
      <div className="h-full w-full relative">
        <Button
          variant="outline"
          className="absolute top-4 right-4 aspect-square! p-0!"
          size="lg"
          onClick={close}
        >
          <X strokeWidth={2.5} />
        </Button>
        <div className="max-w-xl mx-auto p-2 w-full h-full flex items-center justify-center">
          {page === "welcome" && <AuthWelcome />}
          {page === "login" && <Login />}
          {page === "signup" && <SignUp />}
        </div>
      </div>
    </div>
  );
}
