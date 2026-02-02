"use client";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  className,
  variant = "ghost",
  size = "icon",
}: {
  className?: string;
  variant?: "ghost" | "secondary" | "default";
  size?: "icon" | "icon-sm";
}) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => router.back()}
      className={` ${className} rounded-full! aspect-square! flex items-center justify-center`}
    >
      <ArrowLeft className="size-5" />
    </Button>
  );
}
