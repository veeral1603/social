"use client";

import type { Post } from "@repo/shared-types";
import React from "react";
import PostActions from "./PostActions";
import Avatar from "../profile/Avatar";
import Link from "next/link";
import { formatCount, formatDateTime } from "@/src/lib/utils";

interface Props {
  post: Post;
}

export default function DetailedPost({ post }: Props) {
  return (
    <div className="p-4 pb-2 transition duration-300 border-b border-border flex flex-col gap-2">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author?.username}`} className="shrink-0">
            <Avatar src={post.author?.avatar?.url} className="w-12!" />
          </Link>

          <div className="">
            {/* Name  */}
            <Link
              href={`/profile/${post.author?.username}`}
              className="cursor-pointer hover:underline underline-offset-2 font-semibold leading-tight"
            >
              <h3>{post.author?.name || post.author?.username}</h3>
            </Link>

            {/* Username  */}
            <Link
              href={`/profile/${post.author?.username}`}
              className="cursor-pointer text-muted-foreground leading-tight"
            >
              <span>@{post.author?.username}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="-mt-1">
        <p className="mt-1 whitespace-pre-wrap leading-5">{post.content}</p>
      </div>

      <div className=" pb-2 pt-2 text-sm  text-muted-foreground flex items-center ">
        <p>{formatDateTime(post.createdAt)}</p>
      </div>

      <div className="border-y border-border py-2 flex items-center gap-4 text-muted-foreground">
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">358</span>
          <p>reposts</p>
        </div>
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">3</span>
          <p>quotes</p>
        </div>
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">
            {formatCount(post.counts?.likes as number)}
          </span>
          <p>likes</p>
        </div>
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">358</span>
          <p>saves</p>
        </div>
      </div>

      <PostActions post={post} isDetailed={true} />
    </div>
  );
}
