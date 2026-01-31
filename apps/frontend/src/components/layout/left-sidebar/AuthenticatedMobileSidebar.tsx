import React from "react";
import ProfilePill from "./ProfilePill";
import SidebarMenu from "./SidebarMenu";

export default function AuthenticatedMobileSidebar() {
  return (
    <div className="flex flex-col ">
      <ProfilePill />
      <SidebarMenu type="mobile" />
    </div>
  );
}
