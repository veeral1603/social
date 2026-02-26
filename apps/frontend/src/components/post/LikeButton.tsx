"use client";
import React from "react";
import { Heart } from "lucide-react";
import { likePost, unlikePost } from "@/src/services/like.service";
import { Post } from "@repo/shared-types";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { toast } from "sonner";
import useAuthModal from "@/src/stores/authModalStore";
import { formatCount } from "@/src/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  post: Post;
  isDetailed?: boolean;
}

export default function LikeButton({ post, isDetailed }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      if (post.likedByMe) {
        return unlikePost(post.id);
      } else {
        return likePost(post.id);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", post.id] });

      // Update Individual Post
      queryClient.setQueryData<Post | undefined>(
        ["post", post.id],
        (old: any) => {
          if (!old) return old;
          const liked = old.likedByMe;
          const currentLikes = old.counts?.likes || 0;
          return {
            ...old,
            likedByMe: !liked,
            counts: {
              ...old.counts,
              likes: liked ? currentLikes - 1 : currentLikes + 1,
            },
          };
        },
      );

      // Update Feed Post
      queryClient.setQueryData<Post[] | undefined>(["feed"], (old: any) => {
        if (!old) return old;
        return old.map((p: Post) =>
          p.id === post.id
            ? {
                ...p,
                likedByMe: !p.likedByMe,
                counts: {
                  ...p.counts,
                  likes: p.likedByMe
                    ? (p.counts?.likes || 0) - 1
                    : (p.counts?.likes || 0) + 1,
                },
              }
            : p,
        );
      });
    },
  });

  const {
    auth: { status },
  } = useAuthContext();
  const { open } = useAuthModal();

  const toggleLike = () => {
    if (status !== "authenticated") {
      toast.error("You need to be logged in to like posts.");
      open("welcome");
      return;
    }
    mutation.mutate();
  };

  return (
    <button
      className={`flex items-center hover:bg-pink-400/10  hover:text-pink-700 gap-1 p-1 rounded-full cursor-pointer  transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"} ${post.likedByMe ? "text-pink-700" : "text-muted-foreground"}`}
      onClick={toggleLike}
    >
      <Heart
        size={isDetailed ? 20 : 18}
        fill={post.likedByMe ? "currentColor" : "none"}
      />
      <span>{formatCount(post.counts?.likes || 0)}</span>
    </button>
  );
}
