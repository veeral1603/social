import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, UpdateProfileFormData } from "@repo/shared-types";
import { updateProfileSchema } from "../../../../packages/shared-types/src/profile/profile.schema";

export function useEditProfileForm(profile?: Profile) {
  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema) as any,
    defaultValues: {
      name: profile?.name ?? "",
      bio: profile?.bio ?? "",
      banner: null,
      avatar: null,
      deleteBanner: false,
      deleteAvatar: false,
    },
  });

  return form;
}
