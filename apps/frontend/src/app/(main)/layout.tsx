import AuthModal from "@/src/components/auth/AuthModal";
import FooterAuthCTA from "@/src/components/layout/FooterAuthCTA";
import LeftSidebar from "@/src/components/layout/left-sidebar/LeftSidebar";
import LoadingScreen from "@/src/components/layout/LoadingScreen";
import RightSidebar from "@/src/components/layout/right-sidebar/RightSidebar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <AuthModal />
      <LoadingScreen />

      <div className="w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[5rem_1fr_6rem]  lg:grid-cols-[4rem_1fr_18rem] xl:grid-cols-[16rem_1fr_20rem]">
        <LeftSidebar />

        <main className="min-h-screen border-x border-border w-full">
          {children}{" "}
        </main>

        <RightSidebar />

        <FooterAuthCTA />
      </div>
    </div>
  );
}
