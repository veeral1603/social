"use client";
import { useProfileContext } from "@/src/hooks/useProfileContext";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Images } from "lucide-react";
import usePostDialog from "@/src/stores/postDialogStore";

export default function HomePostCard() {
  const { profile } = useProfileContext();
  const { openDialog } = usePostDialog();
  return (
    <div
      className="py-2 px-4 border-b border-border flex items-center cursor-pointer hover:bg-muted/60 transition duration-300 gap-4"
      onClick={openDialog}
    >
      <div className="relative w-10 md:w-12 aspect-square rounded-full overflow-hidden flex items-center justify-center ">
        <Image
          src={profile?.avatar?.url ?? "/images/avatar.jpg"}
          alt="User Avatar"
          fill
          className="object-cover rounded-full"
        />
      </div>
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
