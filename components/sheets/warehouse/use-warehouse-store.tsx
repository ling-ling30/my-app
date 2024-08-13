import { create } from "zustand";

type NewWarehouseState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useNewWarehouseStore = create<NewWarehouseState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Create a typed hook
export const useNewWarehouse = () =>
  useNewWarehouseStore((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));
