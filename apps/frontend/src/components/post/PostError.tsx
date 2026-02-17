import React from "react";
import { CircleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  postId: string;
}

export default function PostError({ postId }: Props) {
  const queryClient = useQueryClient();
  return (
    <div className="p-4 text-center  flex flex-col items-center gap-2">
      <CircleAlert size={64} />
      <h2 className="text-2xl font-bold ">Something Went Wrong</h2>
      <p className="text-muted-foreground ">
        We encountered an error while loading this post. Please try again.
      </p>

      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          queryClient.refetchQueries({ queryKey: ["post", postId] })
        }
      >
        Try Again
      </Button>
    </div>
  );
}
