"use client";
import { getUserConversations } from "@/src/services/conversation.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { CircleAlert, MessageCircleMore } from "lucide-react";
import Conversation from "./Conversation";
import { Conversation as ConversationType } from "@repo/shared-types";

export default function ConversationLists() {
  const {
    data: conversations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-conversations"],
    queryFn: getUserConversations,
  });
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (isError) {
    if (isError) {
      <div className="p-4 text-center  flex flex-col items-center gap-2">
        <CircleAlert size={64} />
        <h2 className="text-2xl font-bold ">Something Went Wrong</h2>
        <p className="text-muted-foreground ">
          We encountered an error while loading conversations. Please try again.
        </p>

        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            queryClient.refetchQueries({ queryKey: ["user-conversations"] })
          }
        >
          Try Again
        </Button>
      </div>;
    }
  }

  if (conversations && conversations.length === 0) {
    return (
      <div className="p-4 text-center  flex flex-col items-center gap-2">
        <MessageCircleMore size={48} className="text-primary" />
        <h2 className="text-2xl font-bold ">Nothing here</h2>
        <p className="text-muted-foreground ">
          You have no conversation yet. Start one!
        </p>
      </div>
    );
  }
  return (
    <div>
      {conversations.map((c: ConversationType) => (
        <Conversation key={c.id} conversation={c} />
      ))}
    </div>
  );
}
