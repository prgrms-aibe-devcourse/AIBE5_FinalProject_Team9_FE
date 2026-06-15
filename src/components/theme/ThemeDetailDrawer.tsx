"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getThemeBranchInfo,
  getThemeById,
  getThemeReviews,
  getThemeTimeSlots,
  ThemeBranchInfo,
  ThemeReview,
  ThemeTimeSlot,
} from "@/services/themeService";
import { useReservationStore } from "@/stores/reservationStore";
import { Theme, ThemeDetail } from "@/types/theme";

function DrawerSkullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
      />
    </svg>
  );
}

function DrawerLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
      />
    </svg>
  );
}

type DrawerTab = "info" | "review" | "location" | "reservation";

const WEEKDAY_LABELS = [
  "\uC77C",
  "\uC6D4",
  "\uD654",
  "\uC218",
  "\uBAA9",
  "\uAE08",
  "\uD1A0",
];

function getDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function DrawerRatingIcons({
  level,
  type,
}: {
  level: number;
  type: "horror" | "difficulty";
}) {
  const Icon = type === "horror" ? DrawerSkullIcon : DrawerLockIcon;
  const activeColor = type === "horror" ? "text-[#c94a4a]" : "text-[#d7b46a]";

  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          className={[
            "h-[15px] w-[15px]",
            index < level ? activeColor : "text-[#343434] opacity-55",
          ].join(" ")}
        />
      ))}
    </span>
  );
}

