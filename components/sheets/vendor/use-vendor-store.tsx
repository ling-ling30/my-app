import { create } from "zustand";

type NewVendorState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useNewVendorStore = create<NewVendorState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Create a typed hook
export const useNewVendor = () =>
  useNewVendorStore((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));
