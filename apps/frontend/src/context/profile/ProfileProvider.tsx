"use client";
import React from "react";
import ProfileContext from "./ProfileContext";
import { getUserProfile } from "@/src/services/profile.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = React.useState(null);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    staleTime: 100000000,
  });

  const refreshProfile = async () => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
  };

  React.useEffect(() => {
    if (isSuccess && data) {
      setProfile(data);
    }
  }, [isSuccess, data]);
  return (
    <ProfileContext.Provider value={{ profile, setProfile, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
