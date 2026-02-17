"use client";
import React from "react";
import BackButton from "../ui/BackButton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileByUsername } from "@/src/services/profile.service";
import { AxiosError } from "axios";
import ProfileNotFound from "./ProfileNotFound";
import ProfileSkeleton from "./ProfileSkeleton";
import ProfileError from "./ProfileError";
import ProfileActions from "./ProfileActions";
import { useProfileContext } from "@/src/hooks/useProfileContext";
import Avatar from "./Avatar";

export default function ProfileInfo({ username }: { username: string }) {
  const { profile: ownProfile } = useProfileContext();
  const isOwnProfile = ownProfile?.username === username;

  const {
    data: fetchedProfile,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-profile", username],
    queryFn: () => getUserProfileByUsername(username),
    enabled: !isOwnProfile,
    staleTime: 100000000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });

  const profile = isOwnProfile ? ownProfile : fetchedProfile?.data;
  const isNotFound = isError && (error as AxiosError).response?.status === 404;

  const [followerCount, setFollowerCount] = React.useState<number>(
    profile?.followersCount || 0,
  );

  React.useEffect(() => {
    if (profile?.followersCount !== undefined) {
      setFollowerCount(profile.followersCount);
    }
  }, [profile?.followersCount]);

  if (isNotFound) {
    return <ProfileNotFound />;
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return <ProfileError username={username} />;
  }
  return (
    <div>
      {/* Profile Banner  */}
      <div className="overflow-hidden h-42 sm:h-48 w-full bg-muted relative">
        <BackButton
          className="absolute! top-3 left-3 z-10 "
          variant="secondary"
          size="icon-sm"
        />
        {profile.banner && (
          <Image
            src={profile.banner?.url}
            alt="Profile banner"
            fill
            priority
            className="object-cover"
          />
        )}
      </div>

      <div className="p-3 md:p-4 relative border-b border-border">
        <div className="flex items-center justify-end">
          <ProfileActions
            isOwnProfile={isOwnProfile}
            profile={profile}
            setFollowerCount={setFollowerCount}
          />
        </div>

        {/* Profile Details  */}
        <div className="flex flex-col gap-1 mt-2 md:mt-4">
          <div>
            <h4 className="font-bold text-2xl md:text-4xl ">
              {profile?.name || profile?.username}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">@{profile?.username}</p>
            {profile.isFollower && (
              <div className="px-1 text-muted-foreground rounded-[4px] bg-muted  text-[10px] border border-border ">
                Follows you
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground ">
            <p>
              <span className="text-foreground font-semibold">
                {followerCount}
              </span>{" "}
              followers
            </p>
            <p>
              <span className="text-foreground font-semibold">
                {profile?.followingCount}
              </span>{" "}
              following{" "}
            </p>

            <p>
              <span className="text-foreground font-semibold">
                {profile?.postsCount ?? 0}
              </span>{" "}
              posts
            </p>
          </div>

          {profile?.bio && (
            <div className="mt-1">
              <p className="leading-tight md:text-base whitespace-pre-wrap">
                {profile.bio}
              </p>
            </div>
          )}
        </div>

        {/* Avatar Image  */}
        <div className="absolute -top-10">
          <Avatar
            src={profile?.avatar?.url}
            className="w-20! md:w-24! border-2 border-background"
          />
        </div>
      </div>
    </div>
  );
}
