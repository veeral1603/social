import React from "react";
import ProfilePill from "./ProfilePill";
import SidebarMenu from "./SidebarMenu";

export default function AuthenticatedSidebar() {
  return (
    <div className="flex flex-col ">
      <ProfilePill />
      <SidebarMenu />
    </div>
  );
}
