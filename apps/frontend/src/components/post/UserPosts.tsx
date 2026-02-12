"use client";
import { getPostsByUsername } from "@/src/services/post.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import { CircleAlert } from "lucide-react";
import { Button } from "../ui/button";
import Post from "./Post";
import { Post as PostType } from "@repo/shared-types";

interface Props {
  username: string;
}

export default function UserPosts({ username }: Props) {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-posts", username],
    queryFn: () => getPostsByUsername(username),
    enabled: !!username,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (isError) {
    <div className="p-4 text-center  flex flex-col items-center gap-2">
      <CircleAlert size={64} />
      <h2 className="text-2xl font-bold ">Something Went Wrong</h2>
      <p className="text-muted-foreground ">
        We encountered an error while loading posts. Please try again.
      </p>

      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          queryClient.refetchQueries({ queryKey: ["user-posts", username] })
        }
      >
        Try Again
      </Button>
    </div>;
  }

  if (posts && posts.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No posts available.
      </div>
    );
  }
  return (
    <div>
      {posts?.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
      <div className="p-8 text-muted-foreground text-sm flex items-center justify-center">
        <p>End of posts</p>
      </div>
    </div>
  );
}
