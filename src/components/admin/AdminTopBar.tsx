'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useAdminStore } from '@/stores/adminStore';

const PAGE_TITLES: Record<string, string> = {
    '/admin/reviews': '후기 관리',
    '/admin/comments': '댓글 관리',
};

export default function AdminTopBar() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const { pendingCount } = useAdminStore();
    const title =
        Object.entries(PAGE_TITLES).find(
            ([key]) => pathname === key || pathname.startsWith(key + '/')
        )?.[1] ?? '관리자 콘솔';

    return (
        <header className="h-13 bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between px-6 shrink-0">
            <h1 className="text-sm font-bold text-[#f5f5f5]">{title}</h1>
            <div className="flex items-center gap-4">
                {/* Bell */}
                <button className="relative text-[#888] hover:text-[#f5f5f5] transition-colors p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {pendingCount > 0 && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#e63946] rounded-full text-white text-[8px] flex items-center justify-center font-bold leading-none">{pendingCount}</span>
                        )}
                </button>
                {/* User */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#e63946] flex items-center justify-center text-white text-xs font-black shrink-0">{user?.nickname?.[0] ?? '?'}</div>
                    <div className="text-xs leading-tight">
                        <span className="text-[#f5f5f5] font-medium">{user?.nickname ?? ''}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
