"use client";
import { MessageCircle } from "lucide-react";
import React from "react";

interface Props {
  isDetailed?: boolean;
}

export default function ReplyButton({ isDetailed }: Props) {
  return (
    <button
      className={`flex items-center hover:bg-blue-500/10 hover:text-blue-500 gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"}`}
    >
      <MessageCircle size={isDetailed ? 20 : 18} />
      <span>0</span>
    </button>
  );
}
