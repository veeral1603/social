"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Image, Trash2 } from "lucide-react";

export default function ImageOptionsDropdown({
  type,
  align,
  onInputFieldOpen,
  onRemove,
  existingImage,
  children,
  isDeleted = false,
}: {
  type: "avatar" | "banner";
  align?: "start" | "center" | "end";
  onInputFieldOpen: () => void;
  onRemove: () => void;
  existingImage: boolean;
  children: React.ReactNode;
  isDeleted?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align ?? "end"} className=" rounded-[6px]">
        <DropdownMenuItem
          onSelect={onInputFieldOpen}
          className="flex items-center justify-between gap-2 rounded-[6px] "
        >
          <span>Upload new {type}</span>
          <Image size={16} />
        </DropdownMenuItem>
        {existingImage && !isDeleted && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center justify-between gap-2 rounded-[6px] "
              onSelect={onRemove}
              variant="destructive"
            >
              <span>Remove {type}</span>
              <Trash2 />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
