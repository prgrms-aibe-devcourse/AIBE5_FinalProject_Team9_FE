"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";

type TabKey = "reservation" | "achievement" | "activity";
type ReservationStatus = "upcoming" | "cleared" | "failed";

type Reservation = {
  id: number;
  themeTitle: string;
  date: string;
  day: string;
  time: string;
  location: string;
  horrorLevel: number;
  difficulty: number;
  status: ReservationStatus;
  imageUrl: string;
  clearTime?: string;
  dday?: string;
  hasReview?: boolean;
};

const K = {
  home: "\ud648",
  mypage: "\ub9c8\uc774\ud398\uc774\uc9c0",
  reservation: "\uc608\uc57d",
  achievement: "\uc5c5\uc801",
  activity: "\ub0b4 \ud65c\ub3d9",
  titleLead: "\ub9c8\uc774",
  titleRest: "\ud398\uc774\uc9c0",
  subtitle: "\ub098\uc758 \uc608\uc57d \ud604\ud669\uacfc \uc608\uc57d \uae30\ub85d\uc744 \ud655\uc778\ud558\uc138\uc694.",
  name: "\uae40\uacf5\ud3ec",
  branch: "\uac15\ub0a8\uc810",
  gender: "\uc131\ubcc4 \uc5ec\uc790",
  age: "\ub098\uc774 24",
  totalPlay: "\ucd1d \ud50c\ub808\uc774",
  successRate: "\uc131\uacf5\ub960",
  bestClear: "\ucd5c\ub2e8 \ud074\ub9ac\uc5b4",
  achievements: "\ud68d\ub4dd \uc5c5\uc801",
  rankLabel: "\ud604\uc7ac \ub4f1\uae09",
  rank: "\uac15\uc2ec\uc7a5",
  topRank: "\uc0c1\uc704 25%",
  rankRule: "\uc131\uacf5\ub960 75% \uc774\uc0c1",
  upcoming: "\uc608\uc815\ub41c \uc608\uc57d",
  past: "\uc9c0\ub09c \uc608\uc57d",
  horror: "\uacf5\ud3ec\ub3c4",
  difficulty: "\ub09c\uc774\ub3c4",
  scheduled: "\uc608\uc815",
  cleared: "\ud074\ub9ac\uc5b4",
  failed: "\uc2e4\ud328",
  change: "\uc608\uc57d \ubcc0\uacbd",
  reviewView: "\ud6c4\uae30 \ubcf4\uae30",
  reviewWrite: "\ud6c4\uae30 \uc4f0\uae30",
  clearTime: "\ud074\ub9ac\uc5b4 \ud0c0\uc784",
  nextStep: "\ud0ed\uc740 \ub2e4\uc74c \ub2e8\uacc4\uc5d0\uc11c \uc815\ub9ac\ub429\ub2c8\ub2e4.",
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "reservation", label: K.reservation },
  { key: "achievement", label: K.achievement },
  { key: "activity", label: K.activity },
];

const STATS = [
  { label: K.totalPlay, value: "12", accent: "text-[#f5f5f5]", icon: "\ud83c\udfae" },
  { label: K.successRate, value: "75%", accent: "text-[#2ecc71]", icon: "\ud83c\udfaf" },
  { label: K.bestClear, value: "38:24", accent: "text-[#3498db]", icon: "\u23f1" },
  { label: K.achievements, value: "17", accent: "text-[#b66ae0]", icon: "\ud83c\udfc6" },
];

const UPCOMING_RESERVATIONS: Reservation[] = [
  { id: 1, themeTitle: "\ud3d0\ubcd1\uc6d0\uc758 \uc800\uc8fc", date: "2026-06-02", day: "\ud654", time: "20:00", location: K.branch, horrorLevel: 5, difficulty: 4, status: "upcoming", imageUrl: "/images/horror/%EC%A0%95%EC%A7%80.png" },
  { id: 2, themeTitle: "\ubb18\uc9c0\uc758 \uc800\uc8fc", date: "2026-06-17", day: "\uc218", time: "17:00", location: "\uc2e0\ucd0c\uc810", horrorLevel: 4, difficulty: 4, status: "upcoming", imageUrl: "/images/horror/theme-smoke.png", dday: "D-7" },
];

