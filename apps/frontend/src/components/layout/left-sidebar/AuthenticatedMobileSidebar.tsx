import React from "react";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import MobileProfileSnapshot from "./MobileProfileSnapshot";

export default function AuthenticatedMobileSidebar() {
  return (
    <div className="flex flex-col ">
      <MobileProfileSnapshot />
      <div className="py-2 border-y border-border">
        <SidebarMenu type="mobile" />
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
