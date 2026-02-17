"use client";
import { Repeat } from "lucide-react";
import React from "react";

export default function RepostButton() {
  return (
    <button
      className={`flex items-center text-xs hover:bg-green-500/10 hover:text-green-500 gap-1 p-1 rounded-full cursor-pointer transition duration-300 `}
    >
      <Repeat size={18} />
      <span>0</span>
    </button>
  );
}
