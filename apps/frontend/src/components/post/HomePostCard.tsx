"use client";
import { useProfileContext } from "@/src/hooks/useProfileContext";
import React from "react";
import { Button } from "../ui/button";
import { Images } from "lucide-react";
import usePostDialog from "@/src/stores/postDialogStore";
import Avatar from "../profile/Avatar";

export default function HomePostCard() {
  const { profile } = useProfileContext();
  const { openDialog } = usePostDialog();
  return (
    <div
      className="py-2 px-4 border-b border-border flex items-center cursor-pointer hover:bg-muted/60 transition duration-300 gap-4"
      onClick={openDialog}
    >
      <Avatar src={profile?.avatar?.url} className="w-10! md:w-12!" />
      <div className="flex-1 text-muted-foreground text-sm md:text-base">
        <p>What's Up?</p>
      </div>

      <div>
        <Button
          variant="ghost"
          className="bg-transparent! text-muted-foreground! hover:text-primary!"
        >
          <Images className="w-5! h-5!" />
        </Button>
      </div>
    </div>
  );
}
