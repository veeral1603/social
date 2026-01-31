import HeaderShell from "@/src/components/layout/header/HeaderShell";
import MobileMenuTrigger from "@/src/components/layout/left-sidebar/MobileMenuTrigger";
import LogoImage from "@/src/components/LogoImage";
import { Button } from "@/src/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderShell
        left={
          <>
            <MobileMenuTrigger />
          </>
        }
        center={
          <Link href="/">
            <LogoImage />
          </Link>
        }
        right={
          <Link href="/settings" className="md:hidden">
            <Button variant="ghost" className="md:hidden ">
              <Settings className="size-5!" />
            </Button>
          </Link>
        }
      />
      {children}
    </>
  );
}
