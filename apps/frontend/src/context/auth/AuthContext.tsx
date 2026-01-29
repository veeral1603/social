"use client";
import React from "react";
import { AuthState } from "./authContext.types";

type AuthContextValue = {
  auth: AuthState;
  refreshAuth: () => Promise<void>;
  clearAuth: () => void;
};

export default React.createContext<AuthContextValue | null>(null);
