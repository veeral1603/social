"use client";

import { useProfileContext } from "@/src/hooks/useProfileContext";
import React from "react";
import Avatar from "../../profile/Avatar";

export default function MobileProfileSnapshot() {
  const { profile } = useProfileContext();
  if (!profile) return null;

  return (
    <div className="px-6 py-4 flex flex-col gap-2">
      <Avatar className="w-12!" src={profile?.avatar?.url} />

      <div>
        {profile.name && (
          <h4 className="text-lg font-bold leading-4">{profile?.name}</h4>
        )}
        <p className="text-muted-foreground ">@{profile?.username}</p>
      </div>

      <div className="flex items-center gap-3 text-muted-foreground ">
        <p>
          <span className="text-foreground font-semibold">
            {profile.followersCount}
          </span>{" "}
          followers
        </p>
        <p>
          <span className="text-foreground font-semibold">
            {profile.followingCount}
          </span>{" "}
          following{" "}
        </p>
      </div>
    </div>
  );
}
