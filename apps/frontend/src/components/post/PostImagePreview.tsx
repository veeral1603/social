"use client";
import React from "react";

interface Props {
  file: File | string;
  className?: string;
  onSelectImage?: (url: string) => void;
}

export default function PostImagePreview({
  file,
  className,
  onSelectImage,
}: Props) {
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
    <div
      className={`overflow-hidden rounded-2xl ${className || ""} cursor-pointer hover:scale-102 transition-transform duration-300`}
      onClick={(e) => {
        e.stopPropagation();
        onSelectImage && onSelectImage(previewUrl ?? (file as string));
      }}
    >
      <img
        src={previewUrl ?? file}
        alt="preview"
        className="w-full h-full object-cover "
      />
    </div>
  );
}
