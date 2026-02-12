import React from "react";
import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import EditProfileDialog from "../dialogs/EditProfileDialog";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import { Profile } from "@repo/shared-types";

export default function ProfileActions({
  isOwnProfile,
  profile,
  setFollowerCount,
}: {
  isOwnProfile: boolean;
  profile: Profile;
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [editProfileDialogOpen, setEditProfileDialogOpen] =
    React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(profile.isFollowing);
  return (
    <>
      <EditProfileDialog
        open={editProfileDialogOpen}
        onOpenChange={setEditProfileDialogOpen}
      />
      <div className="flex items-center gap-2">
        {isOwnProfile && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditProfileDialogOpen(true)}
            >
              Edit Profile
            </Button>
          </>
        )}

        {/* For Others */}
        {!isOwnProfile && (
          <>
            <Button variant="outline" size="icon-sm">
              <MessageCircleMore size={16} strokeWidth={2.5} />
            </Button>

            {/* Follow Button  */}
            {isFollowing && (
              <UnfollowButton
                profile={profile}
                setIsFollowing={setIsFollowing}
                setFollowerCount={setFollowerCount}
              />
            )}
            {!isFollowing && (
              <FollowButton
                profile={profile}
                setIsFollowing={setIsFollowing}
                setFollowerCount={setFollowerCount}
              />
            )}
          </>
        )}
        <ProfileDropdownMenu isOwnProfile={isOwnProfile} />
      </div>
    </>
  );
}
