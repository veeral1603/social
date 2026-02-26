"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import useAuthModal from "@/src/stores/authModalStore";
import { Post } from "@repo/shared-types";
import { Repeat } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { repostPost, unrepostPost } from "@/src/services/repost.service";
import { formatCount } from "@/src/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  isDetailed?: boolean;
  post: Post;
}

export default function RepostButton({ isDetailed, post }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      if (post.repostedByMe) return unrepostPost(post.id);
      else return repostPost(post.id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", post.id] });

      // updating the individual post
      queryClient.setQueryData<Post | undefined>(
        ["post", post.id],
        (old: any) => {
          if (!old) return old;
          const oldPost = old as Post;
          const currentReposts = oldPost.counts?.reposts || 0;
          return {
            ...oldPost,
            repostedByMe: !oldPost.repostedByMe,
            counts: {
              ...oldPost.counts,
              reposts: oldPost.repostedByMe
                ? currentReposts - 1
                : currentReposts + 1,
            },
          };
        },
      );

      // Updating the feed
      queryClient.setQueryData<Post[] | undefined>(["feed"], (old: any) => {
        if (!old) return old;
        const oldPosts = (old as Post[]) || [];
        return oldPosts.map((p: Post) =>
          p.id === post.id
            ? {
                ...p,
                repostedByMe: !p.repostedByMe,
                counts: {
                  ...p.counts,
                  reposts: p.repostedByMe
                    ? p.counts?.reposts! - 1
                    : p.counts?.reposts! + 1,
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

  const toggleRepost = () => {
    if (status !== "authenticated") {
      open("welcome");
      toast("You need to be logged in to repost");
      return;
    }
    mutation.mutate();
  };

  return (
    <button
      className={`flex items-center   ${post.repostedByMe ? "text-green-500 bg-green-500/10 " : " hover:bg-green-500/10 hover:text-green-500 "} gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"}`}
      onClick={toggleRepost}
    >
      <Repeat size={isDetailed ? 20 : 18} />
      <span>{formatCount(post.counts?.reposts || 0)}</span>
    </button>
  );
}
