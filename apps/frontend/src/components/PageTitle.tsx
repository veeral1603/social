import React from "react";

export default function PageTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-semibold text-lg">{children}</h4>;
}
