import React from "react";

export default function useHiddenFileInput() {
  const ref = React.useRef<HTMLInputElement | null>(null);

  const open = () => ref.current?.click();

  return { ref, open };
}
