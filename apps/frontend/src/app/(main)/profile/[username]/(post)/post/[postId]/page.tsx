"use client";
import PostError from "@/src/components/post/PostError";
import PostNotFound from "@/src/components/post/PostNotFound";
import { Spinner } from "@/src/components/ui/spinner";
import { getPostById } from "@/src/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import DetailedPost from "@/src/components/post/DetailedPost";
import PostReplyCard from "@/src/components/post/PostReplyCard";
import PostReplies from "@/src/components/post/PostReplies";
import PostReplyDialog from "@/src/components/post/PostReplyDialog";
import usePostReplyDialog from "@/src/stores/postReplyDialogStore";

export default function PostPage() {
  const { postId } = useParams();
  const searchParams = useSearchParams();
  const reply = searchParams.get("reply");

  const { openDialog, closeDialog } = usePostReplyDialog();

  React.useEffect(() => {
    if (Boolean(reply) === true) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [reply, openDialog, closeDialog]);

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
      <PostReplyDialog post={post} />
      <PostReplyCard profile={post?.author} />
      <PostReplies postId={post?.id as string} />
    </div>
  );
}
