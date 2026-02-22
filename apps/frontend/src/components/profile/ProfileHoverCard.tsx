"use client";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileByUsername } from "@/src/services/profile.service";
import { Spinner } from "../ui/spinner";
import Avatar from "./Avatar";
import { Profile } from "@repo/shared-types";
import FollowButton from "./FollowButton";
import { useProfileContext } from "@/src/hooks/useProfileContext";
import Link from "next/link";
import { formatCount } from "@/src/lib/utils";

interface Props {
  children: React.ReactNode;
  href: string;
  username: string;
}

export default function ProfileHoverCard({ children, href, username }: Props) {
  const { profile: selfProfile } = useProfileContext();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const isOwnProfile = selfProfile?.username === username;

  const { data: fetchedProfileData, isLoading } = useQuery({
    queryKey: ["user-profile", username],
    queryFn: () => getUserProfileByUsername(username),
    enabled: !!username && !isOwnProfile && isOpen,
    staleTime: 10000000,
    refetchOnWindowFocus: false,
  });
  const profile = isOwnProfile
    ? selfProfile
    : (fetchedProfileData?.data as Profile);

  return (
    <HoverCard openDelay={100} closeDelay={100} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <Link href={href}>{children}</Link>
      </HoverCardTrigger>
      {isLoading ? (
        <HoverCardContent>
          <div className="flex items-center justify-center">
            <Spinner className="size-7" />
          </div>
        </HoverCardContent>
      ) : (
        <HoverCardContent className="w-76! drop-shadow-xl! drop-shadow-purple-400/15!">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Avatar src={profile?.avatar?.url} className="w-14!" />
            </div>

            <div>
              <Link
                href={`/profile/${profile?.username}`}
                className="cursor-pointer hover:underline underline-offset-2"
              >
                <h3 className="font-semibold leading-tight">
                  {profile?.name || profile?.username}
                </h3>
              </Link>

              {/* Username  */}
              <Link
                href={`/profile/${profile?.username}`}
                className="cursor-pointer "
              >
                <span className=" text-muted-foreground leading-tight ">
                  @{profile?.username}
                </span>
              </Link>
            </div>

            <div>
              <p className="leading-tight text-sm whitespace-pre-wrap line-clamp-4">
                {profile?.bio}
              </p>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground mt-1 ">
              <p>
                <span className="text-foreground font-semibold">
                  {formatCount(profile?.followersCount ?? 0)}
                </span>{" "}
                followers
              </p>
              <p>
                <span className="text-foreground font-semibold">
                  {formatCount(profile?.followingCount ?? 0)}
                </span>{" "}
                following{" "}
              </p>
            </div>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
