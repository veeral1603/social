"use client";
import { useMobileSidebarStore } from "@/src/stores/mobileSidebarStore";
import { NavLink } from "@/src/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarMenuItem({
  link,
  type = "desktop",
}: {
  link: NavLink;
  type?: "mobile" | "desktop";
}) {
  const path = usePathname();
  const { closeMenu } = useMobileSidebarStore();
  const Icon = link.icon;
  const isActive = path === link.href;
  if (type === "mobile") {
    return (
      <Link
        href={link.href}
        className="block"
        key={link.href}
        onClick={closeMenu}
      >
        <div className="flex items-center  xl:justify-start gap-2 px-6 py-3   hover:bg-muted duration-300 ">
          <Icon size={24} strokeWidth={isActive ? 3 : 2} />
          <p className={` text-lg ${isActive ? "font-bold" : "font-normal"}`}>
            {link.label}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={link.href}
      className="block"
      key={link.href}
      onClick={closeMenu}
    >
      <div className="flex items-center justify-center xl:justify-start gap-2 p-5 xl:py-3 xl:px-4  rounded-[8px] hover:bg-muted duration-300 ">
        <Icon size={24} strokeWidth={isActive ? 3 : 2} />
        <p
          className={`hidden xl:block text-lg ${isActive ? "font-bold" : "font-normal"}`}
        >
          {link.label}
        </p>
      </div>
    </Link>
  );
}
