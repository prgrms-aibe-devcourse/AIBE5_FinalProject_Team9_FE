"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Theme } from "@/types/theme";

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
  const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];
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
  const drawerReviews = [
    {
      id: 1,
      userNickname: "공포매니아",
      rating: Math.round(theme.rating),
      difficulty: theme.difficulty,
      horrorLevel: theme.horrorLevel,
      content:
        "몰입감이 좋고 단서 흐름이 깔끔했습니다. 공포 연출도 테마 정보와 비슷하게 느껴졌어요.",
      tags: ["몰입감", "연출 좋음", "추천"],
      createdAt: "2026-04-10",
    },
    {
      id: 2,
      userNickname: "탈출러",
      rating: Math.max(4, Math.floor(theme.rating)),
      difficulty: Math.max(1, theme.difficulty - 1),
      horrorLevel: theme.horrorLevel,
      content:
        "같이 간 인원이 모두 만족했습니다. 난이도는 적당했고 분위기가 끝까지 유지됩니다.",
      tags: ["스토리", "협동", "재방문"],
      createdAt: "2026-03-22",
    },
  ];
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

  const requestClose = () => {
    setIsVisible(false);
    window.setTimeout(onClose, 220);
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
            {theme.imageUrl ? (
              <Image
                src={theme.imageUrl}
                alt={theme.title}
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
              {theme.isBest && (
                <span className="rounded-full border border-[#d7b46a]/45 bg-[#d7b46a]/14 px-3 py-1 text-xs font-black text-[#e8c766]">
                  BEST
                </span>
              )}
              {theme.isHot && (
                <span className="rounded-full border border-[#cc2222]/45 bg-[#cc2222]/14 px-3 py-1 text-xs font-black text-[#ef5353]">
                  HOT
                </span>
              )}
              {theme.isNew && (
                <span className="rounded-full border border-white/[0.16] bg-white/[0.08] px-3 py-1 text-xs font-black text-[#d8d8d8]">
                  NEW
                </span>
              )}
              {theme.rank && (
                <span className="rounded-full border border-[#cc2222]/35 bg-black/35 px-3 py-1 text-xs font-black text-[#ef5353]">
                  {theme.rank}위
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="mb-2 text-[12px] font-bold text-[#aaa]">
                {theme.locationName} · {theme.branchName}
              </p>
              <h2 className="text-[34px] font-black leading-tight text-white">
                {theme.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-xs font-bold text-[#b8b8b8]">
                  {theme.duration}분
                </span>
                <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-xs font-bold text-[#b8b8b8]">
                  {theme.minPlayers}~{theme.maxPlayers}인
                </span>
                <span className="rounded-full border border-[#cc2222]/35 bg-[#cc2222]/10 px-3 py-1 text-xs font-bold text-[#ef5353]">
                  {theme.price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <div className="relative border-b border-white/[0.08] bg-[#111]/95">
            <div className="grid grid-cols-4">
              {[
                { label: "평점", value: `★ ${theme.rating.toFixed(1)}` },
                { label: "리뷰", value: String(theme.reviewCount) },
                { label: "공포도", value: `${theme.horrorLevel}/5` },
                { label: "난이도", value: `${theme.difficulty}/5` },
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
                    {theme.description}
                  </p>
                </section>

                <section className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["장르", theme.genre],
                    ["지역", theme.locationName],
                    ["지점", theme.branchName],
                    ["클리어율", `${theme.clearRate ?? 0}%`],
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
                {drawerReviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-5"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black text-[#f4f4f4]">
                          {review.userNickname}
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
                        <DrawerRatingIcons level={review.horrorLevel} type="horror" />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-[#888]">난이도</span>
                        <DrawerRatingIcons level={review.difficulty} type="difficulty" />
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

            {activeTab === "review" && false && (
              <div className="space-y-3">
                {[1, 2, 3].map((review) => (
                  <article
                    key={review}
                    className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-black text-[#f4f4f4]">도전자 {review}</p>
                      <span className="text-sm font-black text-[#e8c766]">★ {theme.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-sm leading-7 text-[#aaa]">
                      분위기와 몰입감이 좋았고, 단서 흐름이 깔끔했습니다. 공포 연출은 테마 정보와 비슷하게 느껴졌어요.
                    </p>
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
                  <h3 className="mt-3 text-xl font-black text-white">{theme.branchName}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#aaa]">
                    {theme.locationName} 지점 안내입니다. 예약 시간 10분 전 도착을 권장합니다.
                  </p>
                </div>
                <div className="rounded-[16px] border border-white/[0.08] bg-[#101010] p-5 text-sm text-[#9a9a9a]">
                  지도 영역은 추후 실제 지점 정보와 연동됩니다.
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
                  <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-3">
                    {timeSlots.map((time, index) => {
                      const isSoldOut = index === 2 || index === 5;
                      const isSelected = selectedTime === time;

                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isSoldOut}
                          onClick={() => setSelectedTime(time)}
                          className={[
                            "h-11 rounded-[10px] border text-sm font-black transition-all",
                            isSoldOut
                              ? "cursor-not-allowed border-white/[0.05] text-[#444] line-through"
                              : isSelected
                                ? "border-[#cc2222] bg-[#cc2222] text-white shadow-[0_0_18px_rgba(204,34,34,0.2)]"
                                : "border-white/[0.1] bg-[#171717] text-[#d8d8d8] hover:border-[#cc2222]/65",
                          ].join(" ")}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
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
            <Link
              href={`/reservation?themeId=${theme.id}&date=${selectedDate}${selectedTime ? `&time=${selectedTime}` : ""}`}
              className="h-12 flex-[1.7] rounded-[10px] bg-[#cc2222] text-center text-sm font-black leading-[48px] text-white transition-all hover:bg-[#e23b3b] hover:shadow-[0_0_22px_rgba(204,34,34,0.22)]"
            >
              예약 진행하기
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
