"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { savePost, unsavePost } from "@/src/services/save.service";
import { Post } from "@repo/shared-types";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  isDetailed?: boolean;
  post: Post;
}

export default function SaveButton({ isDetailed, post }: Props) {
  const [isSaved, setIsSaved] = React.useState(post.savedByMe || false);
  const queryClient = useQueryClient();
  const {
    auth: { status },
  } = useAuthContext();

  const save = async () => {
    try {
      setIsSaved(true);
      const response = await savePost(post.id);
      if (!response.success) throw new Error(response.message);
      queryClient.invalidateQueries({ queryKey: ["user-saved-posts"] });
    } catch (e) {
      setIsSaved(false);
      toast.error(
        (e as Error).message || "Failed to save the post. Please try again.",
      );
    }
  };

  const unsave = async () => {
    try {
      setIsSaved(false);
      const response = await unsavePost(post.id);
      if (!response.success) throw new Error(response.message);
      queryClient.invalidateQueries({ queryKey: ["user-saved-posts"] });
    } catch (e) {
      setIsSaved(true);
      toast.error(
        (e as Error).message || "Failed to unsave the post. Please try again.",
      );
    }
  };

  const toggleSave = async () => {
    if (status !== "authenticated") {
      toast.error("You need to be logged in to like posts.");
      open("welcome");
      return;
    }

    if (isSaved) {
      await unsave();
    } else {
      await save();
    }
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
