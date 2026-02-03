"use client";
import React from "react";
import { AuthState } from "./authContext.types";
import { Profile } from "@repo/shared-types";

type AuthContextValue = {
  auth: AuthState;
  refreshAuth: (delay?: number) => Promise<void>;
  clearAuth: () => void;
  setProfileInAuth: (profile: Profile) => void;
};

export default React.createContext<AuthContextValue | null>(null);
