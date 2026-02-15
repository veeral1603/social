"use client";
import { getConversationMessages } from "@/src/services/conversation.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import { Message as MessageType } from "@repo/shared-types";
import Message from "./Message";
import { socket } from "@/src/lib/socket";

interface Props {
  conversationId?: string;
  isConversationLoading: boolean;
}

export default function Chat({ conversationId, isConversationLoading }: Props) {
  const queryClient = useQueryClient();
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    socket.on("receive_message", handleNewMessage);

    function handleNewMessage(message: MessageType) {
      if (!conversationId) {
      }

      queryClient.setQueryData<MessageType[]>(
        ["conversation-messages", message.conversationId],
        (oldMessages) => {
          if (message.conversationId !== conversationId)
            return oldMessages || [];

          if (!oldMessages) return [message];

          if (oldMessages.some((m) => m.id === message.id)) return oldMessages;

          const filtered = oldMessages.filter((m) => !m.id.startsWith("temp"));

          return [...filtered, message];
        },
      );
    }

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [queryClient, conversationId]);

  const { data: messages, isLoading: isMessagesLoading } = useQuery<
    MessageType[]
  >({
    queryKey: ["conversation-messages", conversationId],
    queryFn: () => getConversationMessages(conversationId!),
    enabled: !!conversationId,
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
    return (
      <div className="flex-1 h-full p-2 md:p-0 overflow-y-auto chat-scrollbar"></div>
    );
  }

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-1 h-full w-full chat-scrollbar p-3 overflow-y-auto scroll-smooth "
      ref={messagesContainerRef}
    >
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
