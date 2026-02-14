"use client";
import { Send, Smile } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ChatInput() {
  const [input, setInput] = React.useState("");
  const [isMultiLine, setIsMultiLine] = React.useState(false);
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
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const onSend = async () => {
    if (!input.trim()) return;

    console.log("Message sent: ", input);

    setInput("");
    setIsMultiLine(false);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
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
