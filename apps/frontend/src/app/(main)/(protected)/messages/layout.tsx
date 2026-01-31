import HeaderShell from "@/src/components/layout/header/HeaderShell";
import PageTitle from "@/src/components/PageTitle";
import BackButton from "@/src/components/ui/BackButton";
import React from "react";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderShell
        left={
          <div className="flex items-center gap-2">
            <BackButton /> <PageTitle>Chats</PageTitle>
          </div>
        }
      />
      {children}
    </>
  );
}
