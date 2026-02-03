"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis, Link2, Search, UserRoundX } from "lucide-react";
import { toast } from "sonner";

export default function ProfileDropdownMenu({
  isOwnProfile,
}: {
  isOwnProfile: boolean;
}) {
  const onCopyProfileLink = () => {
    const profileLink = window.location.href;
    navigator.clipboard.writeText(profileLink);
    toast.success("Profile link copied to clipboard!");
  };

  const onBlockUser = () => {
    console.log("Block user action");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="rounded-md">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="mt-1 rounded-[6px]">
        <DropdownMenuItem
          onSelect={onCopyProfileLink}
          className="flex items-center justify-between gap-2 rounded-[6px]"
        >
          <span>Copy link to profile</span>
          <Link2 size={16} />
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between gap-2 rounded-[6px]">
          <span>Search posts</span>
          <Search size={16} />
        </DropdownMenuItem>

        {!isOwnProfile && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={onBlockUser}
              className="flex items-center justify-between gap-2 rounded-[6px] text-destructive focus:text-destructive"
            >
              <span>Block user</span>
              <UserRoundX size={16} />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
