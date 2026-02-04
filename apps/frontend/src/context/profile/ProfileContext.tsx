"use client";

import { Profile } from "@repo/shared-types";
import React from "react";

type ProfileContextValue = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<null>>;
  refreshProfile: () => Promise<void>;
};

export default React.createContext<ProfileContextValue | null>(null);
