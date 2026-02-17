"use client";
import { Repeat } from "lucide-react";
import React from "react";

interface Props {
  isDetailed?: boolean;
}

export default function RepostButton({ isDetailed }: Props) {
  return (
    <button
      className={`flex items-center  hover:bg-green-500/10 hover:text-green-500 gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"}`}
    >
      <Repeat size={isDetailed ? 20 : 18} />
      <span>0</span>
    </button>
  );
}