export default function ThemeDetailDrawer({
  theme,
  onClose,
}: {
  theme: Theme;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<DrawerTab>("info");
  const [selectedDate, setSelectedDate] = useState(() =>
    getDateValue(new Date()),
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() =>
    getMonthStart(new Date()),
  );
  const [detailTheme, setDetailTheme] = useState<ThemeDetail | null>(null);
  const [reviews, setReviews] = useState<ThemeReview[]>([]);
  const [reviewStats, setReviewStats] = useState({ averageRating: theme.rating, reviewCount: theme.reviewCount });
  const [branchInfo, setBranchInfo] = useState<ThemeBranchInfo | null>(null);
  const [timeSlots, setTimeSlots] = useState<ThemeTimeSlot[]>([]);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [isBranchLoading, setIsBranchLoading] = useState(false);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");
  const [branchError, setBranchError] = useState("");
  const [slotsError, setSlotsError] = useState("");
  const { setTheme, setLocation, setDateTime, setHeadcount } = useReservationStore();
  const displayTheme = detailTheme ?? theme;
  const displayThemeId = displayTheme.id || theme.id;
  const displayRating =
    reviewStats.reviewCount > 0 ? reviewStats.averageRating : displayTheme.rating;
  const displayReviewCount =
    reviewStats.reviewCount > 0 ? reviewStats.reviewCount : displayTheme.reviewCount;
  const displayBranchName = branchInfo?.branchName || displayTheme.branchName;
  const displayRegion = branchInfo?.region || displayTheme.locationName;
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const isPreviousMonthDisabled =
    calendarMonth.getTime() <= getMonthStart(today).getTime();
  const calendarDays = useMemo<(Date | null)[]>(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: firstDay + daysInMonth }, (_, index) => {
      if (index < firstDay) return null;
      return new Date(year, month, index - firstDay + 1);
    });
  }, [calendarMonth]);
  const tabs: { id: DrawerTab; label: string }[] = [
    { id: "info", label: "상세 정보" },
    { id: "review", label: "후기" },
    { id: "location", label: "위치 안내" },
    { id: "reservation", label: "예약" },
  ];

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsVisible(true));

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    let isMounted = true;

    setDetailTheme(null);
    setBranchInfo(null);
    setReviews([]);
    setReviewStats({ averageRating: theme.rating, reviewCount: theme.reviewCount });
    setSelectedTime("");
    setReviewsError("");
    setBranchError("");
    setSlotsError("");
    setIsDetailLoading(true);
    setIsReviewsLoading(true);
    setIsBranchLoading(true);

    getThemeById(theme.id)
      .then((data) => {
        if (!isMounted) return;
        setDetailTheme({
          ...theme,
          ...data,
          id: data.id || theme.id,
          title: data.title || theme.title,
          imageUrl: data.imageUrl || theme.imageUrl,
          genre: data.genre || theme.genre,
          locationName: data.locationName || theme.locationName,
          branchName: data.branchName || theme.branchName,
        });
        setReviewStats((prev) => ({
          averageRating: prev.reviewCount > 0 ? prev.averageRating : data.rating,
          reviewCount: prev.reviewCount > 0 ? prev.reviewCount : data.reviewCount,
        }));
      })
      .catch(() => {
        if (isMounted) setDetailTheme(null);
      })
      .finally(() => {
        if (isMounted) setIsDetailLoading(false);
      });

    getThemeReviews(theme.id)
      .then((data) => {
        if (!isMounted) return;
        setReviews(data.reviews);
        setReviewStats({
          averageRating: data.averageRating,
          reviewCount: data.reviewCount,
        });
      })
      .catch(() => {
        if (!isMounted) return;
        setReviewsError("후기를 불러오지 못했습니다.");
        setReviewStats({ averageRating: theme.rating, reviewCount: theme.reviewCount });
      })
      .finally(() => {
        if (isMounted) setIsReviewsLoading(false);
      });

    getThemeBranchInfo(theme.id)
      .then((data) => {
        if (isMounted) setBranchInfo(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setBranchError("지점 정보를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (isMounted) setIsBranchLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [theme]);

  useEffect(() => {
    let isMounted = true;

    setTimeSlots([]);
    setSelectedTime("");
    setSlotsError("");
    setIsSlotsLoading(true);

    getThemeTimeSlots(theme.id, selectedDate)
      .then((data) => {
        if (isMounted) setTimeSlots(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setSlotsError("예약 가능 시간을 불러오지 못했습니다.");
      })
      .finally(() => {
        if (isMounted) setIsSlotsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate, theme.id]);

  const requestClose = () => {
    setIsVisible(false);
    window.setTimeout(onClose, 220);
  };

  const saveReservationDraft = () => {
    if (!selectedDate || !selectedTime) return;

    setTheme(displayThemeId, displayTheme.title, displayTheme.imageUrl);
    setLocation(displayRegion ?? "", displayBranchName ?? "");
    setDateTime(selectedDate, selectedTime);
    setHeadcount(displayTheme.minPlayers || 1, 0);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="상세 패널 닫기"
        onClick={requestClose}
        className={[
          "absolute inset-0 bg-black/72 backdrop-blur-[2px] transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "absolute right-0 top-0 flex h-full w-full max-w-[min(920px,62vw)] min-w-[760px] flex-col overflow-hidden border-l border-[#cc2222]/25 bg-[#111] shadow-[-28px_0_70px_rgba(0,0,0,0.56),-8px_0_32px_rgba(204,34,34,0.12)] transition-transform duration-300 ease-out max-lg:min-w-0 max-lg:max-w-[94vw]",
          isVisible ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(204,34,34,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_34%)]" />

        <div className="relative flex h-full flex-col overflow-y-auto">
          <div className="relative h-[300px] shrink-0 overflow-hidden bg-[#171717]">
            {displayTheme.imageUrl ? (
              <Image
                src={displayTheme.imageUrl}
                alt={displayTheme.title}
                fill
                sizes="(min-width: 1024px) 820px, 92vw"
                className="object-cover brightness-[0.62] contrast-115 saturate-[0.74]"
                priority
              />
            ) : (
              <div className="h-full w-full bg-[#171717]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(17,17,17,0.34)_44%,#111_100%)]" />

            <button
              type="button"
              onClick={requestClose}
              aria-label="닫기"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-xl font-black text-white transition-colors hover:border-[#cc2222]/60 hover:bg-[#cc2222]/18"
            >
              ×
            </button>

            <div className="absolute left-6 top-5 flex flex-wrap gap-2">
              {displayTheme.isBest && (
                <span className="rounded-full border border-[#d7b46a]/45 bg-[#d7b46a]/14 px-3 py-1 text-xs font-black text-[#e8c766]">
                  BEST
                </span>
              )}
              {displayTheme.isHot && (
                <span className="rounded-full border border-[#cc2222]/45 bg-[#cc2222]/14 px-3 py-1 text-xs font-black text-[#ef5353]">
                  HOT
                </span>
              )}
              {displayTheme.isNew && (
                <span className="rounded-full border border-white/[0.16] bg-white/[0.08] px-3 py-1 text-xs font-black text-[#d8d8d8]">
                  NEW
                </span>
              )}
              {displayTheme.rank && (
                <span className="rounded-full border border-[#cc2222]/35 bg-black/35 px-3 py-1 text-xs font-black text-[#ef5353]">
                  {displayTheme.rank}위
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="mb-2 text-[12px] font-bold text-[#aaa]">
                {displayRegion} · {displayBranchName}
              </p>
              <h2 className="text-[34px] font-black leading-tight text-white">
                {displayTheme.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-xs font-bold text-[#b8b8b8]">
                  {displayTheme.duration}분
                </span>
                <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-xs font-bold text-[#b8b8b8]">
                  {displayTheme.minPlayers}~{displayTheme.maxPlayers}인
                </span>
                <span className="rounded-full border border-[#cc2222]/35 bg-[#cc2222]/10 px-3 py-1 text-xs font-bold text-[#ef5353]">
                  {displayTheme.price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <div className="relative border-b border-white/[0.08] bg-[#111]/95">
            <div className="grid grid-cols-4">
              {[
                { label: "평점", value: `★ ${displayRating.toFixed(1)}` },
                { label: "리뷰", value: String(displayReviewCount) },
                { label: "공포도", value: `${displayTheme.horrorLevel}/5` },
                { label: "난이도", value: `${displayTheme.difficulty}/5` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border-r border-white/[0.08] px-4 py-4 text-center last:border-r-0"
                >
                  <p className="text-[15px] font-black text-[#f4f4f4]">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#777]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-0 z-10 grid grid-cols-4 border-b border-white/[0.08] bg-[#111]/95 backdrop-blur">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "py-4 text-sm font-black transition-colors",
                  activeTab === tab.id
                    ? "border-b-2 border-[#cc2222] text-[#ef5353]"
                    : "text-[#888] hover:text-[#f5f5f5]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 px-7 py-7 pb-28">
            {activeTab === "info" && (
              <div className="space-y-7">
                <section>
                  <p className="mb-3 text-[11px] font-black tracking-[0.24em] text-[#cc2222]">
                    {"// THEME STORY"}
                  </p>
                  <p className="text-[15px] leading-8 text-[#c8c8c8]">
                    {isDetailLoading ? "상세 정보를 불러오는 중입니다." : displayTheme.description}
                  </p>
                </section>

                <section className="grid gap-3 sm:grid-cols-2">
	                  {[
	                    ["장르", displayTheme.genre],
	                    ["지역", displayRegion],
	                    ["지점", displayBranchName],
	                    ["테마 번호", `#${displayThemeId}`],
	                    ...(typeof displayTheme.clearRate === "number"
	                      ? ([["클리어율", `${displayTheme.clearRate}%`]] as [string, string][])
	                      : []),
	                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[12px] border border-white/[0.08] bg-[#171717] p-4"
                    >
                      <p className="text-[11px] font-bold text-[#777]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[#f1f1f1]">{value}</p>
                    </div>
                  ))}
                </section>
              </div>
            )}

            {activeTab === "review" && (
              <div className="space-y-4">
                {isReviewsLoading && (
                  <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-8 text-center text-sm font-bold text-[#888]">
                    후기를 불러오는 중입니다.
                  </div>
                )}

                {!isReviewsLoading && reviewsError && (
                  <div className="rounded-[14px] border border-[#cc2222]/35 bg-[#171717] p-8 text-center text-sm font-bold text-[#ef5353]">
                    {reviewsError}
                  </div>
                )}

                {!isReviewsLoading && !reviewsError && reviews.length === 0 && (
                  <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-8 text-center">
                    <p className="text-sm font-black text-[#d8d8d8]">
                      아직 등록된 후기가 없습니다.
                    </p>
                    <p className="mt-2 text-xs text-[#777]">
                      첫 후기가 등록되면 이곳에 표시됩니다.
                    </p>
                  </div>
                )}

                {!isReviewsLoading && !reviewsError && reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-5"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black text-[#f4f4f4]">
                          {review.nickname}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#777]">
                          {review.createdAt}
                        </p>
                      </div>
                      <span className="text-sm font-black text-[#e8c766]">
                        ★ {review.rating.toFixed(1)}
                      </span>
                    </div>

                    <div className="mb-4 grid gap-2 rounded-[12px] border border-white/[0.06] bg-[#101010]/65 p-3 sm:grid-cols-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-[#888]">공포도</span>
                        <DrawerRatingIcons level={review.horrorRating} type="horror" />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-[#888]">난이도</span>
                        <DrawerRatingIcons level={review.difficultyRating} type="difficulty" />
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-[#aaa]">{review.content}</p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {review.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-[#8f8f8f]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="text-xs font-bold text-[#666] transition-colors hover:text-[#aaa]"
                      >
                        신고
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "location" && (
              <div className="space-y-5">
                <div className="rounded-[16px] border border-white/[0.08] bg-[#171717] p-5">
                  <p className="text-[11px] font-black tracking-[0.22em] text-[#cc2222]">
                    {"// LOCATION"}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-white">{displayBranchName}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#aaa]">
                    {isBranchLoading
                      ? "지점 정보를 불러오는 중입니다."
                      : branchError || `${displayRegion} 지점 안내입니다. 예약 시간 10분 전 도착을 권장합니다.`}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["상호", branchInfo?.storeName],
                    ["지점", displayBranchName],
                    ["지역", displayRegion],
                    ["운영시간", branchInfo?.operatingHours],
                    ["전화", branchInfo?.phone],
                    ["주소", branchInfo?.address],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[12px] border border-white/[0.08] bg-[#101010] p-4"
                    >
                      <p className="text-[11px] font-bold text-[#777]">{label}</p>
                      <p className="mt-1 text-sm font-black leading-6 text-[#f1f1f1]">
                        {value || "-"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[16px] border border-white/[0.08] bg-[#101010] p-5 text-sm leading-7 text-[#9a9a9a]">
                  {branchInfo?.address
                    ? branchInfo.address
                    : "주소 정보가 등록되면 이곳에 표시됩니다."}
                </div>
              </div>
            )}

            {activeTab === "reservation" && (
              <div className="space-y-6">
                <section>
                  <p className="mb-3 text-[11px] font-black tracking-[0.22em] text-[#cc2222]">
                    {"// SELECT DATE"}
                  </p>
                  <div className="rounded-[16px] border border-white/[0.08] bg-[#171717] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        disabled={isPreviousMonthDisabled}
                        onClick={() =>
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() - 1,
                              1,
                            ),
                          )
                        }
                        className={[
                          "flex h-9 w-9 items-center justify-center rounded-full border text-lg font-black transition-all",
                          isPreviousMonthDisabled
                            ? "cursor-not-allowed border-white/[0.05] text-[#3d3d3d]"
                            : "border-white/[0.1] text-[#aaa] hover:border-[#cc2222]/55 hover:text-white",
                        ].join(" ")}
                        aria-label="Previous month"
                      >
                        {"\u2039"}
                      </button>

                      <p className="text-sm font-black text-[#f2f2f2]">
                        {calendarMonth.toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() + 1,
                              1,
                            ),
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-lg font-black text-[#aaa] transition-all hover:border-[#cc2222]/55 hover:text-white"
                        aria-label="Next month"
                      >
                        {"\u203A"}
                      </button>
                    </div>

                    <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-black text-[#666]">
                      {WEEKDAY_LABELS.map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {calendarDays.map((date, index) => {
                        if (!date) {
                          return <span key={`empty-${index}`} />;
                        }

                        const dateValue = getDateValue(date);
                        const isPast = date.getTime() < today.getTime();
                        const isSelected = selectedDate === dateValue;
                        const isToday = dateValue === getDateValue(today);

                        return (
                          <button
                            key={dateValue}
                            type="button"
                            disabled={isPast}
                            onClick={() => {
                              setSelectedDate(dateValue);
                              setSelectedTime("");
                            }}
                            className={[
                              "relative flex h-10 items-center justify-center rounded-[10px] border text-sm font-black transition-all",
                              isPast
                                ? "cursor-not-allowed border-transparent text-[#3f3f3f]"
                                : isSelected
                                  ? "border-[#cc2222] bg-[#cc2222] text-white shadow-[0_0_18px_rgba(204,34,34,0.22)]"
                                  : "border-white/[0.06] bg-[#111]/70 text-[#cfcfcf] hover:border-[#cc2222]/55 hover:bg-[#cc2222]/10 hover:text-white",
                            ].join(" ")}
                          >
                            {date.getDate()}
                            {isToday && !isSelected && (
                              <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#cc2222]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section>
                  <p className="mb-3 text-[11px] font-black tracking-[0.22em] text-[#cc2222]">
                    {"// TIME TABLE"}
                  </p>
                  {isSlotsLoading ? (
                    <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-8 text-center text-sm font-bold text-[#888]">
                      예약 가능 시간을 불러오는 중입니다.
                    </div>
                  ) : slotsError ? (
                    <div className="rounded-[14px] border border-[#cc2222]/35 bg-[#171717] p-8 text-center text-sm font-bold text-[#ef5353]">
                      {slotsError}
                    </div>
                  ) : timeSlots.length === 0 ? (
                    <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-8 text-center">
                      <p className="text-sm font-black text-[#d8d8d8]">
                        선택한 날짜에 예약 가능한 시간이 없습니다.
                      </p>
                      <p className="mt-2 text-xs text-[#777]">
                        다른 날짜를 선택해주세요.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-3">
                      {timeSlots.map((slot) => {
                        const isSoldOut = !slot.available;
                        const isSelected = selectedTime === slot.time;

                        return (
                          <button
                            key={slot.id ?? slot.time}
                            type="button"
                            disabled={isSoldOut}
                            onClick={() => setSelectedTime(slot.time)}
                            className={[
                              "h-11 rounded-[10px] border text-sm font-black transition-all",
                              isSoldOut
                                ? "cursor-not-allowed border-white/[0.05] text-[#444] line-through"
                                : isSelected
                                  ? "border-[#cc2222] bg-[#cc2222] text-white shadow-[0_0_18px_rgba(204,34,34,0.2)]"
                                  : "border-white/[0.1] bg-[#171717] text-[#d8d8d8] hover:border-[#cc2222]/65",
                            ].join(" ")}
                            title={slot.status}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </section>
                <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-4 text-sm leading-7 text-[#aaa]">
                  예약은 선택한 시간표 기준으로 진행됩니다. 현장 상황에 따라 일부 시간은 조기 마감될 수 있습니다.
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 z-10 flex gap-3 border-t border-white/[0.08] bg-[#111]/95 px-7 py-4 backdrop-blur">
            <button
              type="button"
              onClick={requestClose}
              className="h-12 flex-1 rounded-[10px] border border-white/[0.12] text-sm font-black text-[#d8d8d8] transition-colors hover:bg-white/[0.06]"
            >
              닫기
            </button>
            {selectedDate && selectedTime ? (
              <Link
                href={`/reservation?themeId=${displayThemeId}&date=${selectedDate}&time=${selectedTime}`}
                onClick={saveReservationDraft}
                className="h-12 flex-[1.7] rounded-[10px] bg-[#cc2222] text-center text-sm font-black leading-[48px] text-white transition-all hover:bg-[#e23b3b] hover:shadow-[0_0_22px_rgba(204,34,34,0.22)]"
              >
                예약 진행하기
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="h-12 flex-[1.7] cursor-not-allowed rounded-[10px] bg-[#cc2222] text-sm font-black text-white opacity-45"
              >
                예약 진행하기
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
