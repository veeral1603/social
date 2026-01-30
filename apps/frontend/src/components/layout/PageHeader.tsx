import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Menu, Settings } from "lucide-react";
import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="bg-background border-b border-border">
      <div className="h-16  flex items-center justify-between md:justify-center px-2">
        <Button variant="ghost" className="md:hidden ">
          <Menu className="size-5!" />
        </Button>

        <Link href="/">
          <div className="relative flex items-center justify-center w-15  h-10">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        <Link href="/settings" className="md:hidden">
          <Button variant="ghost" className="md:hidden ">
            <Settings className="size-5!" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
