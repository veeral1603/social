"use client";
import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { followUser } from "@/src/services/follow.service";
import { useQueryClient } from "@tanstack/react-query";
import { Profile } from "@repo/shared-types";

export default function FollowButton({
  profile,
  setIsFollowing,
  setFollowerCount,
}: {
  profile: Profile;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const onFollow = async () => {
    setIsLoading(true);
    try {
      const response = await followUser(profile.id as string);
      if (!response.success)
        throw new Error(response.message || "Failed to follow user");

      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);

      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(response.message || "User followed successfully");
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant="default" size="sm" onClick={onFollow} disabled={isLoading}>
      {!isLoading && (profile.isFollower ? <p>Follow Back</p> : <p>Follow</p>)}
      {isLoading && <Spinner className="size-5" />}
    </Button>
  );
}
