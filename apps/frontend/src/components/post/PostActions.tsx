import React from "react";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import RepostButton from "./RepostButton";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";
import { Post } from "@repo/shared-types";

interface Props {
  post: Post;
  isDetailed?: boolean;
}

export default function PostActions({ post, isDetailed }: Props) {
  return (
    <div
      className={`flex items-center gap-2 justify-between text-muted-foreground ${!isDetailed ? "mt-2" : ""}`}
    >
      <div className="flex max-w-[50%] items-center w-full  justify-between gap-4 ">
        <ReplyButton isDetailed={isDetailed as boolean} post={post} />
        <RepostButton isDetailed={isDetailed as boolean} />
        <LikeButton post={post} isDetailed={isDetailed as boolean} />
      </div>

      <div className="flex  items-center w-max  gap-1 ">
        <SaveButton isDetailed={isDetailed as boolean} />
        <ShareButton isDetailed={isDetailed as boolean} />
      </div>
    </div>
  );
}
