import React from "react";
import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import EditProfileDialog from "../dialogs/EditProfileDialog";

export default function ProfileActions({
  isOwnProfile,
}: {
  isOwnProfile: boolean;
}) {
  const [editProfileDialogOpen, setEditProfileDialogOpen] =
    React.useState(false);
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
            <Button variant="secondary" size="icon-sm">
              <MessageCircleMore size={16} strokeWidth={2.5} />
            </Button>
            <Button variant="default" size="sm">
              Follow
            </Button>
          </>
        )}
        <ProfileDropdownMenu isOwnProfile={isOwnProfile} />
      </div>
    </>
  );
}
