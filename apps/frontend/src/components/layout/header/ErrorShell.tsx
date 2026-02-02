import React from "react";
import HeaderShell from "./HeaderShell";
import BackButton from "../../ui/BackButton";
import PageTitle from "../../PageTitle";

export default function ErrorShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderShell
        left={
          <div className="flex items-center gap-2">
            <BackButton /> <PageTitle>Error</PageTitle>
          </div>
        }
      />
      {children}
    </div>
  );
}
