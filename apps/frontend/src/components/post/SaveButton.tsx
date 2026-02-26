"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { savePost, unsavePost } from "@/src/services/save.service";
import { Post } from "@repo/shared-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  isDetailed?: boolean;
  post: Post;
}

export default function SaveButton({ isDetailed, post }: Props) {
  const queryClient = useQueryClient();
  const {
    auth: { status },
  } = useAuthContext();

  const mutation = useMutation({
    mutationFn: async () => {
      if (post.savedByMe) return unsavePost(post.id);
      else return savePost(post.id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", post.id] });

      // update individual post data in cache
      queryClient.setQueryData<Post>(["post", post.id], (old: any) => {
        if (!old) return old;
        const oldData = old as Post;
        const currentSaveCount = oldData.counts?.saves || 0;
        return {
          ...oldData,
          savedByMe: !oldData.savedByMe,
          counts: {
            ...oldData.counts,
            saves: oldData.savedByMe
              ? currentSaveCount - 1
              : currentSaveCount + 1,
          },
        };
      });

      // updating the feed cache
      queryClient.setQueryData<Post[]>(["feed"], (old: any) => {
        const oldData = old as Post[];
        if (!old) return old;
        return oldData.map((p) => {
          if (p.id === post.id) {
            const currentCount = p.counts?.saves || 0;
            return {
              ...p,
              savedByMe: !p.savedByMe,
              counts: {
                ...p.counts,
                saves: p.savedByMe ? currentCount - 1 : currentCount + 1,
              },
            };
          }
          return p;
        });
      });
    },
  });

  const toggleSave = async () => {
    if (status !== "authenticated") {
      toast.error("You need to be logged in to like posts.");
      open("welcome");
      return;
    }

    mutation.mutate();
  };
  return (
    <button
      className={`flex items-center  hover:bg-primary/10 hover:text-primary gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"} ${post.savedByMe ? "text-primary" : "text-muted-foreground"}`}
      onClick={toggleSave}
    >
      <Bookmark
        size={isDetailed ? 20 : 18}
        fill={post.savedByMe ? "currentColor" : "none"}
      />
    </button>
  );
}
