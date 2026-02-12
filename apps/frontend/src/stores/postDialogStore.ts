import { create } from "zustand";
interface PostDialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const usePostDialog = create<PostDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

export default usePostDialog;
