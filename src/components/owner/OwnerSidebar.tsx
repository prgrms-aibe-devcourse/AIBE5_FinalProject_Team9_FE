'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

const navItems = [
  { href: '/owner/reservations', label: '예약 관리', icon: '📅' },
  { href: '/owner/themes', label: '테마 관리', icon: '🎭' },
  { href: '/owner/reviews', label: '후기 관리', icon: '💬' },
];

export default function OwnerSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-40 shrink-0 bg-[#111] border-r border-[#2a2a2a] flex flex-col">
      <div className="px-4 py-5 border-b border-[#2a2a2a]">
        <Link href="/" className="text-white font-black text-sm tracking-wider">GRIMGATE</Link>
        <p className="text-[#888] text-xs mt-0.5">사장님 페이지</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={[
              'flex items-center gap-2 px-4 py-2.5 text-sm transition-colors',
              pathname.startsWith(href)
                ? 'bg-[#e63946]/10 text-[#e63946] border-r-2 border-[#e63946]'
                : 'text-[#888] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]',
            ].join(' ')}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-[#2a2a2a] py-4 px-4 flex flex-col gap-2">
        <Link href="/owner/settings" className="flex items-center gap-2 text-xs text-[#888] hover:text-[#f5f5f5] transition-colors">
          ⚙ 설정
        </Link>
        <button onClick={logout} className="flex items-center gap-2 text-xs text-[#888] hover:text-[#f5f5f5] transition-colors text-left">
          → 로그아웃
        </button>
      </div>
    </aside>
  );
}
