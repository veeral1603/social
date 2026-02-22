import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import { Post, PostFormData, postSchema } from "@repo/shared-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Avatar from "../profile/Avatar";
import usePostReplyDialog from "@/src/stores/postReplyDialogStore";
import { Button } from "../ui/button";
import { useProfileContext } from "@/src/hooks/useProfileContext";
import { useQueryClient } from "@tanstack/react-query";
import { createPost, createReply } from "@/src/services/post.service";
import { toast } from "sonner";

interface Props {
  post: Post;
}

export default function PostReplyDialog({ post }: Props) {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const queryClient = useQueryClient();

  const { isOpen, closeDialog } = usePostReplyDialog();

  const { profile } = useProfileContext();

  const form = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(postSchema),
  });

  const onPost = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const response = await createReply(post.id, data);
      if (!response.success)
        throw new Error(response.message || "Failed to reply");
      queryClient.invalidateQueries({
        queryKey: ["post-replies", post.id],
      });

      toast.success("Reply sent successfully!");
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
        className="sm:max-w-xl p-0! gap-0! "
        showCloseButton={false}
      >
        <form onSubmit={form.handleSubmit(onPost, (e) => console.log(e))}>
          <DialogDescription className="hidden">
            Reply to this post.
          </DialogDescription>
          <DialogHeader className="p-1.5! flex items-center flex-row justify-between relative border-b border-border">
            <DialogClose asChild className="w-max!">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogTitle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              Reply
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
                Reply
              </Button>
            </div>
          </DialogHeader>

          <div className="p-4 flex items-start gap-4 border-b border-border">
            <Avatar src={post.author?.avatar?.url} className="w-10! md:w-12!" />
            <div className="w-full flex-1">
              <div>
                <p className="font-semibold ">
                  {post.author?.name ?? `@${post.author?.username ?? "user"}`}
                </p>
                <p className=" whitespace-pre-wrap text-sm text-muted-foreground leading-5 line-clamp-5">
                  {post.content}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 flex items-start gap-4">
            <Avatar src={profile?.avatar?.url} className="w-10! md:w-12!" />
            <div className="flex-1">
              <textarea
                rows={3}
                className="w-full border-0 focus:ring-0! outline-0! resize-none"
                placeholder="Write your reply"
                {...form.register("content")}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
