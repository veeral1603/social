import { create } from "zustand";
interface PostReplyDialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const usePostReplyDialog = create<PostReplyDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

export default usePostReplyDialog;
