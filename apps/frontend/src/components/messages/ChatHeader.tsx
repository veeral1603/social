"use client";
import { getProfileByUserId } from "@/src/services/profile.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Avatar from "../profile/Avatar";
import { Profile } from "@repo/shared-types";

interface Props {
  userId: string;
}

export default function ChatHeader({ userId }: Props) {
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["user-profile", userId],
    queryFn: () => getProfileByUserId(userId),
    staleTime: 100000000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-muted-foreground/30 animate-pulse" />
        <div>
          <div className="w-20 h-4 bg-muted-foreground/30 animate-pulse mb-1" />
          <div className="w-16 h-3 bg-muted-foreground/30 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-muted-foreground/30" />
        <div>
          <p className="font-medium text-[15px] leading-tight">Unknown User</p>
          <p className="text-sm text-muted-foreground">@unknown</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-10! h-10!" src={profile?.avatar?.url} />
      <div>
        <p className="font-medium text-[15px] leading-tight">
          {profile?.name ?? profile?.username}
        </p>
        <p className="text-sm text-muted-foreground">@{profile?.username}</p>
      </div>
    </div>
  );
}
