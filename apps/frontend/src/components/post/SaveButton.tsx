"use client";
import { Bookmark } from "lucide-react";
import React from "react";

export default function SaveButton() {
  const [isSaved, setIsSaved] = React.useState(false);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };
  return (
    <button
      className={`flex items-center  hover:bg-primary/10 hover:text-primary gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isSaved ? "text-primary" : "text-muted-foreground"}`}
      onClick={toggleSave}
    >
      <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
    </button>
  );
}
