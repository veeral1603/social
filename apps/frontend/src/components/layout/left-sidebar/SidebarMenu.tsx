import {
  Bell,
  Bookmark,
  CircleUserRound,
  Home,
  MessageCircleMore,
  PencilLine,
  Search,
  Settings,
} from "lucide-react";
import React from "react";
import type { NavLink } from "@/src/types";
import { Button } from "../../ui/button";
import SidebarMenuItem from "./SidebarMenuItem";

const allNavLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Chat", href: "/messages", icon: MessageCircleMore },
  { label: "Saved", href: "/saved", icon: Bookmark },
  { label: "Profile", href: "/profile", icon: CircleUserRound },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarMenu({
  links,
  type = "desktop",
}: {
  links?: string[];
  type?: "mobile" | "desktop";
}) {
  let navLinks: NavLink[] = [];
  if (links) {
    links.forEach((link) => {
      navLinks.push(allNavLinks.find((navLink) => navLink.label === link)!);
    });
  } else {
    navLinks = allNavLinks;
  }
  return (
    <div className="flex flex-col ">
      {navLinks.map((link, index) => (
        <SidebarMenuItem link={link} key={index} type={type} />
      ))}

      <Button className="mt-4 hidden xl:flex w-max ml-4" size="lg">
        <PencilLine size={20} /> <p>New Post</p>
      </Button>
    </div>
  );
}
