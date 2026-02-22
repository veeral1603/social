"use client";
import React from "react";
import Avatar from "../profile/Avatar";
import { Profile } from "@repo/shared-types";
import usePostReplyDialog from "@/src/stores/postReplyDialogStore";

interface Props {
  profile: Profile;
}

export default function PostReplyCard({ profile }: Props) {
  const { openDialog } = usePostReplyDialog();
  return (
    <div className="px-2 py-1 border-b border-border">
      <div
        className="hover:bg-muted transition duration-300 cursor-pointer flex items-center gap-2 p-2 rounded-full text-muted-foreground"
        onClick={openDialog}
      >
        <Avatar src={profile?.avatar?.url} className="w-7!" />
        <p>Write your reply</p>
      </div>
    </div>
  );
}
