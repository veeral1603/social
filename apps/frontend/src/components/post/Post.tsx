"use client";
import { formatTimeAgo } from "@/src/lib/utils";
import type { Post } from "@repo/shared-types";
import React from "react";
import PostActions from "./PostActions";
import Avatar from "../profile/Avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import ProfileHoverCard from "../profile/ProfileHoverCard";
import PostImagePreview from "./PostImagePreview";
import ImageModal from "../dialogs/ImageModal";

interface Props {
  post: Post;
}

export default function Post({ post }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const images = post.images;
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleNavigate = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[data-no-nav]")
    ) {
      return;
    }
    queryClient.setQueryData(["post", post.id], post);
    router.push(`/profile/${post.author?.username}/post/${post.id}`);
  };

  return (
    <div
      className="px-4 py-2 flex items-start gap-3 cursor-pointer hover:bg-muted/60 transition duration-300 border-b border-border"
      onClick={handleNavigate}
    >
      <ProfileHoverCard
        href={`/profile/${post.author?.username}`}
        username={post.author?.username || ""}
      >
        <Avatar src={post.author?.avatar?.url} className="w-10! md:w-12!" />
      </ProfileHoverCard>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {/* Name  */}
          <Link
            href={`/profile/${post.author?.username}`}
            className="cursor-pointer hover:underline underline-offset-2"
          >
            <h3 className="font-semibold leading-tight">
              {post.author?.name || post.author?.username}
            </h3>
          </Link>

          {/* Username  */}
          <Link
            href={`/profile/${post.author?.username}`}
            className="cursor-pointer"
          >
            <span className=" text-muted-foreground">
              @{post.author?.username}
            </span>
          </Link>
          <span className="text-muted-foreground">·</span>

          {/* Time  */}
          <span className="text-sm text-muted-foreground">
            {formatTimeAgo(post.createdAt)}
          </span>
        </div>
        <div className="-mt-1">
          <p className=" whitespace-pre-wrap leading-5">{post.content}</p>
        </div>

        {/* Post Images  */}

        {images && images.length > 0 && (
          <div className="w-full">
            {/* 1 Image */}
            {images.length === 1 && (
              <PostImagePreview
                file={images[0]?.url as string}
                className="w-full aspect-square"
                onSelectImage={() => setSelectedImage(images[0]?.url as string)}
              />
            )}

            {/* 2 Images */}
            {images.length === 2 && (
              <div className="grid grid-cols-2 gap-2">
                {images.map((file, index: number) => (
                  <PostImagePreview
                    key={index}
                    file={file?.url as string}
                    className="aspect-square"
                    onSelectImage={() => setSelectedImage(file?.url as string)}
                  />
                ))}
              </div>
            )}

            {/* 3 Images) */}
            {images.length === 3 && (
              <div className="grid grid-cols-2 gap-2 h-80">
                <PostImagePreview
                  file={images[0]?.url as string}
                  className="row-span-2"
                  onSelectImage={() =>
                    setSelectedImage(images[0]?.url as string)
                  }
                />

                <PostImagePreview
                  file={images[1]?.url as string}
                  onSelectImage={() =>
                    setSelectedImage(images[1]?.url as string)
                  }
                />

                <PostImagePreview
                  file={images[2]?.url as string}
                  onSelectImage={() =>
                    setSelectedImage(images[2]?.url as string)
                  }
                />
              </div>
            )}

            {/* 4 Images */}
            {images.length === 4 && (
              <div className="grid grid-cols-2 gap-2">
                {images.map((file, index: number) => (
                  <PostImagePreview
                    key={index}
                    file={file?.url as string}
                    className="aspect-square"
                    onSelectImage={() => setSelectedImage(file?.url as string)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div data-no-nav>
          <PostActions post={post} />
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
