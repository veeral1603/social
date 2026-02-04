"use client";

import { useContext } from "react";
import ProfileContext from "../context/profile/ProfileContext";

export function useProfileContext() {
  const ctx = useContext(ProfileContext);

  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }

  return ctx;
}
