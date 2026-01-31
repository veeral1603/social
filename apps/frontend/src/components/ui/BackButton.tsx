"use client";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="rounded-full! aspect-square! flex items-center justify-center"
    >
      <ArrowLeft className="size-5" />
    </Button>
  );
}
