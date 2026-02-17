"use client";
import PostError from "@/src/components/post/PostError";
import PostNotFound from "@/src/components/post/PostNotFound";
import { Spinner } from "@/src/components/ui/spinner";
import { getPostById } from "@/src/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React from "react";
import DetailedPost from "@/src/components/post/DetailedPost";
import PostReplyCard from "@/src/components/post/PostReplyCard";

export default function PostPage() {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId as string),
    enabled: !!postId,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });

  const isNotFound = isError && (error as AxiosError).response?.status === 404;

  if (isError && isNotFound) {
    return <PostNotFound />;
  }

  if (isError) {
    return <PostError postId={postId as string} />;
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-8  border-border">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <div>
      <DetailedPost post={post} />
      <PostReplyCard profile={post?.author} />
    </div>
  );
}
