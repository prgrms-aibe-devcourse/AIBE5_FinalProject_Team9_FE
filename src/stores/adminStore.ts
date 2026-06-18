// @/stores/adminStore.ts
import { create } from 'zustand';

interface AdminState {
    pendingCount: number;
    setPendingCount: (count: number) => void;
}

export const useAdminStore = create<AdminState>()((set) => ({
    pendingCount: 0,
    setPendingCount: (count) => set({ pendingCount: count }),
}));
