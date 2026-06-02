"use client";

import { useEffect, useState } from "react";

const SECTION_ITEMS = [
  { id: "hero", label: "처음으로" },
  { id: "ai-recommend", label: "령냥이 AI" },
  { id: "popular-themes", label: "인기 테마" },
  { id: "mate-section", label: "메이트 모집" },
  { id: "brand-section", label: "GrimGate란" },
  { id: "how-to-use", label: "이용방법" },
  { id: "features-section", label: "플레이 전 안내" },
  { id: "quick-reservation", label: "빠른예약" },
];

export default function FloatingSectionNav() {
  const [activeId, setActiveId] = useState(SECTION_ITEMS[0].id);

  useEffect(() => {
    const getSections = () =>
      SECTION_ITEMS.map(({ id }) => document.getElementById(id)).filter(
        Boolean,
      ) as HTMLElement[];

    let frameId = 0;

    const updateActiveSection = () => {
      const sections = getSections();
      if (!sections.length) return;

      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const detectionTop = viewportHeight * 0.2;
      const detectionBottom = viewportHeight * 0.72;

      const sectionBounds = sections.map((section) => ({
        id: section.id,
        rect: section.getBoundingClientRect(),
      }));

      const visibleSection = sectionBounds
        .map(({ id, rect }) => ({
          id,
          visibleHeight: Math.max(
            0,
            Math.min(rect.bottom, detectionBottom) -
              Math.max(rect.top, detectionTop),
          ),
        }))
        .sort((a, b) => b.visibleHeight - a.visibleHeight)[0];

      if (visibleSection && visibleSection.visibleHeight > 0) {
        setActiveId(visibleSection.id);
        return;
      }

      if (window.scrollY + viewportHeight >= documentHeight - 16) {
        setActiveId(SECTION_ITEMS[SECTION_ITEMS.length - 1].id);
        return;
      }

      const passedSection = sectionBounds.reduce((current, section) => {
        return section.rect.top <= detectionTop ? section : current;
      }, sectionBounds[0]);

      setActiveId(passedSection.id);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="메인페이지 섹션 바로가기"
      className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="space-y-4 rounded-3xl border border-white/[0.08] bg-[#0d0d0d]/72 px-3 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.34)] backdrop-blur-md">
        {SECTION_ITEMS.map(({ id, label }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(id)}
                className={[
                  "group flex items-center gap-2.5 rounded-full px-2 py-1.5 text-[11px] font-bold transition-colors",
                  isActive
                    ? "text-[#f5f5f5]"
                    : "text-[#777] hover:text-[#f0f0f0]",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full border transition-all",
                    isActive
                      ? "border-[#cc2222] bg-[#cc2222] shadow-[0_0_12px_rgba(204,34,34,0.7)]"
                      : "border-white/20 bg-white/10 group-hover:border-[#cc2222]/70",
                  ].join(" ")}
                />
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
