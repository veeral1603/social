import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  src: string | null | undefined;
}

export default function Avatar({ className, src }: Props) {
  return (
    <div
      className={`relative w-12 md:w-14 aspect-square rounded-full overflow-hidden flex items-center justify-center ${className}`}
    >
      <Image
        src={src ?? "/images/avatar.jpg"}
        alt="User Avatar"
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
}
