import Chat from "@/src/components/messages/Chat";
import ChatInput from "@/src/components/messages/ChatInput";
import React from "react";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col p-2 md:p-4">
      <Chat participantId={userId} />
      <ChatInput receiverId={userId} />
    </div>
  );
}
