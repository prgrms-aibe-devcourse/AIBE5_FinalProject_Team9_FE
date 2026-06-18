"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeCarousel from "./ThemeCarousel";
import ThemeDetailDrawer from "@/components/theme/ThemeDetailDrawer";
import { Theme } from "@/types/theme";

interface ThemeSectionProps {
  title: string;
  subtitle?: string;
  themes: Theme[];
  href?: string;
  isLoading?: boolean;
  errorMessage?: string;
}

export default function ThemeSection({
  title,
  subtitle,
  themes,
  href,
  isLoading = false,
  errorMessage = "",
}: ThemeSectionProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const visibleThemes = themes.slice(0, 4);

  useEffect(() => {
    if (!selectedTheme) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTheme(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTheme]);

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

      {isLoading ? (
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-h-[430px] rounded-[12px] border border-white/[0.08] bg-[#171717] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
            >
              <div className="h-[230px] rounded-[10px] bg-white/[0.04]" />
              <div className="mt-6 h-6 w-2/3 rounded bg-white/[0.05]" />
              <div className="mt-5 h-4 w-full rounded bg-white/[0.04]" />
              <div className="mt-3 h-4 w-4/5 rounded bg-white/[0.04]" />
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <SectionStatusMessage tone="error">{errorMessage}</SectionStatusMessage>
      ) : visibleThemes.length === 0 ? (
        <SectionStatusMessage>표시할 인기 테마가 없습니다.</SectionStatusMessage>
      ) : (
        <ThemeCarousel themes={visibleThemes} onThemeAction={setSelectedTheme} />
      )}
      {selectedTheme && (
        <ThemeDetailDrawer theme={selectedTheme} onClose={() => setSelectedTheme(null)} />
      )}
    </div>
  );
}

function SectionStatusMessage({
  children,
  tone = "default",
}: {
  children: string;
  tone?: "default" | "error";
}) {
  return (
    <div
      className={[
        "rounded-[14px] border bg-[#171717] p-8 text-center text-sm font-bold",
        tone === "error"
          ? "border-[#cc2222]/35 text-[#ef5353]"
          : "border-white/[0.08] text-[#888]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
