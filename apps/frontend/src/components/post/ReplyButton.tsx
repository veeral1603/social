"use client";
import { Post } from "@repo/shared-types";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  isDetailed?: boolean;
  post: Post;
}

export default function ReplyButton({ isDetailed, post }: Props) {
  const [replyCount, setReplyCount] = React.useState<number>(
    post.counts?.replies || 0,
  );

  return (
    <Link
      href={`/profile/${post?.author?.username}/post/${post?.id}?reply=true`}
    >
      <button
        className={`flex items-center hover:bg-blue-500/10 hover:text-blue-500 gap-1 p-1 rounded-full cursor-pointer transition duration-300 ${isDetailed ? "text-sm md:text-lg" : "text-xs"}`}
      >
        <MessageCircle size={isDetailed ? 20 : 18} />
        <span>{replyCount}</span>
      </button>
    </Link>
  );
}
