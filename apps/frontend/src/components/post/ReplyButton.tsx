"use client";
import { MessageCircle } from "lucide-react";
import React from "react";

export default function ReplyButton() {
  return (
    <button
      className={`flex items-center text-xs hover:bg-blue-500/10 hover:text-blue-500 gap-1 p-1 rounded-full cursor-pointer transition duration-300 `}
    >
      <MessageCircle size={18} />
      <span>0</span>
    </button>
  );
}
