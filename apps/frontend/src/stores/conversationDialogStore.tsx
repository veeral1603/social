import { create } from "zustand";

interface ConversationDialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useConversationDialog = create<ConversationDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

export default useConversationDialog;
