'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname} from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoggedIn  } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (isLoginPage) return;
        if (!user || user.role !== 'ADMIN') {
            router.push('/admin/login')
        }
    }, [mounted, user, isLoginPage, isLoggedIn]);

    if (isLoginPage) return <>{children}</>;
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
