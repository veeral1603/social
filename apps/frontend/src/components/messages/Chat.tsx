"use client";
import {
  getConversation,
  getConversationMessages,
} from "@/src/services/conversation.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import { Message as MessageType } from "@repo/shared-types";
import Message from "./Message";

interface Props {
  participantId: string;
}

export default function Chat({ participantId }: Props) {
  const { data: conversation, isLoading: isConversationLoading } = useQuery({
    queryKey: ["conversation", participantId],
    queryFn: () => getConversation(participantId),
    enabled: !!participantId,
    refetchOnWindowFocus: false,
  });

  const { data: messages, isLoading: isMessagesLoading } = useQuery<
    MessageType[]
  >({
    queryKey: ["conversation-messages", conversation?.id],
    queryFn: () => getConversationMessages(conversation!.id),
    enabled: !!conversation?.id,
    refetchOnWindowFocus: false,
  });

  if (isConversationLoading || isMessagesLoading) {
    return (
      <div className="flex-1 h-full w-full flex items-center justify-center">
        <Spinner className="size-6 md:size-7" />
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return <div className="flex-1 h-full p-2 md:p-0 overflow-y-auto"></div>;
  }

  return (
    <div className="flex-1 h-full p-2 md:p-0 overflow-y-auto">
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          previousMessage={messages[index - 1]}
        />
      ))}
    </div>
  );
}
