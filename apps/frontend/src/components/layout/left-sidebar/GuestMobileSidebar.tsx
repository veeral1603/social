import React from "react";
import GuestSidebarCTA from "./GuestSidebarCTA";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";

export default function GuestMobileSidebar() {
  return (
    <div className="flex flex-col">
      <div className="p-6">
        <GuestSidebarCTA />
      </div>
      <div className="py-2 border-y border-border">
        <SidebarMenu type="mobile" links={["Home", "Explore"]} />
      </div>
      <div className="py-2 px-6 flex flex-col gap-2 ">
        <Link
          href="/terms-of-service"
          className="text-primary hover:text-primary/90 hover:underline transition duration-200 w-max"
        >
          Terms of Service
        </Link>
        <Link
          href="/privacy-policy"
          className="text-primary hover:text-primary/90 hover:underline transition duration-200 w-max"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
