"use client";
import React from "react";
import AuthContext from "./AuthContext";
import { AuthState } from "./authContext.types";
import { getCurrentUser } from "@/src/services/auth.service";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = React.useState<AuthState>({
    status: "loading",
    user: null,
  });

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      setAuth({ status: "authenticated", user: response.data });
    } catch {
      setAuth({ status: "unauthenticated", user: null });
    }
  };
  React.useEffect(() => {
    fetchCurrentUser();
  }, []);

  const clearAuth = () => {
    setAuth({ status: "unauthenticated", user: null });
  };

  return (
    <AuthContext.Provider
      value={{ auth, refreshAuth: fetchCurrentUser, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
