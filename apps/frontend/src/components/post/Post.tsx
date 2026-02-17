import { formatTimeAgo } from "@/src/lib/utils";
import type { Post } from "@repo/shared-types";
import React from "react";
import PostActions from "./PostActions";
import Avatar from "../profile/Avatar";
import Link from "next/link";

interface Props {
  post: Post;
}

export default function Post({ post }: Props) {
  return (
    <div className="px-4 py-2 flex items-start gap-3 cursor-pointer hover:bg-muted/60 transition duration-300 border-b border-border">
      <Link href={`/profile/${post.author?.username}`} className="shrink-0">
        <Avatar src={post.author?.avatar?.url} className="w-10! md:w-12!" />
      </Link>
      <div className="w-full">
        <div className="flex items-center gap-1">
          {/* Name  */}
          <Link
            href={`/profile/${post.author?.username}`}
            className="cursor-pointer hover:underline underline-offset-2"
          >
            <h3 className="font-semibold ">{post.author?.name}</h3>
          </Link>

          {/* Username  */}
          <Link
            href={`/profile/${post.author?.username}`}
            className="cursor-pointer"
          >
            <span className=" text-muted-foreground">
              @{post.author?.username}
            </span>
          </Link>
          <span className="text-muted-foreground">·</span>

          {/* Time  */}
          <span className="text-sm text-muted-foreground">
            {formatTimeAgo(post.createdAt)}
          </span>
        </div>
        <div className="-mt-1">
          <p className="mt-1 whitespace-pre-wrap leading-5">{post.content}</p>
        </div>
        <PostActions post={post} />
      </div>
    </div>
  );
}
