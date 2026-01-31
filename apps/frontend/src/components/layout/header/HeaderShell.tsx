import React from "react";

export default function HeaderShell({
  left,
  center,
  right,
}: {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <header className=" h-14 border-b bg-background">
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-full px-3 md:px-4">
        <div>{left}</div>
        <div className="flex justify-center">{center}</div>
        <div>{right}</div>
      </div>
    </header>
  );
}
