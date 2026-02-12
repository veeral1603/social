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
import Image from "next/image";
import { useForm } from "react-hook-form";
import { PostFormData, postSchema } from "@repo/shared-types";
import { toast } from "sonner";
import { createPost } from "@/src/services/post.service";

export default function PostDialog() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { isOpen, closeDialog } = usePostDialog();
  const { profile } = useProfileContext();
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
  });
  const onPost = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const response = await createPost(data);
      if (!response.success)
        throw new Error(response.message || "Failed to create post");
      toast.success("Post created successfully!");
      form.reset();
      closeDialog();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent
        className="sm:max-w-xl p-0! gap-0!"
        showCloseButton={false}
      >
        <form onSubmit={form.handleSubmit(onPost, (e) => console.log(e))}>
          <DialogDescription className="hidden">
            Create a new post.
          </DialogDescription>
          <DialogHeader className="p-2! flex items-center flex-row justify-between relative border-b border-border">
            <DialogClose asChild className="w-max!">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogTitle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              New Post
            </DialogTitle>
            <div className="flex items-center gap-2">
              {/* {isSubmitting && <Spinner className="size-5" />} */}
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-max ml-auto"
              >
                Post
              </Button>
            </div>
          </DialogHeader>

          <div className="p-4 flex items-start gap-4">
            <div className="relative w-10 md:w-12 aspect-square rounded-full overflow-hidden flex items-center justify-center ">
              <Image
                src={profile?.avatar?.url ?? "/images/avatar.jpg"}
                alt="User Avatar"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <textarea
                rows={3}
                className="w-full border-0 focus:ring-0! outline-0! resize-none"
                placeholder="What's up?"
                {...form.register("content")}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
