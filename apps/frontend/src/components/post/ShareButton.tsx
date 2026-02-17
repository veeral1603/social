"use client";
import { Share } from "lucide-react";
import React from "react";

export default function ShareButton() {
  return (
    <button
      className={`flex items-center  hover:bg-primary/10 hover:text-primary gap-1 p-1 rounded-full cursor-pointer transition duration-300 `}
    >
      <Share size={18} />
    </button>
  );
}