const PAST_RESERVATIONS: Reservation[] = [
  { id: 3, themeTitle: "\uc880\ube44 \uc544\ud3ec\uce7c\ub9bd\uc2a4", date: "2026-04-30", day: "\ubaa9", time: "16:00", location: K.branch, horrorLevel: 5, difficulty: 4, status: "cleared", clearTime: "47:32", imageUrl: "/images/horror/theme-pumpkin.png", hasReview: true },
  { id: 4, themeTitle: "\uc545\ub9c8\uc758 \uc81c\ub2e8", date: "2026-04-05", day: "\uc77c", time: "21:00", location: "\uc2e0\ucd0c\uc810", horrorLevel: 3, difficulty: 3, status: "failed", imageUrl: "/images/horror/theme-clown.png" },
  { id: 5, themeTitle: "\uc720\ub839 \ud559\uad50", date: "2026-03-22", day: "\uc77c", time: "19:00", location: "\ud64d\ub300\uc810", horrorLevel: 4, difficulty: 4, status: "cleared", clearTime: "52:18", imageUrl: "/images/horror/theme-zebra.png" },
  { id: 6, themeTitle: "\ubc84\ub824\uc9c4 \uc720\ub78c\uc120", date: "2026-02-14", day: "\ud1a0", time: "15:00", location: K.branch, horrorLevel: 4, difficulty: 3, status: "cleared", clearTime: "49:05", imageUrl: "/images/horror/hero-door.png", hasReview: true },
];

function SkullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z" />
    </svg>
  );
}

function MetaIcon({ type }: { type: "date" | "time" | "location" | "gender" | "age" }) {
  const common = "h-3.5 w-3.5 text-[#8c8c8c]";
  if (type === "date") {
    return <svg viewBox="0 0 16 16" className={common} aria-hidden="true"><path fill="currentColor" d="M4 2h1v1h6V2h1v1h1.2c.7 0 1.3.6 1.3 1.3v8.9c0 .7-.6 1.3-1.3 1.3H2.8c-.7 0-1.3-.6-1.3-1.3V4.3C1.5 3.6 2.1 3 2.8 3H4V2Zm9 4H3v7h10V6Z" /></svg>;
  }
  if (type === "time") {
    return <svg viewBox="0 0 16 16" className={common} aria-hidden="true"><path fill="currentColor" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.6 3.2v3l2.2 1.3-.7 1.1-2.9-1.7V4.7h1.4Z" /></svg>;
  }
  if (type === "location") {
    return <svg viewBox="0 0 16 16" className={common} aria-hidden="true"><path fill="currentColor" d="M8 1.5A4.7 4.7 0 0 0 3.3 6.2c0 3.6 4.7 8.3 4.7 8.3s4.7-4.7 4.7-8.3A4.7 4.7 0 0 0 8 1.5Zm0 6.3A1.6 1.6 0 1 1 8 4.6a1.6 1.6 0 0 1 0 3.2Z" /></svg>;
  }
  if (type === "gender") {
    return <svg viewBox="0 0 16 16" className={common} aria-hidden="true"><path fill="currentColor" d="M8 8.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm-5 6.1c.4-2.5 2.3-4.2 5-4.2s4.6 1.7 5 4.2H3Z" /></svg>;
  }
  return <svg viewBox="0 0 16 16" className={common} aria-hidden="true"><path fill="currentColor" d="M3 4.2h10v8.5H3V4.2Zm2-2h1.2v1.2H5V2.2Zm4.8 0H11v1.2H9.8V2.2ZM4.4 6.5v1.2h7.2V6.5H4.4Z" /></svg>;
}

