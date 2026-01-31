"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import Image from "next/image";
import React from "react";

export default function MobileProfileSnapshot() {
  const { auth } = useAuthContext();
  const profile = auth.profile;
  if (!profile) return null;

  return (
    <div className="px-6 py-4 flex flex-col gap-2">
      <div className="relative w-12 aspect-square rounded-full overflow-hidden flex items-center justify-center ">
        <Image
          src={profile?.avatar?.url ?? "/images/avatar.jpg"}
          alt="User Avatar"
          fill
          className="object-cover rounded-full"
        />
      </div>

      <div>
        {profile.name && (
          <h4 className="text-lg font-bold leading-4">{profile?.name}</h4>
        )}
        <p className="text-muted-foreground ">@{profile?.username}</p>
      </div>

      <div className="flex items-center gap-3 text-muted-foreground ">
        <p>
          <span className="text-foreground font-semibold">0</span> followers
        </p>
        <p>
          <span className="text-foreground font-semibold">0</span>{" "}
          following{" "}
        </p>
      </div>
    </div>
  );
}

//  <Link
//       href={`/profile/${profile.username}`}
//       className="block hover:opacity-80 transition duration-200"
//       onClick={closeMenu}
//     ></Link>
