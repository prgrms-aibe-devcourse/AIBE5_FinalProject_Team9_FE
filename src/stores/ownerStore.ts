import { create } from 'zustand';

interface OwnerState {
    pendingCount: number;
    setPendingCount: (count: number) => void;
}

export const useOwnerStore = create<OwnerState>()((set) => ({
    pendingCount: 0,
    setPendingCount: (count) => set({ pendingCount: count }),
}));
