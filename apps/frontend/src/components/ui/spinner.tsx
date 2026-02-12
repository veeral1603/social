import { Loader2Icon } from "lucide-react";

import { cn } from "@/src/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      strokeWidth={2.5}
      {...props}
    />
  );
}

export { Spinner };
