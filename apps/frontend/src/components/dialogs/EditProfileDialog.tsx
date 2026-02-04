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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { UpdateProfileFormData } from "@repo/shared-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../../../../../packages/shared-types/src/profile/profile.schema";
import { Textarea } from "../ui/textarea";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "@/src/services/profile.service";
import { useProfileContext } from "@/src/hooks/useProfileContext";

export default function EditProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [bannerImagePreview, setBannerImagePreview] = React.useState<
    string | null
  >(null);
  const [avatarImagePreview, setAvatarImagePreview] = React.useState<
    string | null
  >(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { profile, refreshProfile } = useProfileContext();
  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema) as any,
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  const avatar = form.watch("avatar");
  const banner = form.watch("banner");

  React.useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name ?? "",
        bio: profile.bio ?? "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name.trim() ?? "");
    formData.append("bio", data.bio.trim() ?? "");
    if (banner) formData.append("banner", banner);
    if (avatar) formData.append("avatar", avatar);

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

  const openBannerFilePicker = () => {
    const bannerInput = document.getElementById("banner-upload");
    bannerInput?.click();
  };

  const openAvatarFilePicker = () => {
    const avatarInput = document.getElementById("avatar-upload");
    avatarInput?.click();
  };

  const changeModalState = (bool: boolean) => {
    if (bool) {
      onOpenChange(true);
      return;
    } else {
      onOpenChange(false);
      setBannerImagePreview(null);
      setAvatarImagePreview(null);
      form.reset();
      return;
    }
  };

  React.useEffect(() => {
    if (!(banner instanceof File)) return;

    const url = URL.createObjectURL(banner);
    setBannerImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [banner]);

  React.useEffect(() => {
    if (!(avatar instanceof File)) return;

    const url = URL.createObjectURL(avatar);
    setAvatarImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatar]);

  return (
    <Dialog open={open} onOpenChange={changeModalState}>
      <DialogContent
        className="sm:max-w-xl p-0! gap-0!"
        showCloseButton={false}
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              className="w-max ml-auto"
              disabled={!profile || isSubmitting}
            >
              Save
            </Button>
          </DialogHeader>

          <div className="overflow-hidden h-42 sm:h-48 w-full bg-muted relative ">
            {(bannerImagePreview || profile?.banner) && (
              <Image
                src={
                  bannerImagePreview
                    ? bannerImagePreview
                    : (profile?.banner?.url as string)
                }
                alt="Profile banner"
                fill
                priority
                className="object-cover"
              />
            )}
            <button
              className="size-8 aspect-square rounded-full flex items-center justify-center absolute bottom-2 right-2 bg-black/80 hover:bg-black transition-colors cursor-pointer"
              onClick={openBannerFilePicker}
              type="button"
            >
              <Camera size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="p-3 md:p-4 relative ">
            <div className="absolute -top-16 md:-top-20">
              <div className="relative w-20 md:w-24 aspect-square rounded-full  flex items-center justify-center border-2 border-background bg-stone-100">
                <Image
                  src={
                    avatarImagePreview ??
                    profile?.avatar?.url ??
                    "/images/avatar.jpg"
                  }
                  alt="User Avatar"
                  fill
                  className="object-cover rounded-full"
                />
                <button
                  className="size-7 aspect-square rounded-full flex items-center justify-center absolute -bottom-1 -right-1 bg-black/80 hover:bg-black transition-colors cursor-pointer"
                  onClick={openAvatarFilePicker}
                  type="button"
                >
                  <Camera size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Display Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Your display name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="bio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="bio">Bio</FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        placeholder="Something about you..."
                        aria-invalid={fieldState.invalid}
                        maxLength={160}
                        className="h-24"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="banner"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="banner-upload"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] ?? null)
                      }
                    />
                  )}
                />
                <Controller
                  name="avatar"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="avatar-upload"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] ?? null)
                      }
                    />
                  )}
                />
              </FieldGroup>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
