"use client";
import { Send, Smile } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { socket } from "@/src/lib/socket";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { v4 as uuid } from "uuid";
import { Message } from "@repo/shared-types";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  receiverId: string;
  conversationId?: string;
}

export default function ChatInput({ receiverId, conversationId }: Props) {
  const [input, setInput] = React.useState("");
  const [isMultiLine, setIsMultiLine] = React.useState(false);
  const [isSending, _setIsSending] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const {
    auth: { user },
  } = useAuthContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 300) {
      toast.error("Your message is too long");
      return;
    }
    setInput(e.target.value);

    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    setIsMultiLine(textareaRef.current.scrollHeight > 40);
  };

  const onSend = async () => {
    if (!input.trim()) return;

    const tempId = uuid();

    const optimisticMessage: Message = {
      id: "temp-" + tempId,
      conversationId: conversationId ?? "temp",
      senderId: user?.id as string,
      content: input.trim(),
      createdAt: new Date(),
    };

    queryClient.setQueryData(
      ["conversation-messages", conversationId],
      (oldData: any) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                messages: [...page.messages, optimisticMessage],
              };
            }
          }),
        };
      },
    );

    socket.emit("send_message", {
      receiverId,
      content: input.trim(),
      senderId: user?.id,
    });
    setInput("");
    setIsMultiLine(false);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  return (
    <div className="absolute bottom-2 inset-x-4">
      <div
        className={`rounded-[24px] bg-background border border-border px-2 py-1.5 flex  gap-2 ${isMultiLine ? "items-end" : "items-center"}`}
      >
        <button className="text-muted-foreground  rounded-full p-1 cursor-pointer hover:text-primary transition-colors">
          <Smile strokeWidth={2.5} />
        </button>

        <textarea
          className="w-full bg-transparent outline-none flex-1 resize-none max-h-80"
          placeholder="Type a message..."
          rows={1}
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
        />

        <Button
          variant="default"
          className="rounded-full! aspect-square! h-8 w-8 p-0 flex items-center justify-center"
          onClick={onSend}
          disabled={isSending}
        >
          <Send strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
}
