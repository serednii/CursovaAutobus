import { create } from "zustand";

export interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const useStore = create<BearState>((set) => ({
  bears: 12,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set(() => ({ bears: newBears })),
}));

export default useStore;
