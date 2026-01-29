import React from "react";
import AuthProvider from "../context/auth/AuthProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
