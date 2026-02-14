import HeaderShell from "@/src/components/layout/header/HeaderShell";
import ChatHeader from "@/src/components/messages/ChatHeader";
import BackButton from "@/src/components/ui/BackButton";
import { Button } from "@/src/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import React from "react";

export default async function ChatLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <>
      <HeaderShell
        left={
          <div className="flex items-center gap-2">
            <BackButton />
            <ChatHeader userId={userId} />
          </div>
        }
        right={
          <Button variant="ghost">
            <EllipsisVertical className="size-5!" />
          </Button>
        }
      />
      {children}
    </>
  );
}
