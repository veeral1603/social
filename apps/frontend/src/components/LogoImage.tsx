import Image from "next/image";
import React from "react";

export default function LogoImage({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center w-12  h-8 ${className}`}
    >
      <Image
        src="/images/logo.png"
        alt="Logo"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
}
