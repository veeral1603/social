"use client";
import React from "react";
import ErrorShell from "../layout/header/ErrorShell";
import { CircleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileError({ username }: { username: string }) {
  const queryClient = useQueryClient();
  return (
    <ErrorShell>
      <div className="p-4 text-center  flex flex-col items-center gap-2">
        <CircleAlert size={64} />
        <h2 className="text-2xl font-bold ">Something Went Wrong</h2>
        <p className="text-muted-foreground ">
          We encountered an error while loading this profile. Please try again.
        </p>

        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            queryClient.refetchQueries({ queryKey: ["user-profile", username] })
          }
        >
          Try Again
        </Button>
      </div>
    </ErrorShell>
  );
}
