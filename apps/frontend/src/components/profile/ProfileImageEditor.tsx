"use client";
import useFilePreview from "@/src/hooks/useProfilePreview";
import Image from "next/image";
import React from "react";
import ImageOptionsDropdown from "./ImageOptionsDropdown";
import { Camera } from "lucide-react";

interface Props {
  type: "avatar" | "banner";
  existingImageUrl?: string | null;
  fallbackImage?: string;
  file: File | null | undefined;
  onFileChange: (file: File | null) => void;
  onRemoveImage: () => void;
  isDeleted?: boolean;
}

export default function ProfileImageEditor({
  type,
  existingImageUrl,
  fallbackImage,
  file,
  onFileChange,
  onRemoveImage,
  isDeleted = false,
}: Props) {
  const preview = useFilePreview(file);
  const imgSrc =
    preview ??
    (!isDeleted ? existingImageUrl : undefined) ??
    (type === "avatar" ? fallbackImage : undefined);
  const openPicker = () => {
    document.getElementById(`upload-${type}`)?.click();
  };
  return (
    <>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={type === "banner" ? "Profile banner" : "User Avatar"}
          fill
          priority
          className={`object-cover ${type === "avatar" ? "rounded-full" : ""}`}
        />
      )}

      <ImageOptionsDropdown
        type={type}
        existingImage={Boolean(existingImageUrl)}
        onInputFieldOpen={openPicker}
        onRemove={onRemoveImage}
      >
        <button
          className={`aspect-square rounded-full flex items-center justify-center absolute ${type === "banner" ? "bottom-2 right-2 size-8 " : "bottom-0 right-0 size-7"} bg-black/80 hover:bg-black transition-colors cursor-pointer`}
          type="button"
        >
          <Camera size={16} strokeWidth={2.5} />
        </button>
      </ImageOptionsDropdown>

      <input
        hidden
        type="file"
        id={`upload-${type}`}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onFileChange(file);
        }}
      />
    </>
  );
}
