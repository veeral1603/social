"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useProfileContext } from "@/src/hooks/useProfileContext";

export default function ProfilePill() {
  const { profile } = useProfileContext();
  const [hovered, setHovered] = useState(false);

  if (!profile) return null;

  const { name, avatar, username } = profile;

  return (
    <Link href={`/profile/${username}`} className="w-full">
      <div className="h-18">
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex items-center justify-center xl:justify-between gap-2 xl:p-2 rounded-full cursor-pointer xl:hover:bg-muted transition-colors duration-300"
        >
          {/* Avatar */}
          <motion.div
            animate={{
              width: hovered ? 36 : 48,
              height: hovered ? 36 : 48,
            }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="relative aspect-square rounded-full overflow-hidden flex items-center justify-center"
          >
            <Image
              src={avatar?.url ?? "/images/avatar.jpg"}
              alt={name as string}
              fill
              className="object-cover rounded-full"
            />
          </motion.div>

          {/* Text */}
          <AnimatePresence>
            {hovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="hidden xl:block flex-1"
                >
                  <h4 className="text-xs font-bold leading-3">{name}</h4>
                  <p className="text-xs text-muted-foreground">@{username}</p>
                </motion.div>

                <Ellipsis
                  className=" text-muted-foreground hidden xl:block"
                  size={20}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Link>
  );
}