function RatingIcons({ level, type }: { level: number; type: "horror" | "difficulty" }) {
  const Icon = type === "horror" ? SkullIcon : LockIcon;
  const active = type === "horror" ? "text-[#ef4a4a] drop-shadow-[0_0_5px_rgba(239,74,74,0.2)]" : "text-[#e2bd63] drop-shadow-[0_0_5px_rgba(226,189,99,0.18)]";
  return (
    <span className="inline-flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon key={index} className={["h-[15px] w-[15px] transition-all", index < level ? `${active} opacity-100` : "text-[#292929] opacity-75"].join(" ")} />
      ))}
    </span>
  );
}

function ProfileSummaryCard() {
  const [avatarSrc, setAvatarSrc] = useState("/images/%EB%A0%B9%EB%83%A5/ghost-cat-avatar.png");

  return (
    <section className="overflow-hidden rounded-[17px] border border-white/[0.075] bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.055),transparent_36%),linear-gradient(112deg,rgba(24,24,24,0.96),rgba(18,18,18,0.92)_48%,rgba(20,12,12,0.94)),rgba(18,18,18,0.9)] shadow-[0_28px_95px_rgba(0,0,0,0.52),0_0_34px_rgba(204,34,34,0.04)] backdrop-blur-md">
      <div className="grid min-h-[156px] items-stretch lg:grid-cols-[350px_1fr_222px]">
        <div className="flex items-center gap-5 border-b border-white/[0.035] px-7 py-6 lg:border-b-0 lg:border-r lg:border-white/[0.035]">
          <div className="relative h-[98px] w-[98px] shrink-0 overflow-hidden rounded-full border border-white/[0.1] bg-[#1b1b1b] shadow-[inset_0_0_32px_rgba(255,255,255,0.045),0_14px_32px_rgba(0,0,0,0.42)]">
            <Image src={avatarSrc} alt="" fill sizes="98px" className="object-cover p-3" onError={() => setAvatarSrc("/images/%EB%A0%B9%EB%83%A52_%ED%88%AC%EB%AA%85.png")} />
          </div>
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-[30px] font-black leading-none text-[#f5f5f5]">{K.name}</h2>
              <span className="rounded-md border border-[#cc2222]/58 bg-[#101010]/60 px-2.5 py-1 text-xs font-black text-[#ef5353] shadow-[0_0_14px_rgba(204,34,34,0.08)]">{K.branch}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#aaa]">
              <span className="inline-flex items-center gap-1.5"><MetaIcon type="gender" />{K.gender}</span>
              <span className="text-[#4d4d4d]">|</span>
              <span className="inline-flex items-center gap-1.5"><MetaIcon type="age" />{K.age}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.032] sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex min-h-[156px] flex-col items-center justify-center px-4 text-center">
              <p className="mb-3 flex items-center justify-center gap-2 text-[12px] font-black text-[#7d7d7d]"><span className="text-[20px]">{stat.icon}</span>{stat.label}</p>
              <p className={["text-[30px] font-black leading-none tracking-[0.01em]", stat.accent].join(" ")}>{stat.value}</p>
            </div>
          ))}
        </div>

        <RankBadgeCard />
      </div>
    </section>
  );
}

function RankBadgeCard() {
  return (
    <div className="m-4 flex min-h-[126px] flex-col items-center justify-center rounded-[14px] border border-[#cc2222]/58 bg-[radial-gradient(circle_at_50%_0%,rgba(204,34,34,0.2),transparent_66%),linear-gradient(180deg,rgba(204,34,34,0.038),rgba(0,0,0,0.15)),#161111] px-5 text-center shadow-[0_0_30px_rgba(204,34,34,0.12),inset_0_0_22px_rgba(204,34,34,0.026)]">
      <p className="mb-3 text-[11px] font-black tracking-[0.16em] text-[#9c8e8e]">{K.rankLabel}</p>
      <div className="mb-2 flex items-center justify-center gap-2.5">
        <span className="text-[34px] leading-none">{"\ud83d\udd25"}</span>
        <span className="text-[22px] font-black text-[#f5f5f5]">{K.rank}</span>
      </div>
      <p className="text-sm font-black text-[#ef5353]">{K.topRank}</p>
      <p className="mt-1 text-xs font-black text-[#d58a80]">{K.rankRule}</p>
    </div>
  );
}

