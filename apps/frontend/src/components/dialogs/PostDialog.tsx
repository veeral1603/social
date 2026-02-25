"use client";
import usePostDialog from "@/src/stores/postDialogStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useProfileContext } from "@/src/hooks/useProfileContext";
import { Controller, useForm } from "react-hook-form";
import {
  PostFormData,
  postSchema,
  postSchemaForFrontend,
} from "@repo/shared-types";
import { toast } from "sonner";
import { createPost } from "@/src/services/post.service";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import Avatar from "../profile/Avatar";
import { Images } from "lucide-react";
import PostImagePreview from "../post/PostImagePreview";

export default function PostDialog() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const { isOpen, closeDialog } = usePostDialog();
  const { profile } = useProfileContext();
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchemaForFrontend),
    defaultValues: {
      content: "",
      images: [],
    },
  });

  const { ref: registerRef, ...contentField } = form.register("content");
  const images = form.watch("images");

  const onPost = async (data: PostFormData) => {
    const formData = new FormData();

    if (data.content && data.content.trim().length > 0) {
      formData.append("content", data.content as string);
    }
    if (data.images && data.images.length > 0) {
      data.images?.forEach((file: File) => {
        formData.append(`images`, file);
      });
    }

    setIsSubmitting(true);
    try {
      const response = await createPost(formData);
      if (!response.success)
        throw new Error(response.message || "Failed to create post");
      queryClient.invalidateQueries({
        queryKey: ["user-posts", profile?.username],
      });
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      toast.success("Post created successfully!");
      form.reset();
      closeDialog();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resize = () => {
      textarea.style.height = "auto";

      const maxHeight = 16 * 24; // 8 lines * line-height (24px)
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";

      if (textarea.scrollHeight > maxHeight) {
        textarea.style.overflowY = "scroll";
      } else {
        textarea.style.overflowY = "hidden";
      }
    };
    resize();
  }, [form.watch("content")]);

  const openFileInput = () => {
    const fileInput = document.getElementById(
      "post-file-input",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        closeDialog();
      }}
    >
      <DialogContent
        className="sm:max-w-xl p-0! gap-0!"
        showCloseButton={false}
      >
        <form onSubmit={form.handleSubmit(onPost, (e) => console.log(e))}>
          <DialogDescription className="hidden">
            Create a new post.
          </DialogDescription>
          <DialogHeader className="p-1.5! flex items-center flex-row justify-between relative border-b border-border">
            <DialogClose asChild className="w-max!">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogTitle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              New Post
            </DialogTitle>
            <div className="flex items-center gap-2">
              {isSubmitting && <Spinner className="size-5" />}
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-max ml-auto"
                disabled={isSubmitting}
              >
                Post
              </Button>
            </div>
          </DialogHeader>

          <div>
            <div className="p-4 flex items-start gap-4">
              <Avatar src={profile?.avatar?.url} className="w-10! md:w-12!" />
              <div className="flex-1 flex flex-col gap-2">
                <textarea
                  className="w-full border-0 focus:ring-0! outline-0! resize-none custom-scrollbar pr-1"
                  placeholder="What's up?"
                  {...contentField}
                  ref={(el) => {
                    registerRef(el);
                    textareaRef.current = el;
                  }}
                />
                <Controller
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <input
                      type="file"
                      multiple
                      hidden
                      accept="image/*"
                      id="post-file-input"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length + (field.value?.length || 0) > 4) {
                          toast.error("You can only upload up to 4 images.");
                          return;
                        }
                        field.onChange([...(field.value || []), ...files]);
                      }}
                    />
                  )}
                />

                {/* Images */}
                {/* Images */}
                {images && images.length > 0 && (
                  <div className="w-full">
                    {/* 1 Image */}
                    {images.length === 1 && (
                      <PostImagePreview
                        file={images[0] as File}
                        className="w-full aspect-square"
                      />
                    )}

                    {/* 2 Images */}
                    {images.length === 2 && (
                      <div className="grid grid-cols-2 gap-2">
                        {images.map((file: File, index: number) => (
                          <PostImagePreview
                            key={index}
                            file={file}
                            className="aspect-square"
                          />
                        ))}
                      </div>
                    )}

                    {/* 3 Images (Twitter style) */}
                    {images.length === 3 && (
                      <div className="grid grid-cols-2 gap-2 h-80">
                        <PostImagePreview
                          file={images[0] as File}
                          className="row-span-2"
                        />

                        <PostImagePreview file={images[1] as File} />

                        <PostImagePreview file={images[2] as File} />
                      </div>
                    )}

                    {/* 4 Images */}
                    {images.length === 4 && (
                      <div className="grid grid-cols-2 gap-2">
                        {images.map((file: File, index: number) => (
                          <PostImagePreview
                            key={index}
                            file={file}
                            className="aspect-square"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-2 border-t border-border flex items-center ">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:bg-transparent! p-0!"
                onClick={openFileInput}
                type="button"
              >
                <Images className="w-4.5! h-4.5!" />
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
