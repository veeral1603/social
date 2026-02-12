import React from "react";
import LikeButton from "./LikeButton";

export default function PostActions() {
  return (
    <div className="flex items-center gap-4 text-xs mt-1">
      <LikeButton />
    </div>
  );
}
