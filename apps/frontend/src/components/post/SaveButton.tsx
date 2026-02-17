"use client";
import { Bookmark } from "lucide-react";
import React from "react";

interface Props {
  isDetailed?: boolean;
}

export default function SaveButton({ isDetailed }: Props) {
  const [isSaved, setIsSaved] = React.useState(false);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };
  return (
    <button
      className={`flex items-center  hover:bg-primary/10 hover:text-primary gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"} ${isSaved ? "text-primary" : "text-muted-foreground"}`}
      onClick={toggleSave}
    >
      <Bookmark
        size={isDetailed ? 20 : 18}
        fill={isSaved ? "currentColor" : "none"}
      />
    </button>
  );
}
