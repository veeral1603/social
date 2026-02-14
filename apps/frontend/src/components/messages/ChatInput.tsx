"use client";
import { Send, Smile } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { sendMessage } from "@/src/services/message.service";

interface Props {
  receiverId: string;
}

export default function ChatInput({ receiverId }: Props) {
  const [input, setInput] = React.useState("");
  const [isMultiLine, setIsMultiLine] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

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

    try {
      setIsSending(true);
      const response = await sendMessage(receiverId, input.trim());
      if (!response.success)
        throw new Error(response.message || "Failed to send message");

      // On Success
      setInput("");
      setIsMultiLine(false);

      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
      }
    } catch (error) {
      toast.error((error as Error).message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`rounded-[24px] border border-border px-2 py-1.5 flex  gap-2 ${isMultiLine ? "items-end" : "items-center"}`}
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
      >
        <Send strokeWidth={2.5} />
      </Button>
    </div>
  );
}
