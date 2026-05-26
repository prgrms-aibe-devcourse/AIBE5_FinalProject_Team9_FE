import Link from 'next/link';
import ThemeCarousel from './ThemeCarousel';
import { Theme } from '@/types/theme';

interface ThemeSectionProps {
  title: string;
  subtitle?: string;
  themes: Theme[];
  href?: string;
}

export default function ThemeSection({ title, subtitle, themes, href }: ThemeSectionProps) {
  return (
    <section className="py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#f5f5f5]">{title}</h2>
          {subtitle && <p className="text-sm text-[#888] mt-1">{subtitle}</p>}
        </div>
        {href && (
          <Link href={href} className="text-xs text-[#888] hover:text-[#e63946] transition-colors">
            전체 보기 ›
          </Link>
        )}
      </div>
      <ThemeCarousel themes={themes} />
    </section>
  );
}
