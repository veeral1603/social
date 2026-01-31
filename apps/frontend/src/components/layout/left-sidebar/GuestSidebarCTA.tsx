"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";
import useAuthModal from "@/src/stores/authModalStore";
import { useMobileSidebarStore } from "@/src/stores/mobileSidebarStore";

export default function GuestSidebarCTA() {
  const { open } = useAuthModal();
  const { closeMenu } = useMobileSidebarStore();
  return (
    <div className="md:hidden xl:block">
      <div className="relative flex items-center justify-center w-15 h-10">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-2xl font-montserrat leading-7">
          Join the social community!
        </h3>
        <div className="flex  items-center gap-3 mt-4 ">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              open("signup");
              closeMenu();
            }}
          >
            Create Account
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              open("login");
              closeMenu();
            }}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
