import { create } from "zustand";

type AuthPage = "login" | "signup" | "welcome" | "verify";

interface AuthModalStore {
  isOpen: boolean;
  page: AuthPage;

  setPage: (page: AuthPage) => void;

  close: () => void;
  open: (page: AuthPage) => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: true,
  page: "welcome",
  setPage: (page: AuthPage) => set({ page }),
  close: () => set({ isOpen: false }),
  open: (page: AuthPage) => set({ isOpen: true, page }),
}));

export default useAuthModal;
