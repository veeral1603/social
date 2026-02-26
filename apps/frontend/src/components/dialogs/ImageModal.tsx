"use client";
import { X } from "lucide-react";
import React from "react";
interface Props {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: Props) {
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-100 bg-black/70 backdrop-blur-[4px]  flex items-center justify-center p-4"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Post image"
          className="
            max-h-[90vh]
            max-w-[95vw]
            w-full
            h-full
            object-contain
            rounded-xl
            block   
          "
        />
      </div>

      <button className="cursor-pointer absolute top-3 right-2 md:right-4 md:top-4">
        <X size={24} />
      </button>
    </div>
  );
}
