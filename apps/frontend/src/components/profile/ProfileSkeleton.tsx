import React from "react";

export default function ProfileSkeleton() {
  return (
    <div>
      {/* Banner Skeleton */}
      <div className="relative h-42 sm:h-48 w-full overflow-hidden bg-muted ">
        {/* Back button placeholder */}
        <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-muted-foreground/30" />
      </div>

      <div className="relative p-3 md:p-4 border-b border-border">
        {/* Avatar Skeleton */}
        <div className="absolute -top-10">
          <div className="w-20 md:w-24 aspect-square rounded-full bg-muted border-2 border-background" />
        </div>

        {/* Actions Skeleton */}
        <div className="flex justify-end gap-1">
          <div className="h-8 w-24 rounded-md bg-muted-foreground/30 animate-pulse" />
          <div className="h-8 w-8 rounded-md bg-muted-foreground/30 animate-pulse" />
        </div>

        {/* Profile Info */}
        <div className="mt-6 md:mt-8 flex flex-col gap-2">
          {/* Name */}
          <div className="h-8  w-48 rounded-md bg-muted-foreground/30 animate-pulse" />

          {/* Username */}
          <div className="h-4 w-32 rounded-md bg-muted-foreground/20 animate-pulse" />

          {/* Stats */}
          <div className="flex gap-4 mt-2">
            <div className="h-4 w-20 rounded-md bg-muted-foreground/20 animate-pulse" />
            <div className="h-4 w-24 rounded-md bg-muted-foreground/20 animate-pulse" />
            <div className="h-4 w-16 rounded-md bg-muted-foreground/20 animate-pulse" />
          </div>

          {/* Bio lines */}
          <div className="mt-2 space-y-2">
            <div className="h-4 w-full rounded-md bg-muted-foreground/20 animate-pulse" />
            <div className="h-4 w-5/6 rounded-md bg-muted-foreground/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
