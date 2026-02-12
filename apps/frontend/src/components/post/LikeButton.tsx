"use client";
import React from "react";
import { Heart } from "lucide-react";

export default function LikeButton() {
  const [isLiked, setIsLiked] = React.useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <button
      className={`flex items-center text-xs gap-1 p-1 rounded-full cursor-pointer hover:bg-primary/10 transition duration-300 ${isLiked ? "text-pink-700" : "text-muted-foreground"}`}
      onClick={toggleLike}
    >
      <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
      <span>0</span>
    </button>
  );
}
