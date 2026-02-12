"use client";
import { NavLink } from "@/src/types";
import { Bell, Home, MessageCircleMore, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useProfileContext } from "@/src/hooks/useProfileContext";

const quickAccessItems: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Chat", href: "/messages", icon: MessageCircleMore },
  { label: "Notifications", href: "/notifications", icon: Bell },
];

export default function MobileQuickAccess() {
  const path = usePathname();
  const { profile } = useProfileContext();
  return (
    <div className="fixed md:hidden bottom-0 inset-x-0 w-full h-14 border-t border-border bg-background px-8 flex items-center justify-between">
      {quickAccessItems.map((item) => {
        const Icon = item.icon;
        const isActive = path === item.href;
        return (
          <Link href={item.href} key={item.href}>
            <Icon size={24} strokeWidth={isActive ? 3 : 2} />
          </Link>
        );
      })}
      <Link href={`/profile/${profile?.username}`}>
        <div className="relative w-7 aspect-square rounded-full overflow-hidden flex items-center justify-center ">
          <Image
            src={profile?.avatar?.url ?? "/images/avatar.jpg"}
            alt="User Avatar"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </Link>
    </div>
  );
}
