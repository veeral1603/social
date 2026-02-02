import React from "react";
import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";

export default function ProfileActions({
  isOwnProfile,
}: {
  isOwnProfile: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {isOwnProfile && (
        <>
          <Button variant="outline" size="sm">
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
  );
}
