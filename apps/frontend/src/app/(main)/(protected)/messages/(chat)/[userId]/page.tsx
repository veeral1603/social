"use client";
import Chat from "@/src/components/messages/Chat";
import ChatInput from "@/src/components/messages/ChatInput";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { socket } from "@/src/lib/socket";
import { getConversation } from "@/src/services/conversation.service";
import { Conversation, Message } from "@repo/shared-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

export default function ChatPage() {
  const { userId } = useParams();
  const { data: conversation, isLoading: isConversationLoading } =
    useQuery<Conversation>({
      queryKey: ["conversation", userId],
      queryFn: () => getConversation(userId as string),
      enabled: !!userId,
      refetchOnWindowFocus: false,
    });
  const {
    auth: { user },
  } = useAuthContext();

  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!user?.id || !userId) return;

    socket.emit("join_user_room", user.id);

    socket.on("receive_message", (message: Message) => {
      if (conversation) return;

      queryClient.setQueryData(
        ["conversation", userId],
        (oldConversation: Conversation) => {
          if (oldConversation) return oldConversation;

          return {
            id: message.conversationId,
            lastMessageId: message.id,
          };
        },
      );
    });

    return () => {
      socket.emit("leave_user_room", user.id);
    };
  }, [userId, user?.id]);

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col ">
      <Chat
        conversationId={conversation?.id as string}
        isConversationLoading={isConversationLoading}
      />
      <ChatInput
        receiverId={userId as string}
        conversationId={conversation?.id as string}
      />
    </div>
  );
}
