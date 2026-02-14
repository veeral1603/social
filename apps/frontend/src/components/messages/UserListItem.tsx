"use client";
import { Profile } from "@repo/shared-types";
import React from "react";
import Avatar from "../profile/Avatar";
import Link from "next/link";
import useConversationDialog from "@/src/stores/conversationDialogStore";

interface Props {
  user: { id: string; profile: Profile };
}

export default function UserListItem({ user }: Props) {
  const { closeDialog } = useConversationDialog();

  const handleClick = () => {
    closeDialog();
  };
  return (
    <Link href={`/messages/${user.id}`} onClick={handleClick}>
      <div className="py-2 px-4 cursor-pointer hover:bg-muted/80 transition duration-200">
        <div className="flex items-center gap-4">
          <Avatar src={user.profile?.avatar?.url} className="w-11! h-11!" />
          <div>
            <p className="font-medium text-[15px] leading-tight">
              {user.profile?.name ?? user.profile.username}
            </p>
            <p className="text-sm text-muted-foreground">
              @{user.profile?.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
