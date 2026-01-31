"use client";

import { useAuthContext } from "@/src/hooks/useAuthContext";
import { motion, AnimatePresence } from "motion/react";
import AuthenticatedSidebar from "./AuthenticatedSidebar";
import GuestSidebarCTA from "./GuestSidebarCTA";
import { useMobileSidebarStore } from "@/src/stores/mobileSidebarStore";
import { useEffect } from "react";
import SidebarMenu from "./SidebarMenu";
import GuestMobileSidebar from "./GuestMobileSidebar";
import AuthenticatedMobileSidebar from "./AuthenticatedMobileSidebar";

export default function MobileSidebar() {
  const { auth } = useAuthContext();
  const { isOpen, closeMenu } = useMobileSidebarStore();

  const isAuthenticated = auth.status === "authenticated" && auth.user !== null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-49  bg-black/50 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border md:hidden flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
          >
            {isAuthenticated && <AuthenticatedMobileSidebar />}
            {!isAuthenticated && <GuestMobileSidebar />}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
