import { create } from "zustand";

type NewProductTagState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useNewProductTagStore = create<NewProductTagState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Create a typed hook
export const useNewProductTag = () =>
  useNewProductTagStore((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));
