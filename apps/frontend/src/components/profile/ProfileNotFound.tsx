import { CircleAlert } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import ErrorShell from "../layout/header/ErrorShell";

export default function ProfileNotFound() {
  return (
    <ErrorShell>
      <div className="p-4 text-center  flex flex-col items-center gap-2">
        <CircleAlert size={64} />
        <h2 className="text-2xl font-bold ">Profile Not Found</h2>
        <p className="text-muted-foreground ">
          The profile you are looking for does not exist.
        </p>
        <Link href="/" className="mt-2" replace={true}>
          <Button variant="secondary" size="sm">
            Go to Home
          </Button>
        </Link>
      </div>
    </ErrorShell>
  );
}
