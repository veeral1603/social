"use client";
import { getPostReplies } from "@/src/services/post.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import { Post as PostType } from "@repo/shared-types";
import Post from "./Post";

interface Props {
  postId: string;
}

export default function PostReplies({ postId }: Props) {
  const { data: postReplies, isLoading } = useQuery({
    queryKey: ["post-replies", postId],
    queryFn: () => getPostReplies(postId),
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Spinner className="size-5" />
      </div>
    );
  }

  if (postReplies && postReplies.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground text-sm md:text-base">
          No replies yet. Be the first to reply!
        </p>
      </div>
    );
  }

  return (
    <div>
      {postReplies?.map((reply: PostType) => (
        <Post key={reply.id} post={reply} />
      ))}
    </div>
  );
}
