'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== 'ADMIN') {
            router.push('/error/403');
        }
    }, [user]);

    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="flex min-h-screen bg-[#111]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminTopBar />
                <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    </div>
    );
}
