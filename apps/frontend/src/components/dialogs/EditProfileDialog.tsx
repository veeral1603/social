"use client";
import React from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Profile, UpdateProfileFormData } from "@repo/shared-types";

import { toast } from "sonner";
import { updateProfile } from "@/src/services/profile.service";
import { useProfileContext } from "@/src/hooks/useProfileContext";
import { Spinner } from "../ui/spinner";
import { useEditProfileForm } from "@/src/hooks/useEditProfileForm";
import ProfileImageEditor from "../profile/ProfileImageEditor";
import EditProfileFormFields from "../profile/EditProfileFormFields";

export default function EditProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { profile, refreshProfile } = useProfileContext();
  const form = useEditProfileForm(profile as Profile);

  const banner = form.watch("banner");
  const avatar = form.watch("avatar");

  React.useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name ?? "",
        bio: profile.bio ?? "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    console.log(data);
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name?.trim() ?? "");
    formData.append("bio", data.bio?.trim() ?? "");
    formData.append("deleteBanner", String(data.deleteBanner));
    formData.append("deleteAvatar", String(data.deleteAvatar));
    if (data.banner) formData.append("banner", data.banner);
    if (data.avatar) formData.append("avatar", data.avatar);

    try {
      const response = await updateProfile(formData);
      if (!response.success) throw new Error(response.message);
      toast.success("Profile updated successfully!");
      refreshProfile();
      changeModalState(false);
    } catch (error) {
      toast.error((error as Error).message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeModalState = (bool: boolean) => {
    if (bool) {
      onOpenChange(true);
      return;
    } else {
      onOpenChange(false);
      form.reset();
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={changeModalState}>
      <DialogContent
        className="sm:max-w-xl p-0! gap-0!"
        showCloseButton={false}
      >
        <form onSubmit={form.handleSubmit(onSubmit, (er) => console.log(er))}>
          <DialogDescription className="hidden">
            Edit your profile information and settings.
          </DialogDescription>
          <DialogHeader className="p-2! flex items-center flex-row justify-between relative border-b border-border">
            <DialogClose asChild className="w-max!">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogTitle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              Edit Profile
            </DialogTitle>
            <div className="flex items-center gap-2">
              {isSubmitting && <Spinner className="size-5" />}
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-max ml-auto"
                disabled={!profile || isSubmitting}
              >
                Save
              </Button>
            </div>
          </DialogHeader>

          <div className="overflow-hidden h-42 sm:h-48 w-full bg-muted relative ">
            <ProfileImageEditor
              type="banner"
              file={banner}
              existingImageUrl={profile?.banner?.url ?? null}
              onFileChange={(file) => {
                form.setValue("deleteBanner", false);
                form.setValue("banner", file);
              }}
              onRemoveImage={() => {
                form.setValue("deleteBanner", true);
                form.setValue("banner", null);
              }}
              isDeleted={form.watch("deleteBanner")}
            />
          </div>

          <div className="p-3 md:p-4 relative ">
            <div className="absolute -top-16 md:-top-20">
              <div className="relative w-20 md:w-24 aspect-square rounded-full  flex items-center justify-center border-2 border-background bg-stone-100">
                <ProfileImageEditor
                  type="avatar"
                  file={avatar}
                  existingImageUrl={profile?.avatar?.url ?? null}
                  onFileChange={(file) => {
                    form.setValue("deleteAvatar", false);
                    form.setValue("avatar", file);
                  }}
                  onRemoveImage={() => {
                    form.setValue("deleteAvatar", true);
                    form.setValue("avatar", null);
                  }}
                  fallbackImage="/images/avatar.jpg"
                  isDeleted={form.watch("deleteAvatar")}
                />
              </div>
            </div>

            <div className="mt-4">
              <EditProfileFormFields form={form} />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
