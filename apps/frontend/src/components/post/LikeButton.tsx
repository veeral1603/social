"use client";
import React from "react";
import { Heart } from "lucide-react";
import { likePost, unlikePost } from "@/src/services/like.service";
import { Post } from "@repo/shared-types";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { toast } from "sonner";
import useAuthModal from "@/src/stores/authModalStore";
import { formatCount } from "@/src/lib/utils";

interface Props {
  post: Post;
  isDetailed?: boolean;
}

export default function LikeButton({ post, isDetailed }: Props) {
  const [likeCount, setLikeCount] = React.useState<number>(
    post.counts?.likes || 0,
  );
  const [isLiked, setIsLiked] = React.useState<boolean>(
    post.likedByMe || false,
  );

  const {
    auth: { status },
  } = useAuthContext();
  const { open } = useAuthModal();

  const toggleLike = async () => {
    if (status !== "authenticated") {
      toast.error("You need to be logged in to like posts.");
      open("welcome");
      return;
    }
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => {
      if (isLiked) {
        if (prev === 0) return 0;
        return prev - 1;
      } else {
        return prev + 1;
      }
    });

    if (isLiked) {
      await unlikePost(post.id);
    } else {
      await likePost(post.id);
    }
  };

  return (
    <button
      className={`flex items-center hover:bg-pink-400/10  hover:text-pink-700 gap-1 p-1 rounded-full cursor-pointer  transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"} ${isLiked ? "text-pink-700" : "text-muted-foreground"}`}
      onClick={toggleLike}
    >
      <Heart
        size={isDetailed ? 20 : 18}
        fill={isLiked ? "currentColor" : "none"}
      />
      <span>{formatCount(likeCount)}</span>
    </button>
  );
}
