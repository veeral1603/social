import { formatTimeAgo } from "@/src/lib/utils";
import type { Post } from "@repo/shared-types";
import Image from "next/image";
import React from "react";
import PostActions from "./PostActions";

interface Props {
  post: Post;
}

export default function Post({ post }: Props) {
  return (
    <div className="px-4 py-2 flex items-start gap-4 cursor-pointer hover:bg-muted/60 transition duration-300 border-b border-border">
      <div className="relative w-10 md:w-12 aspect-square rounded-full overflow-hidden flex items-center justify-center ">
        <Image
          src={post.author?.avatar?.url ?? "/images/avatar.jpg"}
          alt="User Avatar"
          fill
          className="object-cover rounded-full"
        />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold ">{post.author?.name}</h3>
          <span className=" text-muted-foreground">
            @{post.author?.username}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">
            {formatTimeAgo(post.createdAt)}
          </span>
        </div>
        <div>
          <p className="mt-1 whitespace-pre-wrap leading-5">{post.content}</p>
        </div>
        <PostActions />
      </div>
    </div>
  );
}