function ReservationTabs({ active, onChange }: { active: TabKey; onChange: (tab: TabKey) => void }) {
  return (
    <div className="mt-7 flex border-b border-white/[0.085]">
      {TABS.map((tab) => (
        <button key={tab.key} type="button" onClick={() => onChange(tab.key)} className={["relative mr-7 px-0 py-4 text-sm font-black transition-colors", active === tab.key ? "text-[#ef5353]" : "text-[#777] hover:text-[#d8d8d8]"].join(" ")}>
          {tab.label}
          {active === tab.key && <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-[#cc2222] shadow-[0_0_16px_rgba(204,34,34,0.65)]" />}
        </button>
      ))}
    </div>
  );
}

function ReservationSection({ title, count, tone, reservations }: { title: string; count: number; tone: "upcoming" | "past"; reservations: Reservation[] }) {
  return (
    <section className={tone === "upcoming" ? "mt-5" : "mt-8"}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2.5 text-[17px] font-black text-[#f5f5f5]">
          <span className={["h-2 w-2 rounded-full", tone === "upcoming" ? "bg-[#e53939] shadow-[0_0_12px_rgba(229,57,57,0.58)]" : "bg-[#828282]"].join(" ")} />
          {title}
        </h3>
        <span className="rounded-md border border-white/[0.08] bg-[#151515]/88 px-2.5 py-1 text-xs font-bold text-[#8a8a8a]">{count}{"\uac74"}</span>
      </div>
      <div className="overflow-hidden rounded-[13px] border border-white/[0.075] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_20px_58px_rgba(0,0,0,0.38),0_0_28px_rgba(204,34,34,0.025)]">
        {reservations.map((reservation, index) => (
          <ReservationRowCard key={reservation.id} reservation={reservation} isLast={index === reservations.length - 1} />
        ))}
      </div>
    </section>
  );
}

function ReservationRowCard({ reservation, isLast }: { reservation: Reservation; isLast?: boolean }) {
  const status = getStatusStyle(reservation);
  const action = getActionText(reservation);
  return (
    <div className={["grid min-h-[108px] items-center gap-4 px-4.5 py-4 transition-all hover:bg-white/[0.026] hover:shadow-[inset_0_0_28px_rgba(204,34,34,0.025)] md:grid-cols-[138px_1fr_178px_178px_112px_136px]", !isLast ? "border-b border-white/[0.042]" : ""].join(" ")}>
      <div className="relative h-[86px] overflow-hidden rounded-[8px] border border-white/[0.065] bg-[#101010]">
        <Image src={reservation.imageUrl} alt={reservation.themeTitle} fill sizes="138px" className="object-cover brightness-[0.9] contrast-[1.16] saturate-[0.96]" />
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <h4 className="truncate text-[20px] font-black leading-tight text-[#f5f5f5]">{reservation.themeTitle}</h4>
          {reservation.dday && <span className="rounded-md border border-[#d7b46a]/35 bg-[#d7b46a]/10 px-2 py-0.5 text-xs font-black text-[#d7b46a]">{reservation.dday}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#8e8e8e]">
          <span className="inline-flex items-center gap-1.5"><MetaIcon type="date" />{reservation.date} ({reservation.day})</span>
          <span className="inline-flex items-center gap-1.5"><MetaIcon type="time" />{reservation.time}</span>
          <span className="inline-flex items-center gap-1.5"><MetaIcon type="location" />{reservation.location}</span>
          {reservation.clearTime && <span className="font-black text-[#2ecc71]">{K.clearTime} {reservation.clearTime}</span>}
        </div>
      </div>

      <MetricBlock label={K.horror}><RatingIcons level={reservation.horrorLevel} type="horror" /></MetricBlock>
      <MetricBlock label={K.difficulty}><RatingIcons level={reservation.difficulty} type="difficulty" /></MetricBlock>

      <div className="flex justify-start md:justify-center">
        <span className={["inline-flex h-8 min-w-[58px] items-center justify-center rounded-md border px-3 text-xs font-black", status].join(" ")}>{getStatusText(reservation.status)}</span>
      </div>

      <div className="flex justify-start md:justify-end">
        <button type="button" className="h-9 min-w-[104px] rounded-md border border-[#cc2222]/58 bg-[#101010]/55 px-4 text-[13px] font-black text-[#ef5353] transition-all hover:border-[#cc2222]/90 hover:bg-[#cc2222]/10 hover:text-white">
          {action}
        </button>
      </div>
    </div>
  );
}

function MetricBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="hidden border-l border-white/[0.038] pl-5 md:block">
      <p className="mb-2 text-xs font-black text-[#747474]">{label}</p>
      {children}
    </div>
  );
}

function getStatusText(status: ReservationStatus) {
  if (status === "upcoming") return K.scheduled;
  if (status === "cleared") return K.cleared;
  return K.failed;
}

function getStatusStyle(reservation: Reservation) {
  if (reservation.status === "upcoming") return "border-[#cc2222]/52 bg-[#cc2222]/6 text-[#ef5353]";
  if (reservation.status === "cleared") return "border-[#2ecc71]/36 bg-[#2ecc71]/10 text-[#2ecc71]";
  return "border-white/[0.14] bg-white/[0.035] text-[#b8b8b8]";
}

function getActionText(reservation: Reservation) {
  if (reservation.status === "upcoming") return K.change;
  if (reservation.status === "cleared") return reservation.hasReview ? K.reviewView : K.reviewWrite;
  return K.reviewWrite;
}

function ReservationTabContent() {
  return (
    <div>
      <ReservationSection title={K.upcoming} count={UPCOMING_RESERVATIONS.length} tone="upcoming" reservations={UPCOMING_RESERVATIONS} />
      <ReservationSection title={K.past} count={PAST_RESERVATIONS.length} tone="past" reservations={PAST_RESERVATIONS} />
    </div>
  );
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="mt-6 rounded-[14px] border border-white/[0.08] bg-[#171717]/72 px-6 py-16 text-center text-[#777]">
      <p className="text-sm font-bold">{title} {K.nextStep}</p>
    </div>
  );
}

export default function MyPage() {
  const [tab, setTab] = useState<TabKey>("reservation");
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0b] text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_86%_9%,rgba(150,20,20,0.42),transparent_30%),radial-gradient(circle_at_2%_82%,rgba(150,24,24,0.34),transparent_28%),radial-gradient(circle_at_24%_14%,rgba(204,34,34,0.105),transparent_32%),linear-gradient(180deg,#0b0b0b_0%,#101010_46%,#090909_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_82%_13%,rgba(255,70,70,0.55)_0_1px,transparent_1px),radial-gradient(circle_at_9%_78%,rgba(255,60,60,0.5)_0_1px,transparent_1px)] [background-size:34px_34px,46px_46px] blur-[0.5px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 py-8 sm:px-8 lg:py-10">
        <nav className="mb-7 flex items-center gap-2 text-xs font-bold text-[#777]">
          <Link href="/" className="transition-colors hover:text-[#f5f5f5]">{K.home}</Link>
          <span>&gt;</span>
          <span>{K.mypage}</span>
          <span>&gt;</span>
          <span className="text-[#f5f5f5]">{K.reservation}</span>
        </nav>

        <header className="mb-6">
          <p className="mb-3 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">{"// MY PAGE"}</p>
          <h1 className="flex items-center gap-3 text-[38px] font-black leading-tight md:text-[50px]">
            <span className="text-[46px] leading-none">{"\ud83d\udd25"}</span>
            <span><span className="text-[#e63946]">{K.titleLead}</span>{K.titleRest}</span>
          </h1>
          <p className="mt-3 text-sm font-bold text-[#aaa]">{K.subtitle}</p>
        </header>

        <ProfileSummaryCard />
        <ReservationTabs active={tab} onChange={setTab} />

        {tab === "reservation" && <ReservationTabContent />}
        {tab === "achievement" && <PlaceholderTab title={K.achievement} />}
        {tab === "activity" && <PlaceholderTab title={K.activity} />}
      </div>
    </main>
  );
}
