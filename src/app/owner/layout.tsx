'use client';

import { useEffect } from 'react';
import OwnerSidebar from '@/components/owner/OwnerSidebar';
import OwnerTopBar from '@/components/owner/OwnerTopBar';
import { useOwnerStore } from '@/stores/ownerStore';
import { getOwnerReviewReports } from '@/services/ownerService';
import { useAuthStore } from '@/stores/authStore';
import { getToken } from '@/lib/token';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
    const { setPendingCount } = useOwnerStore();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

    useEffect(() => {
        if (!hasHydrated || !isLoggedIn || !getToken()) return;

        const fetch = async () => {
            try {
                const data = await getOwnerReviewReports(0, 100);
                const pending = data.content.filter((r) => r.status === 'PENDING_OWNER_REVIEW').length;
                setPendingCount(pending);
            } catch {
                setPendingCount(0);
            }
        };
        fetch();
    }, [hasHydrated, isLoggedIn, setPendingCount]);

    return (
    <div className="flex min-h-screen bg-[#111]">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <OwnerTopBar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
