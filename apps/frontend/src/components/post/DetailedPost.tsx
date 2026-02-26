"use client";

import type { Post } from "@repo/shared-types";
import React from "react";
import PostActions from "./PostActions";
import Avatar from "../profile/Avatar";
import Link from "next/link";
import { formatCount, formatDateTime } from "@/src/lib/utils";
import PostImagePreview from "./PostImagePreview";
import ImageModal from "../dialogs/ImageModal";

interface Props {
  post: Post;
}

export default function DetailedPost({ post }: Props) {
  const images = post.images;
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  return (
    <div className="p-4 pb-2 transition duration-300 border-b border-border flex flex-col gap-2">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-3 relative">
          {post.parentId && (
            <div className="h-10 w-0.5 bg-border absolute left-6 -top-4" />
          )}

          <Link href={`/profile/${post.author?.username}`} className="shrink-0">
            <Avatar src={post.author?.avatar?.url} className="w-12!" />
          </Link>

          <div className="">
            {/* Name  */}
            <Link
              href={`/profile/${post.author?.username}`}
              className="cursor-pointer hover:underline underline-offset-2 font-semibold leading-tight"
            >
              <h3>{post.author?.name || post.author?.username}</h3>
            </Link>

            {/* Username  */}
            <Link
              href={`/profile/${post.author?.username}`}
              className="cursor-pointer text-muted-foreground leading-tight"
            >
              <span>@{post.author?.username}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="-mt-1">
        <p className="mt-1 whitespace-pre-wrap leading-5">{post.content}</p>
      </div>

      {/* Post Images  */}
      {images && images.length > 0 && (
        <div className="w-full mt-2 ">
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
                onSelectImage={() => setSelectedImage(images[0]?.url as string)}
              />

              <PostImagePreview
                file={images[1]?.url as string}
                onSelectImage={() => setSelectedImage(images[1]?.url as string)}
              />

              <PostImagePreview
                file={images[2]?.url as string}
                onSelectImage={() => setSelectedImage(images[2]?.url as string)}
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

      <div className=" pb-2 pt-2 text-sm  text-muted-foreground flex items-center ">
        <p>{formatDateTime(post.createdAt)}</p>
      </div>

      <div className="border-y border-border py-2 flex items-center gap-4 text-muted-foreground">
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">
            {formatCount(post.counts?.reposts as number)}
          </span>
          <p>{(post.counts?.reposts as number) > 1 ? "reposts" : "repost"}</p>
        </div>
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">3</span>
          <p>quotes</p>
        </div>
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">
            {formatCount(post.counts?.likes as number)}
          </span>
          <p>{(post.counts?.likes as number) > 1 ? "likes" : "like"}</p>
        </div>
        <div className="gap-1 flex items-center ">
          <span className="text-foreground font-semibold">
            {formatCount(post.counts?.saves as number)}
          </span>
          <p>{(post.counts?.saves as number) > 1 ? "saves" : "save"}</p>
        </div>
      </div>

      <PostActions post={post} isDetailed={true} />

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
