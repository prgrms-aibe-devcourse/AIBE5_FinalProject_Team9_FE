'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideLayout = pathname.startsWith('/owner') || pathname.startsWith('/admin') || pathname.startsWith('/minigame');

    return (
        <>
            {!hideLayout && <Header />}
            <main>{children}</main>
            {!hideLayout && <Footer />}
        </>
    );
}
