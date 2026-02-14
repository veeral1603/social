"use client";

import { useAuthContext } from "@/src/hooks/useAuthContext";
import { cn, formatTime } from "@/src/lib/utils";
import type { Message } from "@repo/shared-types";
import React from "react";

interface Props {
  message: Message;
  previousMessage?: Message | undefined;
}

export default function MessageBubble({ message, previousMessage }: Props) {
  const { auth } = useAuthContext();
  const isOwnMessage = auth?.user?.id === message.senderId;

  const isFirstMessageOfChat = !previousMessage;

  const isLastMessageFromSender =
    previousMessage && previousMessage.senderId !== message.senderId;

  const isLastMessageFrequent =
    previousMessage &&
    new Date(message.createdAt).getTime() -
      new Date(previousMessage.createdAt).getTime() <
      10 * 60 * 1000; // 10 minutes

  return (
    <>
      {!isLastMessageFrequent && (
        <div
          className={cn(
            "text-center text-xs text-muted-foreground w-full mb-4",
            isFirstMessageOfChat ? "mt-0" : "mt-8 ",
          )}
        >
          <p>{formatTime(message.createdAt)}</p>
        </div>
      )}
      <div
        className={cn(
          "w-full flex mt-2",
          isOwnMessage ? "justify-end" : "justify-start",
          isLastMessageFromSender ? "mt-4" : "mt-1",
        )}
      >
        <div
          className={`px-4 py-2 max-w-[75%] rounded-2xl  leading-relaxed wrap-break-word shadow-sm ${isOwnMessage ? "bg-primary text-primary-foreground " : "bg-muted text-foreground "}`}
        >
          <p className="whitespace-pre-wrap leading-snug">{message.content}</p>
        </div>
      </div>
    </>
  );
}
