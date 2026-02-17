"use client";
import { getConversationMessages } from "@/src/services/conversation.service";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import { Message as MessageType } from "@repo/shared-types";
import Message from "./Message";
import { socket } from "@/src/lib/socket";
import useIsUserTyping from "@/src/hooks/useIsUserTyping";
import { cn } from "@/src/lib/utils";

interface Props {
  conversationId?: string;
  isConversationLoading: boolean;
}

export default function Chat({ conversationId, isConversationLoading }: Props) {
  const queryClient = useQueryClient();
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["conversation-messages", conversationId],
      queryFn: ({ pageParam }) =>
        getConversationMessages(conversationId as string, pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!conversationId,
      refetchOnWindowFocus: false,
    });

  const messages =
    data?.pages
      .slice()
      .reverse()
      .flatMap((page) => page.messages) ?? [];

  React.useEffect(() => {
    socket.on("receive_message", handleNewMessage);

    function handleNewMessage(message: MessageType) {
      if (!conversationId) {
      }

      queryClient.setQueryData<{
        messages: MessageType[];
        nextCursor?: string;
      }>(["conversation-messages", message.conversationId], (oldData: any) => {
        if (!oldData) {
          return {
            pages: [
              {
                messages: [message],
                nextCursor: undefined,
              },
            ],
            pageParams: [undefined],
          };
        }

        const exists = oldData.pages.some((page: any) =>
          page.messages.some((m: MessageType) => m.id === message.id),
        );

        if (exists) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === 0) {
              const filteredMessages = page.messages.filter(
                (m: MessageType) =>
                  !(m.id.startsWith("temp") && m.content === message.content),
              );

              return {
                ...page,
                messages: [...filteredMessages, message],
              };
            }

            return page;
          }),
        };
      });
    }

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [queryClient, conversationId]);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [data]);

  React.useEffect(() => {
    const chatContainer = messagesContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = async () => {
      if (!chatContainer) return;

      if (chatContainer.scrollTop <= 20) {
        if (hasNextPage && !isFetchingNextPage) {
          const prevHeight = chatContainer.scrollHeight;
          console.log("Fetching next page...");
          await fetchNextPage();

          requestAnimationFrame(() => {
            const newHeight = chatContainer.scrollHeight;
            chatContainer.scrollTop = newHeight - prevHeight;
          });
        }
      }
    };

    chatContainer.addEventListener("scroll", handleScroll);

    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isTyping = useIsUserTyping();

  if (isConversationLoading) {
    return (
      <div className="flex-1 h-full w-full flex items-center justify-center">
        <Spinner className="size-6 md:size-7" />
      </div>
    );
  }

  if (!data || messages.length === 0) {
    return (
      <div className="flex-1 h-full p-2 md:p-0 overflow-y-auto chat-scrollbar"></div>
    );
  }

  return (
    <div
      className="flex-1 h-full w-full chat-scrollbar p-3 pb-16! overflow-y-auto "
      ref={messagesContainerRef}
    >
      {isFetching && (
        <div className="p-8 flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      )}
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          previousMessage={messages[index - 1]}
        />
      ))}
      {isTyping && (
        <div className={cn("w-full flex mt-2 justify-start")}>
          <div
            className={`px-4 py-2 max-w-[75%] rounded-2xl bg-muted text-foreground text-sm leading-relaxed wrap-break-word shadow-sm }`}
          >
            <p className="whitespace-pre-wrap leading-snug animate-pulse">
              typing...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
