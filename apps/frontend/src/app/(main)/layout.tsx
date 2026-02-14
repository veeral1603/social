import AuthModal from "@/src/components/auth/AuthModal";
import PostDialog from "@/src/components/dialogs/PostDialog";
import FooterAuthCTA from "@/src/components/layout/FooterAuthCTA";
import LeftSidebar from "@/src/components/layout/left-sidebar/LeftSidebar";
import MobileSidebar from "@/src/components/layout/left-sidebar/MobileSidebar";
import LoadingScreen from "@/src/components/layout/LoadingScreen";
import MobileQuickAccess from "@/src/components/layout/quick-access/MobileQuickAccess";
import RightSidebar from "@/src/components/layout/right-sidebar/RightSidebar";
import FloatingPostButton from "@/src/components/post/FloatingPostButton";
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
      <MobileSidebar />

      <div className="w-full md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[5rem_1fr_6rem]  lg:grid-cols-[5rem_1fr_20rem] xl:grid-cols-[15rem_1fr_20rem]">
        <LeftSidebar />

        <div className="min-h-screen md:border-x md:border-border w-full relative">
          <main className="h-full ">{children}</main>
          <MobileQuickAccess />
          <PostDialog />
          <FloatingPostButton />
        </div>

        <RightSidebar />

        <FooterAuthCTA />
      </div>
    </div>
  );
}
