"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ThemeCard from "@/components/card/ThemeCard";
import ThemeDetailDrawer from "@/components/theme/ThemeDetailDrawer";
import { getThemes } from "@/services/themeService";
import { Theme } from "@/types/theme";

const LOCATIONS = ["강남", "홍대", "건대", "신촌"];
const PER_PAGE = 12;
const SORT_OPTIONS = [
  { value: "default", label: "기본순" },
  { value: "popular", label: "인기순" },
  { value: "latest", label: "최신순" },
] as const;
type SortOption = (typeof SORT_OPTIONS)[number]["value"];
type DrawerInitialTab = "info" | "reservation";

function FilterSkullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
      />
    </svg>
  );
}

function FilterLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
      />
    </svg>
  );
}

function RatingFilter({
  label,
  value,
  type,
  onChange,
}: {
  label: string;
  value: number;
  type: "horror" | "difficulty";
  onChange: (value: number) => void;
}) {
  const Icon = type === "horror" ? FilterSkullIcon : FilterLockIcon;
  const activeColor = type === "horror" ? "text-[#c94a4a]" : "text-[#d7b46a]";
  const activeShadow =
    type === "horror"
      ? "drop-shadow-[0_0_5px_rgba(204,34,34,0.16)]"
      : "drop-shadow-[0_0_5px_rgba(215,180,106,0.2)]";

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
        {label}
      </h3>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(0)}
          className={[
            "h-8 rounded-full border px-3 text-xs font-black transition-all",
            value === 0
              ? "border-[#cc2222]/60 bg-[#cc2222]/12 text-[#ef5353]"
              : "border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]",
          ].join(" ")}
        >
          전체
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const level = index + 1;
            const isActive = value >= level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => onChange(level)}
                aria-label={`${label} ${level}단계`}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-white/[0.05]"
              >
                <Icon
                  className={[
                    "h-[17px] w-[17px] transition-all",
                    isActive
                      ? `${activeColor} ${activeShadow} opacity-100`
                      : "text-[#343434] opacity-55 hover:text-[#5a5a5a] hover:opacity-75",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [horrorLevel, setHorrorLevel] = useState(0);
  const [minPlayers, setMinPlayers] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [drawerInitialTab, setDrawerInitialTab] = useState<DrawerInitialTab>("info");
  const [page, setPage] = useState(1);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const availableLocations = useMemo(() => {
    const locations = themes
      .map((theme) => theme.locationName)
      .filter((location): location is string => Boolean(location));

    return locations.length > 0 ? Array.from(new Set(locations)) : LOCATIONS;
  }, [themes]);

  useEffect(() => {
    let isMounted = true;

    const fetchThemes = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await getThemes();
        if (!isMounted) return;
        setThemes(data);
      } catch {
        if (!isMounted) return;
        setErrorMessage("테마 목록을 불러오지 못했습니다.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchThemes();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...themes];
    const keyword = searchKeyword.trim().toLowerCase();

    if (keyword) {
      list = list.filter((theme) =>
        [
          theme.title,
          theme.description,
          theme.genre,
          theme.branchName,
          theme.locationName,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(keyword)),
      );
    }

    if (selectedLocations.length > 0) {
      list = list.filter((t) =>
        selectedLocations.some((location) =>
          [t.locationName, t.branchName].some((value) => value?.includes(location)),
        ),
      );
    }
    if (difficulty > 0) list = list.filter((t) => t.difficulty === difficulty);
    if (horrorLevel > 0)
      list = list.filter((t) => t.horrorLevel === horrorLevel);
    if (minPlayers > 0) {
      list = list.filter((theme) => {
        const minimum = theme.minPlayers > 0 ? theme.minPlayers : 1;
        const maximum =
          theme.maxPlayers > 0 ? theme.maxPlayers : Number.POSITIVE_INFINITY;
        return minimum <= minPlayers && minPlayers <= maximum;
      });
    }
    if (minRating > 0) list = list.filter((t) => (t.rating ?? 0) >= minRating);
    if (sort === "default") list.sort((a, b) => a.id - b.id);
    else if (sort === "popular")
      list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [
    themes,
    searchKeyword,
    selectedLocations,
    difficulty,
    horrorLevel,
    minPlayers,
    minRating,
    sort,
  ]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const selectedTheme =
    selectedThemeId !== null
      ? themes.find((theme) => theme.id === selectedThemeId)
      : undefined;

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
    );
    setPage(1);
  };

  const clearLocations = () => {
    setSelectedLocations([]);
    setPage(1);
  };

  const setFilter = <T,>(setter: (v: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchKeyword("");
    setSelectedLocations([]);
    setDifficulty(0);
    setHorrorLevel(0);
    setMinPlayers(0);
    setMinRating(0);
    setSort("default");
    setIsSortOpen(false);
    setPage(1);
  };

  const openThemeDrawer = (theme: Theme) => {
    setDrawerInitialTab("info");
    setSelectedThemeId(theme.id);
  };

  const closeThemeDrawer = () => {
    setSelectedThemeId(null);
    window.history.pushState(null, "", "/themes");
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const syncThemeFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const themeId = Number(params.get("themeId"));
      const tab = params.get("tab") === "reservation" ? "reservation" : "info";
      setDrawerInitialTab(tab);
      setSelectedThemeId(Number.isFinite(themeId) && themeId > 0 ? themeId : null);
    };

    syncThemeFromUrl();
    window.addEventListener("popstate", syncThemeFromUrl);

    return () => {
      window.removeEventListener("popstate", syncThemeFromUrl);
    };
  }, []);

  useEffect(() => {
    if (!selectedTheme) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeThemeDrawer();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTheme]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.14),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]" />
      <div className="relative mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs font-bold text-[#777]">
          <Link href="/" className="hover:text-[#f5f5f5] transition-colors">
            홈
          </Link>
          <span>›</span>
          <span className="text-[#f5f5f5]">전체 테마</span>
        </nav>

        {/* Header */}
        <div className="mb-10 border-b border-white/[0.08] pb-8">
          <p className="mb-3 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">
            {"// THEME ARCHIVE"}
          </p>
          <h1 className="text-[34px] font-black leading-tight text-[#f5f5f5] md:text-[44px]">
            🔥 <span className="text-[#e63946]">전체</span> 테마
          </h1>
          <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[#a0a0a0]">
            GrimGate의 모든 공포 방탈출 테마를 지역과 난이도로 찾아보세요.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[240px_1fr] lg:gap-7 xl:grid-cols-[248px_1fr]">
          {/* Sidebar — hidden on mobile, visible md+ */}
          <aside className="hidden rounded-[18px] border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur md:block lg:sticky lg:top-24 lg:self-start">
            {/* Search Input */}
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => {
                setSearchKeyword(event.target.value);
                setPage(1);
              }}
              placeholder="테마 검색"
              className="mb-3 h-11 w-full rounded-[10px] border border-white/[0.1] bg-[#101010] px-3 text-sm font-semibold text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/80"
            />

            {/* AI Recommend */}
            <Link
              href="/ai-recommend"
              className="mb-7 block h-11 w-full rounded-[10px] border border-[#cc2222]/45 bg-[#cc2222]/10 text-center text-sm font-black leading-[44px] text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/16 hover:text-white hover:shadow-[0_0_20px_rgba(204,34,34,0.14)]"
            >
              🤖 AI 테마 추천받기
            </Link>

            {/* 지역 */}
            <div className="mb-6">
              <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
                지역
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={clearLocations}
                  className={[
                    "flex h-9 items-center justify-center rounded-full border px-3 text-sm font-bold transition-all",
                    selectedLocations.length === 0
                      ? "border-[#cc2222]/60 bg-[#cc2222]/12 text-[#ef5353]"
                      : "border-white/[0.1] bg-[#101010] text-[#cfcfcf] hover:border-white/20 hover:bg-[#202020]",
                  ].join(" ")}
                >
                  전체
                </button>
                {availableLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={[
                      "flex h-9 items-center justify-center rounded-full border px-3 text-sm font-bold transition-all",
                      selectedLocations.includes(loc)
                        ? "border-[#cc2222]/60 bg-[#cc2222]/12 text-[#ef5353]"
                        : "border-white/[0.1] bg-[#101010] text-[#cfcfcf] hover:border-white/20 hover:bg-[#202020]",
                    ].join(" ")}
                  >
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
            </div>

            <RatingFilter
              label="난이도"
              value={difficulty}
              type="difficulty"
              onChange={(value) => setFilter(setDifficulty, value)}
            />

            <RatingFilter
              label="공포도"
              value={horrorLevel}
              type="horror"
              onChange={(value) => setFilter(setHorrorLevel, value)}
            />

            {/* 인원 수 */}
            <div className="mb-6">
              <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
                인원 수
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[0, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFilter(setMinPlayers, n)}
                    className={[
                      "rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all",
                      minPlayers === n
                        ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]"
                        : "border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]",
                    ].join(" ")}
                  >
                    {n === 0 ? "전체" : `${n}인`}
                  </button>
                ))}
              </div>
            </div>

            {/* 평점 범위 */}
            <div className="mb-6">
              <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
                평점 범위
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilter(setMinRating, r)}
                    className={[
                      "rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all",
                      minRating === r
                        ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]"
                        : "border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]",
                    ].join(" ")}
                  >
                    {r === 0 ? "전체" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* 정렬 */}
            <div className="mb-7">
              <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
                정렬
              </h3>
              <div ref={sortDropdownRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
                  onClick={() => setIsSortOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setIsSortOpen(false);
                  }}
                  className={[
                    "flex h-10 w-full items-center justify-between rounded-[10px] border bg-[#101010] pl-3 pr-3 text-left text-sm font-bold text-[#f5f5f5] outline-none transition-all",
                    isSortOpen
                      ? "border-[#cc2222]/70 shadow-[0_0_18px_rgba(204,34,34,0.14)]"
                      : "border-white/[0.1] hover:border-white/20",
                  ].join(" ")}
                >
                  <span>
                    {SORT_OPTIONS.find((option) => option.value === sort)?.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "ml-3 text-[10px] text-[#8a8a8a] transition-transform",
                      isSortOpen ? "rotate-180 text-[#ef5353]" : "",
                    ].join(" ")}
                  >
                    ▼
                  </span>
                </button>

                {isSortOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#101010] shadow-[0_18px_36px_rgba(0,0,0,0.42)]">
                    <ul role="listbox" aria-label="정렬 방식" className="p-1">
                      {SORT_OPTIONS.map((option) => {
                        const isSelected = sort === option.value;

                        return (
                          <li key={option.value} role="option" aria-selected={isSelected}>
                            <button
                              type="button"
                              onClick={() => {
                                setFilter(setSort, option.value);
                                setIsSortOpen(false);
                              }}
                              className={[
                                "flex h-9 w-full items-center justify-between rounded-[8px] px-3 text-left text-sm font-bold transition-colors",
                                isSelected
                                  ? "bg-[#cc2222]/12 text-[#ef5353]"
                                  : "text-[#b8b8b8] hover:bg-white/[0.06] hover:text-[#f2f2f2]",
                              ].join(" ")}
                            >
                              <span>{option.label}</span>
                              {isSelected && (
                                <span className="text-[10px] text-[#ef5353]">●</span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="h-11 w-full rounded-[10px] border border-white/[0.12] bg-transparent text-sm font-black text-[#b8b8b8] transition-all hover:border-[#cc2222]/55 hover:bg-[#cc2222]/8 hover:text-[#f2f2f2]"
            >
              필터 초기화
            </button>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {/* Mobile filter row */}
            <div className="mb-5 flex gap-2 overflow-x-auto pb-2 md:hidden">
              <button
                type="button"
                onClick={clearLocations}
                className={[
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                  selectedLocations.length === 0
                    ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]"
                    : "border-white/[0.1] bg-[#171717] text-[#9a9a9a]",
                ].join(" ")}
              >
                전체
              </button>
              {availableLocations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={[
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                    selectedLocations.includes(loc)
                      ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]"
                      : "border-white/[0.1] bg-[#171717] text-[#9a9a9a]",
                  ].join(" ")}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Count + Sort toggles */}
            <div className="mb-5 flex items-center justify-between gap-4 rounded-[14px] border border-white/[0.08] bg-[#171717]/72 px-4 py-3">
              <span className="text-sm font-semibold text-[#8f8f8f]">
                <span className="text-[#f5f5f5] font-bold">
                  {filtered.length}
                </span>
                개의 테마
              </span>
	              <div className="flex gap-1.5">
	                {SORT_OPTIONS.map((option) => (
	                  <button
	                    key={option.value}
	                    onClick={() => setFilter(setSort, option.value)}
	                    className={[
	                      "rounded-full border px-3 py-1.5 text-xs font-black transition-all",
	                      sort === option.value
	                        ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]"
	                        : "border-white/[0.1] text-[#888] hover:border-white/20 hover:text-[#d8d8d8]",
	                    ].join(" ")}
	                  >
	                    {option.label}
	                  </button>
	                ))}
	              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="rounded-[18px] border border-white/[0.08] bg-[#171717] py-24 text-center text-[#888]">
                <p className="text-sm font-black text-[#d8d8d8]">
                  테마 목록을 불러오는 중입니다.
                </p>
                <p className="mt-2 text-xs text-[#666]">잠시만 기다려주세요.</p>
              </div>
            ) : errorMessage ? (
              <div className="rounded-[18px] border border-[#cc2222]/35 bg-[#171717] py-24 text-center text-[#888]">
                <p className="text-sm font-black text-[#ef5353]">{errorMessage}</p>
                <p className="mt-2 text-xs text-[#777]">
                  백엔드 서버가 실행 중인지 확인해주세요.
                </p>
              </div>
            ) : themes.length === 0 ? (
              <div className="rounded-[18px] border border-white/[0.08] bg-[#171717] py-24 text-center text-[#888]">
                <p className="text-4xl mb-4">🔍</p>
                <p className="font-bold text-[#d8d8d8]">등록된 테마가 없습니다.</p>
                <p className="mt-2 text-xs text-[#777]">
                  owner 페이지에서 테마를 등록하면 여기에 표시됩니다.
                </p>
              </div>
            ) : paged.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [&_article_h3]:text-[20px] [&_article_h3]:tracking-[-0.01em] [&_article_h3+div]:mt-4 [&_article_h3+div]:space-y-3 [&_article_h3+div>div:first-child]:grid [&_article_h3+div>div:first-child]:gap-2 [&_article_h3+div>div:first-child]:text-[12px] [&_article_h3+div>div:first-child>span]:flex [&_article_h3+div>div:first-child>span]:w-full [&_article_h3+div>div:first-child>span]:justify-between [&_article_h3+div>div:nth-child(2)]:justify-between [&_article_h3+div>div:nth-child(2)]:text-[11px] [&_article_h3+div>div:nth-child(2)]:text-[#707070] [&_article_h3+div>div:nth-child(2)>span:first-child]:inline-flex [&_article_h3+div>div:nth-child(2)>span:first-child]:items-center [&_article_h3+div>div:nth-child(2)>span:first-child]:gap-3 [&_article_h3+div>div:nth-child(2)>span:last-child]:shrink-0 [&_article_h3+div>div:nth-child(3)]:flex [&_article_h3+div>div:nth-child(3)]:justify-between [&_article_h3+div>div:nth-child(3)]:text-[11px] [&_article_h3+div>div:nth-child(3)]:text-[#626262]">
                {paged.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
	                    showRank={false}
	                    showPrice
	                    actionLabel="상세보기"
	                    onAction={openThemeDrawer}
	                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[18px] border border-white/[0.08] bg-[#171717] py-24 text-center text-[#888]">
                <p className="text-4xl mb-4">🔍</p>
                <p>조건에 맞는 테마가 없습니다.</p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !errorMessage && totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/[0.1] bg-[#171717] text-[#888] transition-colors hover:border-[#cc2222]/70 hover:text-[#ef5353] disabled:opacity-30"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-[9px] border text-sm font-black transition-colors",
                      page === i + 1
                        ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]"
                        : "border-white/[0.1] bg-[#171717] text-[#888] hover:border-white/20 hover:text-[#d8d8d8]",
                    ].join(" ")}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/[0.1] bg-[#171717] text-[#888] transition-colors hover:border-[#cc2222]/70 hover:text-[#ef5353] disabled:opacity-30"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedTheme && (
        <ThemeDetailDrawer
          theme={selectedTheme}
          initialTab={drawerInitialTab}
          onClose={closeThemeDrawer}
        />
      )}
    </div>
  );
}
