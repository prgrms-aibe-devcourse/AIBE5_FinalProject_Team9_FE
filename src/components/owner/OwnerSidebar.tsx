'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

const NAV_ITEMS = [
  { href: '/owner/dashboard', label: '대시보드', icon: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
    </svg>
  ), badge: 0 },
  { href: '/owner/reservations', label: '예약 관리', icon: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ), badge: 0 },
  { href: '/owner/themes', label: '테마 관리', icon: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ), badge: 0 },
  { href: '/owner/hidden', label: '숨김 요청', icon: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ), badge: 3 },
];

export default function OwnerSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const isActive = (href: string) =>
    pathname === href || (href !== '/owner' && pathname.startsWith(href + '/'));

  return (
    <aside className="w-40 shrink-0 bg-[#0c0c0c] border-r border-[#1a1a1a] flex flex-col min-h-screen sticky top-0 left-0 z-20">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b border-[#1a1a1a]">
        <Link href="/" className="block">
          <p className="text-white font-black text-sm tracking-[0.15em]">GRIMGATE</p>
          <p className="text-[#e63946] text-[10px] mt-0.5 font-semibold tracking-[0.12em] uppercase">Admin Console</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-3 pb-2">
        <p className="px-4 pt-1 pb-2 text-[10px] font-bold text-[#3a3a3a] uppercase tracking-[0.15em]">관리</p>
        {NAV_ITEMS.map(item => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center justify-between px-4 py-2.5 text-xs transition-colors border-l-2',
                active
                  ? 'bg-[#e63946]/10 text-[#e63946] border-[#e63946]'
                  : 'text-[#777] hover:text-[#f5f5f5] hover:bg-[#161616] border-transparent',
              ].join(' ')}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={active ? 'text-[#e63946]' : 'text-[#555]'}>{item.icon}</span>
                <span className="font-medium truncate">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className={[
                  'text-[10px] rounded-full min-w-4.5 h-4.5 flex items-center justify-center font-black px-1 shrink-0',
                  active ? 'bg-[#e63946] text-white' : 'bg-[#2a2a2a] text-[#e63946]',
                ].join(' ')}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-[#1a1a1a] py-3 px-3">
        <Link
          href="/owner/settings"
          className={[
            'flex items-center gap-2.5 px-2 py-2 rounded text-xs transition-colors',
            pathname === '/owner/settings' ? 'text-[#e63946]' : 'text-[#666] hover:text-[#f5f5f5] hover:bg-[#161616]',
          ].join(' ')}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">설정</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded text-xs text-[#666] hover:text-[#f5f5f5] hover:bg-[#161616] transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
