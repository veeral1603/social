import { Conversation as ConversationType } from "@repo/shared-types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { formatTimeAgo } from "@/src/lib/utils";
import Link from "next/link";
interface Props {
  conversation: ConversationType;
}

export default function Conversation({ conversation }: Props) {
  const lastMessageSender =
    conversation.lastMessage?.senderId === conversation.otherParticipant?.id
      ? (conversation.otherParticipant?.profile?.name ?? "unknown")
      : "You";
  return (
    <Link href={`/messages/${conversation.otherParticipant?.id}`}>
      <div className="px-4 py-2 cursor-pointer hover:bg-muted/60 transition duration-300 flex items-center gap-4">
        <div className="relative w-12 md:w-14 aspect-square rounded-full overflow-hidden flex items-center justify-center ">
          <Image
            src={
              conversation.otherParticipant?.profile?.avatar?.url ??
              "/images/avatar.jpg"
            }
            alt="User Avatar"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex-1 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold truncate">
                {conversation.otherParticipant?.profile?.name ??
                  `${conversation.otherParticipant?.profile?.username ?? "unknown"}`}
              </h4>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(conversation.updatedAt)}
              </p>
            </div>

            <p className="text-sm text-muted-foreground truncate">
              @{conversation.otherParticipant?.profile?.username ?? "unknown"}
            </p>

            <p className="text-sm text-muted-foreground max-w-50 truncate line-clamp-1 ">
              {lastMessageSender}: {conversation.lastMessage?.content}
            </p>
          </div>
          <div className="pointer-events-none">
            <Button variant="ghost" size="icon-lg">
              <Ellipsis />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
