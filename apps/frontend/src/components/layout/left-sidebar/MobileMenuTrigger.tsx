"use client";
import React from "react";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { useMobileSidebarStore } from "@/src/stores/mobileSidebarStore";

export default function MobileMenuTrigger() {
  const { openMenu } = useMobileSidebarStore();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden rounded-full! aspect-square! flex items-center justify-center "
      onClick={openMenu}
    >
      <Menu className="size-5!" />
    </Button>
  );
}
