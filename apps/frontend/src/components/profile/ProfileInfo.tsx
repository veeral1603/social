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
  const profile = isOwnProfile ? ownProfile : fetchedProfile;
  const isNotFound = isError && (error as AxiosError).response?.status === 404;

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
          <ProfileActions isOwnProfile={isOwnProfile} />
        </div>

        {/* Profile Details  */}
        <div className="flex flex-col gap-1 mt-2 md:mt-4">
          <div>
            <h4 className="font-bold text-2xl md:text-4xl ">
              {profile?.name || profile?.username}
            </h4>
          </div>

          <div>
            <p className="text-muted-foreground">@{profile?.username}</p>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground ">
            <p>
              <span className="text-foreground font-semibold">0</span> followers
            </p>
            <p>
              <span className="text-foreground font-semibold">0</span>{" "}
              following{" "}
            </p>

            <p>
              <span className="text-foreground font-semibold">0</span> posts
            </p>
          </div>

          {profile?.bio && (
            <div className="mt-1">
              <p className="leading-tight md:text-base">{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Avatar Image  */}
        <div className="absolute -top-10">
          <div className="relative w-20 md:w-24 aspect-square rounded-full overflow-hidden flex items-center justify-center border-2 border-background">
            <Image
              src={profile?.avatar?.url ?? "/images/avatar.jpg"}
              alt="User Avatar"
              fill
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
