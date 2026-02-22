"use client";
import React from "react";
import { Button } from "../ui/button";
import { Profile } from "@repo/shared-types";
import { toast } from "sonner";
import { unfollowUser } from "@/src/services/follow.service";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function UnfollowButton({
  profile,
  setIsFollowing,
  setFollowerCount,
}: {
  profile: Profile;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setFollowerCount?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const onUnfollow = async () => {
    setIsLoading(true);
    try {
      const response = await unfollowUser(profile.id as string);
      if (!response.success)
        throw new Error(response.message || "Failed to unfollow user");
      setIsFollowing(false);
      setFollowerCount?.((prev) => prev - 1);
      toast.success(response.message || "User unfollowed successfully");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onUnfollow}
      disabled={isLoading}
    >
      {!isLoading && <p>Unfollow</p>}
      {isLoading && <Spinner className="size-5" />}
    </Button>
  );
}
