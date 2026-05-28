import Link from "next/link";
import ThemeCarousel from "./ThemeCarousel";
import { Theme } from "@/types/theme";

interface ThemeSectionProps {
  title: string;
  subtitle?: string;
  themes: Theme[];
  href?: string;
}

export default function ThemeSection({
  title,
  subtitle,
  themes,
  href,
}: ThemeSectionProps) {
  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-[23px] font-black leading-none text-[#f4f4f4]">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2.5 text-[13px] leading-6 text-[#777]">
              {subtitle}
            </p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="pb-1 text-[12px] font-bold text-[#777] transition-colors hover:text-[#cc2222]"
          >
            전체보기 ›
          </Link>
        )}
      </div>

      <ThemeCarousel themes={themes.slice(0, 4)} />
    </div>
  );
}
