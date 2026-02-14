"use client";
import useConversationDialog from "@/src/stores/conversationDialogStore";
import React from "react";
import {
  DialogContent,
  DialogDescription,
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import UserList from "../messages/UserList";

export default function NewConversationDialog() {
  const { closeDialog, isOpen } = useConversationDialog();
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setSearchQuery("");
        closeDialog();
      }}
    >
      <DialogContent
        className="sm:max-w-lg p-0! gap-0!"
        showCloseButton={false}
      >
        <DialogDescription className="hidden">
          Start a new conversation.
        </DialogDescription>
        <DialogHeader className="gap-y-1! py-2! px-4!  relative border-b border-border">
          <div className="flex items-center flex-row justify-between">
            <DialogTitle>Start a new chat</DialogTitle>
            <DialogClose asChild className="w-max!">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </div>
          <div className="flex items-center  group text-sm">
            <span className="mr-2 flex items-center justify-center text-muted-foreground group-focus-within:text-primary group-hover:text-primary transition duration-200">
              <Search size={18} strokeWidth={3} />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="outline-0! border-0! flex-1 p-1 placeholder:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </DialogHeader>

        <div className="h-100 overflow-y-auto">
          <UserList searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
