"use client";
import React from "react";
import { Button } from "../ui/button";
import { PencilLine } from "lucide-react";
import usePostDialog from "@/src/stores/postDialogStore";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { usePathname } from "next/navigation";

const hiddenPaths = ["/messages/", "/post/", "/settings"]; // add more paths to hide the button on

export default function FloatingPostButton() {
  const { isOpen, openDialog } = usePostDialog();
  const path = usePathname();
  if (isOpen) return null;
  const { auth } = useAuthContext();
  if (!auth) return null;
  if (hiddenPaths.some((p) => path.includes(p))) return null; // hide post button on chat page
  return (
    <Button
      variant="default"
      className="fixed bottom-20 md:bottom-6 right-6 rounded-full! w-14! h-14! md:w-12! md:h-12! shadow-lg xl:hidden"
      onClick={openDialog}
    >
      <PencilLine />
    </Button>
  );
}
