import { create } from "zustand";

type AuthPage = "welcome" | "login" | "signup" | "verify-email";

interface AuthModalStore {
  isOpen: boolean;
  page: AuthPage;

  setPage: (page: AuthPage) => void;

  close: () => void;
  open: (page: AuthPage) => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  page: "welcome",
  setPage: (page: AuthPage) => set({ page }),
  close: () => set({ isOpen: false, page: "welcome" }),
  open: (page: AuthPage) => set({ isOpen: true, page }),
}));

export default useAuthModal;
