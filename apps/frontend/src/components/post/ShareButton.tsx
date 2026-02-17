"use client";
import { Share } from "lucide-react";
import React from "react";

interface Props {
  isDetailed?: boolean;
}

export default function ShareButton({ isDetailed }: Props) {
  return (
    <button
      className={`flex items-center  hover:bg-primary/10 hover:text-primary gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"}`}
    >
      <Share size={isDetailed ? 20 : 18} />
    </button>
  );
}
