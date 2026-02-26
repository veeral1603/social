"use client";
import { getUserSaves } from "@/src/services/save.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import { Post as PostType } from "@repo/shared-types";
import Post from "../post/Post";

export default function SavedPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["user-saved-posts"],
    queryFn: getUserSaves,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (posts && posts.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No saved posts available.
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
