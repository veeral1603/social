import React from "react";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import RepostButton from "./RepostButton";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

export default function PostActions() {
  return (
    <div className="flex items-center gap-2 justify-between text-muted-foreground mt-2 ">
      <div className="flex max-w-[60%] items-center w-full  justify-between gap-4 ">
        <ReplyButton />
        <RepostButton />
        <LikeButton />
      </div>

      <div className="flex  items-center w-max  gap-1 ">
        <SaveButton />
        <ShareButton />
      </div>
    </div>
  );
}
