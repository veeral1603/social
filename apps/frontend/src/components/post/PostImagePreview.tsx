"use client";
import React from "react";

interface Props {
  file: File | string;
  className?: string;
}

export default function PostImagePreview({ file, className }: Props) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof file === "string") return;
    const url = URL.createObjectURL(file as File);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!previewUrl && file instanceof File) return null;
  return (
    <div className={`overflow-hidden rounded-2xl ${className || ""}`}>
      <img
        src={previewUrl ?? file}
        alt="preview"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
