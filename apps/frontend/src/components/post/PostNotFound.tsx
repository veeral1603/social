import React from "react";
import { CircleAlert } from "lucide-react";

export default function PostNotFound() {
  return (
    <div className="p-4 text-center  flex flex-col items-center gap-2">
      <CircleAlert size={64} />
      <h2 className="text-2xl font-bold ">Post Not Found</h2>
      <p className="text-muted-foreground ">
        The Post you are looking for does not exist.
      </p>
    </div>
  );
}
