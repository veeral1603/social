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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";

const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Chat", href: "/messages", icon: MessageCircleMore },
  { label: "Saved", href: "/saved", icon: Bookmark },
  { label: "Profile", href: "/profile", icon: CircleUserRound },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarMenu() {
  const path = usePathname();
  return (
    <div className="flex flex-col ">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = path === link.href;
        return (
          <Link href={link.href} className="block" key={link.href}>
            <div className="flex items-center justify-center xl:justify-start gap-2 p-5 xl:py-3 xl:px-4  rounded-[12px] hover:bg-muted duration-300 ">
              <Icon size={24} strokeWidth={isActive ? 3 : 2} />
              <p
                className={`hidden xl:block text-lg ${isActive ? "font-bold" : "font-normal"}`}
              >
                {link.label}
              </p>
            </div>
          </Link>
        );
      })}

      <Button className="mt-4 hidden xl:flex w-max ml-4" size="lg">
        <PencilLine size={20} /> <p>New Post</p>
      </Button>
    </div>
  );
}
