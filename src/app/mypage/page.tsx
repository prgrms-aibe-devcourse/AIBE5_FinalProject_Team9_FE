"use client";

import Image from "next/image";
import Link from "next/link"
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { enrichMyPageReviewsWithThemeImages } from '@/lib/myPageReview';
import { type ReactNode, useEffect, useState } from "react";
import {
  getMyPageAchievements,
  getMyPageMain,
  getMyPageMateParticipations,
  getMyPageMatePosts,
  getMyPageReservations,
  getMyPageReviews,
  getMyPageStats,
  type MyPageAchievement,
  type MyPageProfile,
  type MyPageReservation,
  type MyPageReview,
  type MyPageStats,
} from "@/services/mypageService";
import { getMatePostById } from "@/services/mateService";
import { getThemes } from "@/services/themeService";
import {
  DEFAULT_PROFILE_AVATAR,
  getProfileAvatar,
} from "@/lib/profileAvatar";
import type { MatePost, MyPageMatePost } from "@/types/mate";
import type { Theme } from "@/types/theme";
import { useAuthStore } from "@/stores/authStore";
import { getToken } from "@/lib/token";

type TabKey = "reservation" | "achievement" | "activity";
type ReservationStatus = "upcoming" | "cleared" | "failed";
type TitleStatus = "earned" | "current" | "locked" | "next" | "reference";
type AchievementStatus = "complete" | "progress" | "locked";
type IconName =
  | "ghost"
  | "user"
  | "flame"
  | "group"
  | "lock"
  | "foot"
  | "timer"
  | "heart"
  | "skull"
  | "chick"
  | "key"
  | "search"
  | "gamepad"
  | "crown";
type PostCategory = "모집" | "정보";
type MateActivityStatus = "open" | "joined" | "closed";

type Reservation = {
  id: number;
  themeId?: number;
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

type TitleItem = {
  id: number;
  name: string;
  description?: string;
  status: TitleStatus;
  icon: IconName;
};

type AchievementItem = {
  id: number;
  name: string;
  condition: string;
  status: AchievementStatus;
  icon: IconName;
  progress?: number;
  total?: number;
  progressLabel?: string;
  targetLabel?: string;
  accent?:
    | "lime"
    | "red"
    | "teal"
    | "rose"
    | "deepRed"
    | "amber"
    | "orange"
    | "gold";
};

type ActivityReview = {
  id: number;
  themeId?: number;
  themeTitle: string;
  date: string;
  rating: number;
  horrorLevel: number;
  difficulty: number;
  content: string;
  tags: string[];
  imageUrl: string;
};

type ActivityPost = {
  id: number;
  category: PostCategory;
  date: string;
  title: string;
  comments: number;
};

type ActivityMate = {
  id: number;
  themeTitle: string;
  location: string;
  title: string;
  date: string;
  time: string;
  currentMembers: number;
  totalMembers: number;
  status: MateActivityStatus;
  isAuthor?: boolean;
  imageUrl: string;
};

const K = {
  home: "\ud648",
  mypage: "\ub9c8\uc774\ud398\uc774\uc9c0",
  reservation: "\uc608\uc57d",
  achievement: "\uc5c5\uc801",
  activity: "\ub0b4 \ud65c\ub3d9",
  titleLead: "\ub9c8\uc774",
  titleRest: "\ud398\uc774\uc9c0",
  subtitle:
    "\ub098\uc758 \uc608\uc57d \ud604\ud669\uacfc \uc608\uc57d \uae30\ub85d\uc744 \ud655\uc778\ud558\uc138\uc694.",
  totalPlay: "\ucd1d \ud50c\ub808\uc774",
  successRate: "\uc131\uacf5\ub960",
  bestClear: "\ucd5c\ub2e8 \ud074\ub9ac\uc5b4",
  achievements: "\ud68d\ub4dd \uc5c5\uc801",
  rankLabel: "\ud604\uc7ac \uce6d\ud638",
  upcoming: "\uc608\uc815\ub41c \uc608\uc57d",
  past: "\uc9c0\ub09c \uc608\uc57d",
  horror: "\uacf5\ud3ec\ub3c4",
  difficulty: "\ub09c\uc774\ub3c4",
  scheduled: "\uc608\uc815",
  cleared: "\ud074\ub9ac\uc5b4",
  failed: "\uc2e4\ud328",
  change: "예약 취소",
  reviewView: "\ud6c4\uae30 \ubcf4\uae30",
  reviewWrite: "\ud6c4\uae30 \uc4f0\uae30",
  clearTime: "\ud074\ub9ac\uc5b4 \ud0c0\uc784",
  nextStep:
    "\ud0ed\uc740 \ub2e4\uc74c \ub2e8\uacc4\uc5d0\uc11c \uc815\ub9ac\ub429\ub2c8\ub2e4.",
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "reservation", label: K.reservation },
  { key: "achievement", label: K.achievement },
  { key: "activity", label: K.activity },
];

const DEFAULT_PROFILE: MyPageProfile = {
  nickname: "-",
};

const DEFAULT_STATS: MyPageStats = {
  totalPlayCount: 0,
  successRate: 0,
  bestClearTime: null,
  acquiredAchievementCount: 0,
  totalAchievementCount: 0,
};

const TITLE_DEFINITIONS: Array<{
  id: number;
  name: string;
  description: string;
  icon: IconName;
}> = [
  { id: 1, name: "쫄보", description: "성공률 30% 미만", icon: "ghost" },
  { id: 2, name: "일반인", description: "성공률 30~50%", icon: "user" },
  { id: 3, name: "강심장", description: "성공률 50~70%", icon: "heart" },
  { id: 4, name: "오컬트동호회장", description: "성공률 70~85%", icon: "group" },
  {
    id: 5,
    name: "퇴마사",
    description: "성공률 85% 이상 + 5회 이상 클리어",
    icon: "flame",
  },
];

const ACHIEVEMENT_ICON_BY_CONDITION: Partial<Record<string, IconName>> = {
  TOTAL_PLAY_COUNT: "foot",
  CLEAR_TIME_UNDER: "timer",
  MINIGAME_CLEAR: "gamepad",
  HORROR_LEVEL_SUCCESS: "skull",
  MATE_PARTICIPATE_COUNT: "group",
  SAME_MATE_COUNT: "heart",
};

const ACHIEVEMENT_ACCENTS: NonNullable<AchievementItem["accent"]>[] = [
  "lime",
  "red",
  "teal",
  "rose",
  "deepRed",
  "amber",
  "orange",
  "gold",
];
const ACTIVITY_REVIEW_PREVIEW_COUNT = 5;

const ACHIEVEMENT_META_BY_TOTAL_PLAY_TARGET: Partial<
  Record<number, { icon: IconName; accent: NonNullable<AchievementItem["accent"]> }>
> = {
  1: { icon: "foot", accent: "lime" },
  3: { icon: "chick", accent: "amber" },
  7: { icon: "key", accent: "gold" },
  15: { icon: "search", accent: "teal" },
  30: { icon: "crown", accent: "deepRed" },
};

const ACHIEVEMENT_META_BY_CONDITION: Partial<
  Record<string, { icon: IconName; accent: NonNullable<AchievementItem["accent"]> }>
> = {
  CLEAR_TIME_UNDER: { icon: "timer", accent: "orange" },
  MINIGAME_CLEAR: { icon: "gamepad", accent: "rose" },
  HORROR_LEVEL_SUCCESS: { icon: "skull", accent: "rose" },
  MATE_PARTICIPATE_COUNT: { icon: "group", accent: "red" },
  SAME_MATE_COUNT: { icon: "heart", accent: "red" },
};

function SkullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
      />
    </svg>
  );
}

function ThemeThumbnail({
  src,
  alt,
  width,
  className = "",
  children,
}: {
  src: string;
  alt?: string;
  width?: number;
  className?: string;
  children?: ReactNode;
}) {
  const style: React.CSSProperties = {
    aspectRatio: "16/9",
    width: width ? `${width}px` : "100%",
  };
  return (
    <div
      className={[
        "relative overflow-hidden rounded-lg border border-white/[0.065] bg-[#101010]",
        className,
      ].join(" ")}
      style={style}
    >
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes={width ? `${width}px` : "100vw"}
        className="object-cover object-center brightness-[0.9] contrast-[1.16] saturate-[0.96] transition-transform"
      />
      {children}
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
      />
    </svg>
  );
}

function MetaIcon({
  type,
}: {
  type: "date" | "time" | "location" | "gender" | "age";
}) {
  const common = "h-3.5 w-3.5 text-[#8c8c8c]";
  if (type === "date") {
    return (
      <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 2h1v1h6V2h1v1h1.2c.7 0 1.3.6 1.3 1.3v8.9c0 .7-.6 1.3-1.3 1.3H2.8c-.7 0-1.3-.6-1.3-1.3V4.3C1.5 3.6 2.1 3 2.8 3H4V2Zm9 4H3v7h10V6Z"
        />
      </svg>
    );
  }
  if (type === "time") {
    return (
      <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.6 3.2v3l2.2 1.3-.7 1.1-2.9-1.7V4.7h1.4Z"
        />
      </svg>
    );
  }
  if (type === "location") {
    return (
      <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 1.5A4.7 4.7 0 0 0 3.3 6.2c0 3.6 4.7 8.3 4.7 8.3s4.7-4.7 4.7-8.3A4.7 4.7 0 0 0 8 1.5Zm0 6.3A1.6 1.6 0 1 1 8 4.6a1.6 1.6 0 0 1 0 3.2Z"
        />
      </svg>
    );
  }
  if (type === "gender") {
    return (
      <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 8.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm-5 6.1c.4-2.5 2.3-4.2 5-4.2s4.6 1.7 5 4.2H3Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className={common} aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 4.2h10v8.5H3V4.2Zm2-2h1.2v1.2H5V2.2Zm4.8 0H11v1.2H9.8V2.2ZM4.4 6.5v1.2h7.2V6.5H4.4Z"
      />
    </svg>
  );
}

function ActivityLineIcon({
  type,
  className = "h-4 w-4",
}: {
  type: "review" | "post" | "mate" | "comment" | "users";
  className?: string;
}) {
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.8,
  } as const;
  if (type === "review") {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
        <path {...line} d="M4.5 3.5h11v10.2h-4.2L7.4 17v-3.3H4.5V3.5Z" />
        <path {...line} d="m7.1 8.8 1.6 1.6 4.1-4.1" />
      </svg>
    );
  }
  if (type === "post") {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
        <path {...line} d="M5 3.4h7.2L15 6.2v10.4H5V3.4Z" />
        <path {...line} d="M12.2 3.4v3h2.9M7.5 9.3h5M7.5 12.2h4.2" />
      </svg>
    );
  }
  if (type === "mate" || type === "users") {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
        <path
          {...line}
          d="M7.7 9.4a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.7 16.4c.5-3.4 2.2-5.1 5-5.1s4.5 1.7 5 5.1H2.7ZM13.5 9.2a2.4 2.4 0 1 0 0-4.8M13.2 11.4c2.3.2 3.6 1.8 4.1 5"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path {...line} d="M4 4h12v8.7H8.2L4 16V4Z" />
      <path {...line} d="M7.1 7.5h5.8M7.1 10h3.7" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`별점 ${rating}점`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 16 16"
          className={[
            "h-4 w-4",
            index < rating ? "text-[#e2bd63]" : "text-[#363636]",
          ].join(" ")}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="m8 1.4 1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.4l-3.9 2.1.8-4.4L1.7 6l4.4-.6L8 1.4Z"
          />
        </svg>
      ))}
    </span>
  );
}

function AchievementIcon({
  type,
  className,
}: {
  type: IconName;
  className?: string;
}) {
  const solid = { fill: "currentColor" } as const;

  if (type === "ghost") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M12 3.4c-4 0-7 3-7 7.2v8.9c0 .6.7.9 1.1.5l1.7-1.4 1.7 1.3c.3.3.8.3 1.1 0l1.4-1.2 1.4 1.2c.3.3.8.3 1.1 0l1.7-1.3 1.7 1.4c.4.4 1.1.1 1.1-.5v-8.9c0-4.2-3-7.2-7-7.2Zm-2.6 8.7a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm5.2 0a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm-2.6 3.5c-1.2 0-2.1-.5-2.7-1.2a.8.8 0 0 1 1.2-1c.4.4.8.6 1.5.6s1.1-.2 1.5-.6a.8.8 0 0 1 1.2 1c-.6.7-1.5 1.2-2.7 1.2Z"
        />
      </svg>
    );
  }
  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M12 11.5a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm-7.2 8.2c.7-4.4 3.4-6.6 7.2-6.6s6.5 2.2 7.2 6.6c.1.7-.4 1.2-1.1 1.2H5.9c-.7 0-1.2-.5-1.1-1.2Z"
        />
      </svg>
    );
  }
  if (type === "flame") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M13.3 2.6c1 3.4-.6 5-2.2 6.8-1.1 1.2-2.1 2.5-1.5 4.4.6-1.1 1.5-2.2 3.1-3.3 3.1 1.9 5 4.1 5 6.8 0 3.2-2.4 5.1-5.6 5.1s-5.8-2-5.8-5.7c0-2.5 1.1-4.4 2.7-6.3 1.8-2.3 3.5-4.3 4.3-7.8Z"
        />
      </svg>
    );
  }
  if (type === "group") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M8.8 11.1a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Zm7.6.5a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2ZM2.9 20.2c.6-4.7 2.7-7.1 5.9-7.1s5.3 2.4 5.9 7.1H2.9Zm11.5 0c-.2-2-.8-3.7-1.8-5 .8-.8 1.8-1.2 3-1.2 3 0 4.9 2.1 5.5 6.2h-6.7Z"
        />
      </svg>
    );
  }
  if (type === "lock") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M7.1 9.5V7.6a4.9 4.9 0 0 1 9.8 0v1.9h.8c1.2 0 2.1.9 2.1 2.1v7.1c0 1.2-.9 2.1-2.1 2.1H6.3c-1.2 0-2.1-.9-2.1-2.1v-7.1c0-1.2.9-2.1 2.1-2.1h.8Zm2.4 0h5V7.6a2.5 2.5 0 0 0-5 0v1.9Zm2.5 4.1c-.8 0-1.4.6-1.4 1.3 0 .5.3.9.7 1.2v1.5h1.4v-1.5c.4-.3.7-.7.7-1.2 0-.7-.6-1.3-1.4-1.3Z"
        />
      </svg>
    );
  }
  if (type === "foot") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M7.5 4.2c1.7.1 2.7 1.7 2.5 3.9-.2 2.6-1.6 5.2-3.5 5.1-1.6-.1-2.5-1.7-2.2-4 .2-2.8 1.4-5.1 3.2-5Zm8.7 3.3c1.6.1 2.5 1.5 2.3 3.5-.2 2.4-1.5 4.7-3.3 4.5-1.4-.1-2.3-1.5-2.1-3.6.3-2.5 1.4-4.5 3.1-4.4ZM6.8 15.6c1.8 0 3.1 1.2 3.1 2.8s-1.3 2.9-3.1 2.9-3-1.2-3-2.9 1.3-2.8 3-2.8Zm8.8 1.6c1.5 0 2.8 1 2.8 2.3s-1.3 2.3-2.8 2.3-2.8-1-2.8-2.3 1.3-2.3 2.8-2.3Z"
        />
      </svg>
    );
  }
  if (type === "timer") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M9 2.6h6v2H9v-2Zm2 4V4.3h2v2.3a7.6 7.6 0 1 1-2 0Zm1 13.4a5.4 5.4 0 1 0 0-10.8 5.4 5.4 0 0 0 0 10.8Zm-1-8.6h2v3.3l2.5 1.5-1 1.7-3.5-2.1v-4.4Zm5.5-3.9 1.7-1.7 1.4 1.4-1.7 1.7-1.4-1.4Z"
        />
      </svg>
    );
  }
  if (type === "heart") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M12 21s-8.3-4.8-8.3-11.1c0-3 2-5.1 4.7-5.1 1.6 0 2.8.8 3.6 2 .8-1.2 2-2 3.6-2 2.7 0 4.7 2.1 4.7 5.1C20.3 16.2 12 21 12 21Z"
        />
      </svg>
    );
  }
  if (type === "skull") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M12 3.2c-4.6 0-7.4 2.9-7.4 7.1 0 2.5 1.1 4.5 3 5.8v2.6c0 1.3 1 2.3 2.3 2.3h4.2c1.3 0 2.3-1 2.3-2.3v-2.6c1.9-1.3 3-3.3 3-5.8 0-4.2-2.8-7.1-7.4-7.1Zm-2.8 9.9a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm5.6 0a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM12 14.2c.5.8.9 1.5.9 1.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.4.4-1.1.9-1.9Zm-2.5 4h1.2v1.5H9.5v-1.5Zm2 0h1.2v1.5h-1.2v-1.5Zm2 0h1.2v1.5h-1.2v-1.5Z"
        />
      </svg>
    );
  }
  if (type === "chick") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill="#f6c34a"
          d="M10.3 4.6 8.8 2.8l1.5-1 1.3 2.3-1.3.5Zm3.4-.5L15 1.9l1.5 1-1.6 1.8-1.2-.6ZM12 4.4c-4 0-6.8 3-6.8 7.1v2.6c0 4 2.8 6.9 6.8 6.9s6.8-2.9 6.8-6.9v-2.6c0-4.1-2.8-7.1-6.8-7.1Z"
        />
        <circle fill="#2b1b10" cx="9.6" cy="11.4" r="0.9" />
        <circle fill="#2b1b10" cx="14.4" cy="11.4" r="0.9" />
        <path fill="#f28f2c" d="M10.7 13.1h2.6L12 15l-1.3-1.9Z" />
        <path
          fill="#d99a2e"
          fillOpacity="0.55"
          d="M8.4 15.8c.8 1.2 2 1.8 3.6 1.8s2.8-.6 3.6-1.8c-.6 2.1-1.9 3.2-3.6 3.2s-3-1.1-3.6-3.2Z"
        />
        <path
          fill="#8a5a18"
          d="M9.2 20.4h1.5v1.5H9.2v-1.5Zm4.1 0h1.5v1.5h-1.5v-1.5Z"
        />
      </svg>
    );
  }
  if (type === "key") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M15.6 3.7a5.4 5.4 0 0 0-5.1 7.1l-7.7 7.7v2.7h3.1v-2h2v-2h2v-2h1.3l1.3-1.3a5.4 5.4 0 1 0 3.1-10.2Zm0 3a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z"
        />
      </svg>
    );
  }
  if (type === "gamepad") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M7.4 7.1h9.2c2.8 0 4.8 2 5.2 5.1l.4 3.2c.3 2.3-.9 4-2.8 4-1.1 0-1.9-.5-2.7-1.5l-1.1-1.4H8.4l-1.1 1.4c-.8 1-1.6 1.5-2.7 1.5-1.9 0-3.1-1.7-2.8-4l.4-3.2c.4-3.1 2.4-5.1 5.2-5.1Zm.4 3.2H5.9v1.9H4v1.8h1.9v1.9h1.9V14h1.9v-1.8H7.8v-1.9Zm8 4.7a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm3.1-3.1a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        />
      </svg>
    );
  }
  if (type === "search") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M10.4 3.8a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 2.4a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Zm5.1 9 5 5-1.8 1.8-5-5 1.8-1.8Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        {...solid}
        d="m3.6 8.2 4.8 3.2 3.6-7.2 3.6 7.2 4.8-3.2-1.5 10.3H5.1L3.6 8.2Zm2.8 11.6h11.2v1.7H6.4v-1.7Z"
      />
    </svg>
  );
}

function TitleSymbol({
  type,
  className,
}: {
  type: IconName;
  className?: string;
}) {
  const solid = { fill: "currentColor" } as const;
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.85,
  } as const;

  if (type === "ghost") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M16 4.5c-5.4 0-9.2 4-9.2 9.6v10.7c0 .7.8 1.1 1.4.7l2.2-1.7 2.1 1.6c.4.3.9.3 1.3 0l2.2-1.7 2.2 1.7c.4.3.9.3 1.3 0l2.1-1.6 2.2 1.7c.6.4 1.4 0 1.4-.7V14.1c0-5.6-3.8-9.6-9.2-9.6Z"
        />
        <path
          fill="#0f0f0f"
          d="M11.8 15.4c.9 0 1.6-.8 1.6-1.8s-.7-1.8-1.6-1.8-1.6.8-1.6 1.8.7 1.8 1.6 1.8Zm8.4 0c.9 0 1.6-.8 1.6-1.8s-.7-1.8-1.6-1.8-1.6.8-1.6 1.8.7 1.8 1.6 1.8Z"
        />
        <path {...line} d="M12.7 20.5c1.7-1.5 4.9-1.5 6.6 0" />
      </svg>
    );
  }
  if (type === "user") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M16 15.3a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Zm-9.7 11.1c1-6 4.5-9 9.7-9s8.7 3 9.7 9c.1.8-.5 1.4-1.3 1.4H7.6c-.8 0-1.4-.6-1.3-1.4Z"
        />
      </svg>
    );
  }
  if (type === "flame") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M17.3 2.8c1.4 4.8-.5 7.2-2.7 9.9-1.3 1.6-2.5 3.2-2.3 5.5.9-1.8 2.2-3.1 4.3-4.6 4.5 2.8 7.2 5.9 7.2 9.3 0 4.1-3.1 6.8-7.8 6.8s-7.9-2.8-7.9-7.5c0-3.5 1.8-6.2 4.1-8.8 2.4-2.9 4.8-5.7 5.1-10.6Z"
        />
        <path
          fill="#0f0f0f"
          fillOpacity="0.36"
          d="M16.1 18.1c2.2 1.7 3.3 3.4 3.3 5.1 0 2.2-1.4 3.4-3.4 3.4-2.2 0-3.6-1.4-3.6-3.6 0-1.7 1.1-3.3 3.7-4.9Z"
        />
      </svg>
    );
  }
  if (type === "group") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M11.7 14.2a4.7 4.7 0 1 0 0-9.4 4.7 4.7 0 0 0 0 9.4Zm9.5.7a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6ZM4.5 27c.8-6 3.3-9.1 7.2-9.1s6.4 3.1 7.2 9.1H4.5Zm14.2 0c-.2-2.5-.9-4.6-2.2-6.2 1-.9 2.2-1.4 3.7-1.4 3.7 0 6 2.6 6.8 7.6h-8.3Z"
        />
        <path
          {...line}
          d="m23.8 4.9 1.2-2 1.2 2 2.2.5-1.6 1.6.2 2.3-2-.9-2 .9.2-2.3-1.6-1.6 2.2-.5ZM15.9 5.3l1.1-2 1.1 2"
        />
      </svg>
    );
  }
  if (type === "heart") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M16 27.8S5.2 21.3 5.2 12.9c0-4 2.7-6.8 6.3-6.8 2 0 3.7 1 4.5 2.6.8-1.6 2.5-2.6 4.5-2.6 3.6 0 6.3 2.8 6.3 6.8 0 8.4-10.8 14.9-10.8 14.9Z"
        />
      </svg>
    );
  }
  if (type === "lock") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          {...solid}
          d="M10.2 13.8V10a5.8 5.8 0 0 1 11.6 0v3.8h1.1c1.3 0 2.3 1 2.3 2.3v8.7c0 1.3-1 2.3-2.3 2.3H9.1c-1.3 0-2.3-1-2.3-2.3v-8.7c0-1.3 1-2.3 2.3-2.3h1.1Zm3.1 0h5.4V10a2.7 2.7 0 0 0-5.4 0v3.8Zm4.1 6.3a1.4 1.4 0 1 0-2.8 0c0 .6.4 1.1.9 1.3v2.1h1v-2.1c.5-.2.9-.7.9-1.3Z"
        />
      </svg>
    );
  }
  if (type === "crown") {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          {...solid}
          d="m4.8 10.1 6.1 4.1L16 5.1l5.1 9.1 6.1-4.1-2.1 14.6H6.9L4.8 10.1Zm3.4 16.5h15.6v2.2H8.2v-2.2Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path {...line} d="M16 3.7v24.6M7.5 10.2h17M9.8 17.1h12.4" />
      <path
        {...solid}
        d="M16 6.9 20 12l-4 5.1-4-5.1 4-5.1Zm-7.2 11 3 3.8-3 3.8-3-3.8 3-3.8Zm14.4 0 3 3.8-3 3.8-3-3.8 3-3.8Z"
      />
    </svg>
  );
}

function PageTitleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true" className={className}>
      <defs>
        <linearGradient
          id="mypage-flame-gradient"
          x1="13"
          y1="6"
          x2="38"
          y2="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff6b6b" />
          <stop offset="0.52" stopColor="#e53939" />
          <stop offset="1" stopColor="#9f1717" />
        </linearGradient>
      </defs>
      <path
        fill="url(#mypage-flame-gradient)"
        d="M28.2 5.8c2.1 7.5-1 11.2-4.4 15.3-2 2.4-3.7 4.7-3.4 8 1.4-2.8 3.5-4.9 6.8-7.2 6.9 4.3 11 9 11 14.2 0 6.5-4.9 10.7-12.2 10.7-7.5 0-12.5-4.4-12.5-11.7 0-5.5 2.8-9.8 6.4-13.9 3.7-4.4 7.5-8.8 8.3-15.4Z"
      />
      <path
        fill="#0b0b0b"
        fillOpacity="0.42"
        d="M26.3 28c3.4 2.7 5.1 5.3 5.1 8 0 3.3-2.1 5.3-5.4 5.3-3.4 0-5.6-2.2-5.6-5.7 0-2.7 1.7-5.1 5.9-7.6Z"
      />
    </svg>
  );
}

function RatingIcons({
  level,
  type,
}: {
  level: number;
  type: "horror" | "difficulty";
}) {
  const Icon = type === "horror" ? SkullIcon : LockIcon;
  const active =
    type === "horror"
      ? "text-[#ef4a4a] drop-shadow-[0_0_5px_rgba(239,74,74,0.2)]"
      : "text-[#e2bd63] drop-shadow-[0_0_5px_rgba(226,189,99,0.18)]";
  return (
    <span className="inline-flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          className={[
            "h-[15px] w-[15px] transition-all",
            index < level
              ? `${active} opacity-100`
              : "text-[#292929] opacity-75",
          ].join(" ")}
        />
      ))}
    </span>
  );
}

const THEME_PLACEHOLDER_IMAGE = "/images/theme-placeholder.png";

function normalizeCompareText(value?: string | null) {
  return (value ?? "").trim().toLowerCase();
}

function getDateParts(value?: string) {
  if (!value) return { date: "-", day: "-" };

  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  const date = year && month && day ? new Date(year, month - 1, day) : new Date(value);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  if (Number.isNaN(date.getTime())) {
    return { date: value.slice(0, 10), day: "-" };
  }

  return {
    date: value.slice(0, 10),
    day: days[date.getDay()],
  };
}

function formatReservationTime(value?: string) {
  if (!value) return "-";
  return value.includes("T") ? value.split("T")[1].slice(0, 5) : value.slice(0, 5);
}

function formatClearTime(value?: number | null) {
  if (value === undefined || value === null) return undefined;
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getDDayLabel(value?: string) {
  if (!value) return undefined;

  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return undefined;

  const target = new Date(year, month - 1, day);
  const diff = Math.ceil((target.getTime() - todayOnly.getTime()) / 86400000);
  if (diff < 0) return undefined;
  if (diff === 0) return "D-Day";
  return `D-${diff}`;
}

function findThemeForReservation(reservation: MyPageReservation, themes: Theme[]) {
  const reservationTitle = normalizeCompareText(reservation.themeName);
  const reservationBranch = normalizeCompareText(reservation.branchName);

  const exactBranchMatch = themes.find((theme) => {
    const sameTitle = normalizeCompareText(theme.title) === reservationTitle;
    const sameBranch =
      !reservationBranch ||
      normalizeCompareText(theme.branchName) === reservationBranch ||
      normalizeCompareText(theme.locationName) === reservationBranch;

    return sameTitle && sameBranch;
  });

  return exactBranchMatch ?? themes.find((theme) => normalizeCompareText(theme.title) === reservationTitle);
}

function mapReservationToUi(
  reservation: MyPageReservation,
  type: "UPCOMING" | "PAST",
  theme?: Theme,
  reviewedReservationIds?: Set<number>,
): Reservation {
  const dateParts = getDateParts(reservation.reservationDate);
  const status: ReservationStatus =
    type === "UPCOMING" ? "upcoming" : reservation.isCleared ? "cleared" : "failed";
  const apiReservation = reservation as MyPageReservation & {
    themeId?: number;
    thumbnailUrl?: string;
    imageUrl?: string;
    horrorLevel?: number;
    difficulty?: number;
  };

  return {
    id: reservation.reservationId,
    themeId: apiReservation.themeId ?? theme?.id,
    themeTitle: reservation.themeName || "예약 테마",
    date: dateParts.date,
    day: dateParts.day,
    time: formatReservationTime(reservation.reservationTime),
    location: reservation.branchName || "-",
    horrorLevel: apiReservation.horrorLevel ?? theme?.horrorLevel ?? 0,
    difficulty: apiReservation.difficulty ?? theme?.difficulty ?? 0,
    status,
    clearTime: status === "cleared" ? formatClearTime(reservation.clearTime) : undefined,
    dday: type === "UPCOMING" ? getDDayLabel(reservation.reservationDate) : undefined,
    imageUrl: apiReservation.thumbnailUrl || apiReservation.imageUrl || theme?.imageUrl || THEME_PLACEHOLDER_IMAGE,
    hasReview:
      reservation.hasReview ||
      reviewedReservationIds?.has(reservation.reservationId) ||
      false,
  };
}

function formatBestClearTime(value?: number | null) {
  if (value === undefined || value === null) return "-";
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatProfileGender(value?: string) {
  if (!value) return "성별 미공개";
  const upper = value.toUpperCase();
  if (upper === "FEMALE" || value === "여자") return "성별 여자";
  if (upper === "MALE" || value === "남자") return "성별 남자";
  return `성별 ${value}`;
}

function formatProfileAge(value?: number) {
  return value ? `나이 ${value}` : "나이 미공개";
}

function formatDate(value?: string) {
  if (!value) return "-";
  return value.includes("T") ? value.split("T")[0] : value.slice(0, 10);
}

function formatTime(value?: string) {
  if (!value) return "-";
  const timePart = value.includes("T") ? value.split("T")[1] : value;
  return timePart.slice(0, 5) || "-";
}

function parseActivityTags(value?: string) {
  return (value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getStatsItems(stats: MyPageStats, isLoading = false) {
  if (isLoading) {
    return [
      { label: K.totalPlay, value: "-", accent: "text-[#f5f5f5]" },
      { label: K.successRate, value: "-", accent: "text-[#2ecc71]" },
      { label: K.bestClear, value: "-", accent: "text-[#3498db]" },
      { label: K.achievements, value: "-", accent: "text-[#b66ae0]" },
    ];
  }

  return [
    { label: K.totalPlay, value: String(stats.totalPlayCount), accent: "text-[#f5f5f5]" },
    { label: K.successRate, value: `${stats.successRate}%`, accent: "text-[#2ecc71]" },
    { label: K.bestClear, value: formatBestClearTime(stats.bestClearTime), accent: "text-[#3498db]" },
    {
      label: K.achievements,
      value: stats.totalAchievementCount
        ? `${stats.acquiredAchievementCount}/${stats.totalAchievementCount}`
        : String(stats.acquiredAchievementCount),
      accent: "text-[#b66ae0]",
    },
  ];
}

function getTitleDefinition(name?: string | null) {
  const targetName = normalizeCompareText(name);
  if (!targetName) return undefined;

  return TITLE_DEFINITIONS.find(
    (title) => normalizeCompareText(title.name) === targetName,
  );
}

function getCurrentTitleItem(profile: MyPageProfile): TitleItem {
  const definition = getTitleDefinition(profile.titleName);
  const titleName = profile.titleName || "칭호 없음";

  return {
    id: definition?.id ?? 0,
    name: titleName,
    description: definition?.description,
    status: profile.titleName ? "current" : "locked",
    icon: definition?.icon ?? (profile.titleName ? "crown" : "lock"),
  };
}

function getTitleItems(profile: MyPageProfile): TitleItem[] {
  const currentName = normalizeCompareText(profile.titleName);

  return TITLE_DEFINITIONS.map((title) => ({
    ...title,
    status: normalizeCompareText(title.name) === currentName ? "current" : "reference",
  }));
}

function getAchievementPresentationMeta(
  achievement: MyPageAchievement,
  index: number,
): Pick<AchievementItem, "icon" | "accent"> {
  const total = achievement.conditionValue ?? achievement.target ?? undefined;
  const byTotalPlay =
    achievement.conditionType === "TOTAL_PLAY_COUNT" && typeof total === "number"
      ? ACHIEVEMENT_META_BY_TOTAL_PLAY_TARGET[total]
      : undefined;
  const byCondition = ACHIEVEMENT_META_BY_CONDITION[achievement.conditionType];

  return {
    icon:
      byTotalPlay?.icon ??
      byCondition?.icon ??
      ACHIEVEMENT_ICON_BY_CONDITION[achievement.conditionType] ??
      "key",
    accent:
      byTotalPlay?.accent ??
      byCondition?.accent ??
      ACHIEVEMENT_ACCENTS[index % ACHIEVEMENT_ACCENTS.length],
  };
}

function getAchievementProgressLabels(
  achievement: MyPageAchievement,
  stats?: MyPageStats,
): Pick<AchievementItem, "progress" | "total" | "progressLabel" | "targetLabel"> {
  const total = achievement.conditionValue ?? achievement.target ?? undefined;

  if (achievement.conditionType === "TOTAL_PLAY_COUNT" && typeof total === "number") {
    const current = Math.min(stats?.totalPlayCount ?? 0, total);
    return {
      progress: current,
      total,
      progressLabel: `${current}/${total}`,
      targetLabel: `목표 ${total}회`,
    };
  }

  if (achievement.conditionType === "CLEAR_TIME_UNDER" && typeof total === "number") {
    const targetLabel = `목표 ${total}분 이내`;

    return {
      total,
      progressLabel: stats?.bestClearTime
        ? `최고 기록 ${formatBestClearTime(stats.bestClearTime)} · ${targetLabel}`
        : undefined,
      targetLabel,
    };
  }

  if (achievement.conditionType === "MINIGAME_CLEAR") {
    return {
      targetLabel: "1회성 업적",
    };
  }

  return {
    total,
    targetLabel: typeof total === "number" ? `목표 ${total}` : undefined,
  };
}

function mapAchievementToUi(
  achievement: MyPageAchievement,
  index: number,
  stats?: MyPageStats,
): AchievementItem {
  const acquired =
    achievement.acquired ??
    achievement.isAcquired ??
    achievement.achieved ??
    achievement.completed ??
    achievement.unlocked ??
    false;
  const apiProgress =
    achievement.progress ??
    achievement.current ??
    achievement.currentValue ??
    undefined;
  const progressMeta = getAchievementProgressLabels(achievement, stats);
  const hasApiProgress =
    typeof apiProgress === "number" &&
    typeof progressMeta.total === "number" &&
    progressMeta.total > 0;
  const displayedProgress = hasApiProgress ? apiProgress : progressMeta.progress;
  const total = progressMeta.total;
  const totalPlayCompleted =
    achievement.conditionType === "TOTAL_PLAY_COUNT" &&
    typeof displayedProgress === "number" &&
    typeof total === "number" &&
    displayedProgress >= total;
  const clearTimeCompleted =
    achievement.conditionType === "CLEAR_TIME_UNDER" &&
    typeof stats?.bestClearTime === "number" &&
    typeof total === "number" &&
    stats.bestClearTime <= total * 60;
  const completed = acquired || totalPlayCompleted || clearTimeCompleted;
  const presentation = getAchievementPresentationMeta(achievement, index);

  return {
    id: achievement.id ?? achievement.achievementId ?? index,
    name: achievement.name || "업적",
    condition: achievement.description || achievement.conditionType || "업적 조건 정보가 없습니다.",
    status: completed ? "complete" : "progress",
    icon: presentation.icon,
    progress: displayedProgress,
    total,
    progressLabel: hasApiProgress
      ? `${apiProgress}/${progressMeta.total}`
      : progressMeta.progressLabel,
    targetLabel: progressMeta.targetLabel,
    accent: presentation.accent,
  };
}

function mapReviewToActivity(review: MyPageReview): ActivityReview {
  return {
    id: review.reviewId,
      themeId: review.themeId,
    themeTitle: review.themeTitle || "후기 테마",
    date: formatDate(review.visitedAt ?? review.createdAt),
    rating: review.rating,
    horrorLevel: review.horrorRating,
    difficulty: review.difficultyRating,
    content: review.content,
    tags: parseActivityTags(review.tags),
    imageUrl: review.imageUrls[0] || THEME_PLACEHOLDER_IMAGE,
  };
}

function mapMatePostToActivityPost(post: MyPageMatePost): ActivityPost {
  return {
    id: post.matePostId,
    category: "모집",
    date: formatDate(post.createdAt),
    title: post.title || "메이트 모집글",
    comments: 0,
  };
}

function mapMatePostToActivityMate(post: MyPageMatePost, isAuthor = false): ActivityMate {
  const isClosed = ["CLOSED", "MATCHED", "DELETED"].includes(post.status);

  return {
    id: post.matePostId,
    themeTitle: post.themeTitle || (isAuthor ? "내 모집" : "참여 모집"),
    location: post.location || "-",
    title: post.title || "메이트 모집",
    date: formatDate(post.meetingTime || post.createdAt),
    time: formatTime(post.meetingTime),
    currentMembers: post.currentPeople,
    totalMembers: post.maxPeople,
    status: isAuthor ? (isClosed ? "closed" : "open") : "joined",
    isAuthor,
    imageUrl: post.imageUrl || THEME_PLACEHOLDER_IMAGE,
  };
}

function mapMateDetailToActivityMate(post: MatePost): ActivityMate {
  const isClosed = ["CLOSED", "MATCHED", "DELETED"].includes(post.status);
  const location = [post.storeName, post.branchName, post.region].filter(Boolean).join(" · ");

  return {
    id: post.id,
    themeTitle: post.themeTitle || "참여 모집",
    location: location || "-",
    title: post.title || "메이트 모집",
    date: formatDate(post.meetingTime || post.createdAt),
    time: formatTime(post.meetingTime),
    currentMembers: post.currentPeople,
    totalMembers: post.maxPeople,
    status: isClosed ? "closed" : "joined",
    imageUrl: post.imageUrl || THEME_PLACEHOLDER_IMAGE,
  };
}

function ProfileSummaryCard({
  profile,
  stats,
  isLoading,
  errorMessage,
}: {
  profile: MyPageProfile;
  stats: MyPageStats;
  isLoading: boolean;
  errorMessage: string;
}) {
  const [avatarSrc, setAvatarSrc] = useState(
    getProfileAvatar(profile.profileCharacterImageUrl),
  );
  const statsItems = getStatsItems(stats, isLoading);

  useEffect(() => {
    setAvatarSrc(
      getProfileAvatar(profile.profileCharacterImageUrl),
    );
  }, [profile.profileCharacterImageUrl]);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.075] bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.05),transparent_36%),linear-gradient(112deg,rgba(23,23,23,0.96),rgba(17,17,17,0.92)_48%,rgba(20,12,12,0.94)),rgba(18,18,18,0.9)] shadow-[0_28px_95px_rgba(0,0,0,0.48),0_0_34px_rgba(204,34,34,0.035)] backdrop-blur-md">
      <div className="grid min-h-[156px] items-stretch lg:grid-cols-[350px_1fr_286px]">
        <div className="flex items-center gap-5 border-b border-white/[0.035] px-7 py-6 lg:border-b-0 lg:border-r lg:border-white/[0.035]">
          <div className="relative h-[98px] w-[98px] shrink-0 overflow-hidden rounded-full border border-white/[0.1] bg-black shadow-[inset_0_0_32px_rgba(255,255,255,0.045),0_14px_32px_rgba(0,0,0,0.42)]">
            <Image
              src={avatarSrc}
              alt=""
              fill
              sizes="98px"
              className="object-cover p-3"
              onError={() => setAvatarSrc(DEFAULT_PROFILE_AVATAR)}
            />
          </div>
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-[30px] font-black leading-none text-[#f5f5f5]">
                {isLoading ? "불러오는 중" : profile.nickname || "-"}
              </h2>
              <span className="rounded-md border border-[#cc2222]/58 bg-[#101010]/60 px-2.5 py-1 text-xs font-black text-[#ef5353] shadow-[0_0_14px_rgba(204,34,34,0.08)]">
                {profile.titleName || "칭호 없음"}
              </span>
            </div>
            {errorMessage && (
              <p className="mb-2 text-xs font-bold text-[#ef5353]">{errorMessage}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#aaa]">
              <span className="inline-flex items-center gap-1.5">
                <MetaIcon type="gender" />
                {formatProfileGender(profile.gender)}
              </span>
              <span className="text-[#4d4d4d]">|</span>
              <span className="inline-flex items-center gap-1.5">
                <MetaIcon type="age" />
                {formatProfileAge(profile.age)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.032] sm:grid-cols-4 sm:divide-y-0">
          {statsItems.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-[132px] flex-col items-center justify-center px-4 text-center sm:min-h-[156px]"
            >
              <p className="mb-2.5 text-[11px] font-black text-[#6f6f6f]">
                {stat.label}
              </p>
              <p
                className={[
                  "text-[28px] font-black leading-none tracking-[0.01em] opacity-90",
                  stat.accent,
                ].join(" ")}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <RankBadgeCard profile={profile} />
      </div>
    </section>
  );
}

function RankBadgeCard({
  profile,
}: {
  profile: MyPageProfile;
}) {
  const title = getCurrentTitleItem(profile);
  return (
    <div className="m-4 flex min-h-[132px] flex-col items-center justify-center rounded-xl border border-[#cc2222]/68 bg-[radial-gradient(circle_at_50%_0%,rgba(229,57,57,0.24),transparent_66%),linear-gradient(180deg,rgba(204,34,34,0.065),rgba(0,0,0,0.16)),#171010] px-5 text-center shadow-[0_0_34px_rgba(204,34,34,0.16),inset_0_0_24px_rgba(204,34,34,0.04)]">
      <p className="mb-3 text-[11px] font-black tracking-[0.16em] text-[#c09a9a]">
        {K.rankLabel}
      </p>
      <div className="mb-2 flex items-center justify-center gap-2">
        <TitleSymbol
          type={title.icon}
          className="h-9 w-9 shrink-0 text-[#ef5353] drop-shadow-[0_0_16px_rgba(239,83,83,0.2)]"
        />
        <span className="whitespace-nowrap text-[21px] font-black text-[#f5f5f5]">
          {title.name}
        </span>
      </div>
      {profile.titleName && (
        <p className="text-sm font-black text-[#ef5353]">현재 장착 중인 칭호</p>
      )}
    </div>
  );
}

function ReservationTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <div className="mt-7 flex border-b border-white/[0.085]">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={[
            "relative mr-7 px-0 py-4 text-sm font-black transition-colors",
            active === tab.key
              ? "text-[#ef5353]"
              : "text-[#777] hover:text-[#d8d8d8]",
          ].join(" ")}
        >
          {tab.label}
          {active === tab.key && (
            <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-[#cc2222] shadow-[0_0_16px_rgba(204,34,34,0.65)]" />
          )}
        </button>
      ))}
    </div>
  );
}

function ReservationSection({
  title,
  count,
  tone,
  reservations,
  emptyMessage,
}: {
  title: string;
  count: number;
  tone: "upcoming" | "past";
  reservations: Reservation[];
  emptyMessage: string;
}) {
  return (
    <section className={tone === "upcoming" ? "mt-5" : "mt-8"}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2.5 text-[17px] font-black text-[#f5f5f5]">
          <span
            className={[
              "h-2 w-2 rounded-full",
              tone === "upcoming"
                ? "bg-[#e53939] shadow-[0_0_12px_rgba(229,57,57,0.58)]"
                : "bg-[#828282]",
            ].join(" ")}
          />
          {title}
        </h3>
        <span className="rounded-md border border-white/[0.08] bg-[#151515]/88 px-2.5 py-1 text-xs font-bold text-[#8a8a8a]">
          {count}
          {"\uac74"}
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/[0.075] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_20px_58px_rgba(0,0,0,0.38),0_0_28px_rgba(204,34,34,0.025)]">
        {reservations.length > 0 ? (
          reservations.map((reservation, index) => (
            <ReservationRowCard
              key={reservation.id}
              reservation={reservation}
              isLast={index === reservations.length - 1}
            />
          ))
        ) : (
          <ReservationStateCard message={emptyMessage} />
        )}
      </div>
    </section>
  );
}

function ReservationStateCard({ message }: { message: string }) {
  return (
    <div className="flex min-h-[108px] items-center justify-center px-5 py-8 text-center">
      <p className="text-sm font-bold text-[#858585]">{message}</p>
    </div>
  );
}

function ReservationCountSummary({
  upcomingCount,
  pastCount,
}: {
  upcomingCount: number;
  pastCount: number;
}) {
  const items = [
    { label: "전체", value: upcomingCount + pastCount },
    { label: K.upcoming, value: upcomingCount },
    { label: K.past, value: pastCount },
  ];

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex h-8 items-center gap-2 rounded-lg border border-white/[0.08] bg-[#151515]/72 px-3 text-xs font-black text-[#9a9a9a]"
        >
          {item.label}
          <span className="text-[#ef5353]">{item.value}건</span>
        </span>
      ))}
    </div>
  );
}

function ReservationRowCard({
  reservation,
  isLast,
}: {
  reservation: Reservation;
  isLast?: boolean;
}) {
    const [confirming, setConfirming] = useState(false);
    const [cancelled, setCancelled] = useState(false);
  const status = getStatusStyle(reservation);
  const action = getActionText(reservation);
  const showStatusBadge = reservation.status !== "upcoming";
    const router = useRouter();

    const handleCancel = async () => {
        try {
            await axiosInstance.post(`/api/reservations/${reservation.id}/cancel`);
            setCancelled(true);
        } catch {
            alert("예약 취소에 실패했습니다.");
        }
    };

  return (
      <>
      {/* 취소 확인 모달 */}
      {confirming && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-[340px] rounded-2xl border border-white/[0.08] bg-[#171717] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.6)]">
                  <p className="mb-1 text-[11px] font-black tracking-[0.2em] text-[#cc2222]"></p>
                  <h3 className="mb-2 text-[18px] font-black text-[#f5f5f5]">예약을 취소하시겠습니까?</h3>
                  <p className="mb-6 text-sm font-bold text-[#888]">취소된 예약은 복구할 수 없습니다.</p>
                  <div className="flex gap-2">
                      <button
                          type="button"
                          onClick={() => setConfirming(false)}
                          className="flex-1 h-10 rounded-xl border border-white/[0.1] text-sm font-black text-[#888] transition-all hover:border-white/20 hover:text-[#f5f5f5]"
                      >
                          취소
                      </button>
                      <button
                          type="button"
                          onClick={() => { setConfirming(false); handleCancel(); }}
                          className="flex-1 h-10 rounded-xl border border-[#cc2222]/60 bg-[#cc2222]/12 text-sm font-black text-[#ef5353] transition-all hover:bg-[#cc2222]/24 hover:text-white"
                      >
                          확인
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* 취소 완료 모달 */}
      {cancelled && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-[340px] rounded-2xl border border-white/[0.08] bg-[#171717] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.6)]">
                  <p className="mb-1 text-[11px] font-black tracking-[0.2em] text-[#2ecc71]"></p>
                  <h3 className="mb-2 text-[18px] font-black text-[#f5f5f5]">예약이 취소되었습니다.</h3>
                  <p className="mb-6 text-sm font-bold text-[#888]">환불은 영업일 기준 3~5일 내 처리됩니다.</p>
                  <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="w-full h-10 rounded-xl border border-white/[0.1] text-sm font-black text-[#f5f5f5] transition-all hover:border-white/20"
                  >
                      확인
                  </button>
              </div>
          </div>
      )}
    <div
      className={[
        "grid min-h-[108px] items-center gap-4 px-4 py-4 transition-all hover:bg-white/[0.026] hover:shadow-[inset_0_0_28px_rgba(204,34,34,0.025)] sm:grid-cols-[150px_1fr] md:grid-cols-[150px_1fr_150px_150px_174px] xl:grid-cols-[160px_1fr_178px_178px_188px]",
        !isLast ? "border-b border-white/[0.042]" : "",
      ].join(" ")}
    >
      <ThemeThumbnail
        src={reservation.imageUrl}
        alt={reservation.themeTitle}
        width={150}
        className="w-full sm:w-[150px] xl:w-[160px]"
      />

      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <h4 className="truncate text-[20px] font-black leading-tight text-[#f5f5f5]">
            {reservation.themeTitle}
          </h4>
          {reservation.dday && (
            <span className="rounded-md border border-[#d7b46a]/35 bg-[#d7b46a]/10 px-2 py-0.5 text-xs font-black text-[#d7b46a]">
              {reservation.dday}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#8e8e8e]">
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon type="date" />
            {reservation.date} ({reservation.day})
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon type="time" />
            {reservation.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon type="location" />
            {reservation.location}
          </span>
          {reservation.clearTime && (
            <span className="font-black text-[#2ecc71]">
              {K.clearTime} {reservation.clearTime}
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-white/[0.055] bg-black/[0.14] px-3 py-2 md:hidden">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#898989]">
            <span className="text-[#777]">{K.horror}</span>
            <RatingIcons level={reservation.horrorLevel} type="horror" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#898989]">
            <span className="text-[#777]">{K.difficulty}</span>
            <RatingIcons level={reservation.difficulty} type="difficulty" />
          </span>
        </div>
      </div>

      <MetricBlock label={K.horror}>
        <RatingIcons level={reservation.horrorLevel} type="horror" />
      </MetricBlock>
      <MetricBlock label={K.difficulty}>
        <RatingIcons level={reservation.difficulty} type="difficulty" />
      </MetricBlock>

      <div className="flex items-center justify-end gap-2.5 sm:col-span-2 md:col-span-1">
        {showStatusBadge && (
          <span
            className={[
              "inline-flex h-7 min-w-[46px] items-center justify-center rounded-md border px-2.5 text-[11px] font-black",
              status,
            ].join(" ")}
          >
            {getStatusText(reservation.status)}
          </span>
        )}
        <button
            onClick={() => {
                if (reservation.status === "upcoming") {
                    setConfirming(true);
                } else if (action === K.reviewWrite) {
                    router.push(`/mypage/reviews/write?reservationId=${reservation.id}&themeId=${reservation.themeId}&themeTitle=${encodeURIComponent(reservation.themeTitle)}&reservationDate=${reservation.date}`);
                } else if (action === K.reviewView) {
                    router.push(`/mypage/reviews`);
                }
            }}
          className="h-9 min-w-[104px] rounded-lg border border-[#cc2222]/58 bg-[#101010]/55 px-4 text-[13px] font-black text-[#ef5353] transition-all hover:border-[#cc2222]/90 hover:bg-[#cc2222]/10 hover:text-white max-sm:flex-1"
        >
          {action}
        </button>
      </div>
    </div>
      </>
  );
}

function MetricBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
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
  if (reservation.status === "upcoming")
    return "border-[#cc2222]/52 bg-[#cc2222]/6 text-[#ef5353]";
  if (reservation.status === "cleared")
    return "border-[#2ecc71]/36 bg-[#2ecc71]/10 text-[#2ecc71]";
  return "border-white/[0.14] bg-white/[0.035] text-[#b8b8b8]";
}

function getActionText(reservation: Reservation) {
  if (reservation.status === "upcoming") return K.change;
  return reservation.hasReview ? K.reviewView : K.reviewWrite;
}

function ReservationTabContent() {
  const [upcomingReservations, setUpcomingReservations] = useState<Reservation[]>([]);
  const [pastReservations, setPastReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadReservations = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const [upcoming, past, themes, reviews] = await Promise.all([
          getMyPageReservations("UPCOMING"),
          getMyPageReservations("PAST"),
          getThemes().catch(() => [] as Theme[]),
          getMyPageReviews().catch(() => [] as MyPageReview[]),
        ]);

        if (!isMounted) return;

        const reviewedReservationIds = new Set<number>();
        reviews.forEach((review) => {
          if (review.reservationId) reviewedReservationIds.add(review.reservationId);
        });

        setUpcomingReservations(
          upcoming.map((reservation) =>
            mapReservationToUi(
              reservation,
              "UPCOMING",
              findThemeForReservation(reservation, themes),
              reviewedReservationIds,
            ),
          ),
        );
        setPastReservations(
          past.map((reservation) =>
            mapReservationToUi(
              reservation,
              "PAST",
              findThemeForReservation(reservation, themes),
              reviewedReservationIds,
            ),
          ),
        );
      } catch {
        if (!isMounted) return;
        setUpcomingReservations([]);
        setPastReservations([]);
        setErrorMessage("예약 내역을 불러오지 못했습니다.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadReservations();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div>
        <ReservationCountSummary upcomingCount={0} pastCount={0} />
        <ReservationSection
          title={K.upcoming}
          count={0}
          tone="upcoming"
          reservations={[]}
          emptyMessage="예정된 예약을 불러오는 중입니다."
        />
        <ReservationSection
          title={K.past}
          count={0}
          tone="past"
          reservations={[]}
          emptyMessage="지난 예약을 불러오는 중입니다."
        />
      </div>
    );
  }

  return (
    <div>
      <ReservationCountSummary
        upcomingCount={upcomingReservations.length}
        pastCount={pastReservations.length}
      />
      {errorMessage && (
        <div className="mt-5 rounded-xl border border-[#cc2222]/24 bg-[#cc2222]/8 px-4 py-3 text-sm font-bold text-[#ef5353]">
          {errorMessage}
        </div>
      )}
      <ReservationSection
        title={K.upcoming}
        count={upcomingReservations.length}
        tone="upcoming"
        reservations={upcomingReservations}
        emptyMessage="예정된 예약이 없습니다."
      />
      <ReservationSection
        title={K.past}
        count={pastReservations.length}
        tone="past"
        reservations={pastReservations}
        emptyMessage="지난 예약이 없습니다."
      />
    </div>
  );
}

function StateMessageCard({
  message,
  tone = "normal",
}: {
  message: string;
  tone?: "normal" | "error";
}) {
  return (
    <div
      className={[
        "rounded-xl border bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] px-5 py-8 text-center text-sm font-black shadow-[0_18px_42px_rgba(0,0,0,0.28)]",
        tone === "error"
          ? "border-[#cc2222]/35 text-[#ef5353]"
          : "border-white/[0.075] text-[#898989]",
      ].join(" ")}
    >
      {message}
    </div>
  );
}

function AchievementTabContent({
  profile,
  stats,
}: {
  profile: MyPageProfile;
  stats: MyPageStats;
}) {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const currentTitle = getCurrentTitleItem(profile);
  const titles = getTitleItems(profile);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorMessage("");

    getMyPageAchievements()
      .then((data) => {
        if (!isMounted) return;
        setAchievements(
          data.map((achievement, index) =>
            mapAchievementToUi(achievement, index, stats),
          ),
        );
      })
      .catch(() => {
        if (!isMounted) return;
        setAchievements([]);
        setErrorMessage("업적 정보를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [stats]);

  return (
    <div className="mt-5 space-y-8">
      <AchievementSectionTitle title="칭호" tone="red" />
      <div className="space-y-4">
        <CurrentTitlePanel title={currentTitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {titles.map((title) => (
            <TitleCard key={title.id} title={title} />
          ))}
        </div>
      </div>

      <AchievementSectionTitle title="업적" tone="red" className="pt-1" />
      {isLoading ? (
        <StateMessageCard message="업적 정보를 불러오는 중입니다." />
      ) : errorMessage ? (
        <StateMessageCard message={errorMessage} tone="error" />
      ) : achievements.length === 0 ? (
        <StateMessageCard message="아직 표시할 업적이 없습니다." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}
    </div>
  );
}

function AchievementSectionTitle({
  title,
  className = "",
}: {
  title: string;
  tone?: "red" | "gray";
  className?: string;
}) {
  return (
    <div className={["flex items-center gap-2.5", className].join(" ")}>
      <span className="h-2 w-2 rounded-full bg-[#e53939] shadow-[0_0_12px_rgba(229,57,57,0.54)]" />
      <h3 className="text-[18px] font-black text-[#f5f5f5]">{title}</h3>
    </div>
  );
}

function CurrentTitlePanel({ title }: { title: TitleItem }) {
  const hasTitle = title.status === "current";

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#cc2222]/50 bg-[radial-gradient(circle_at_18%_0%,rgba(239,83,83,0.24),transparent_38%),linear-gradient(135deg,rgba(28,13,13,0.98),rgba(16,16,16,0.94)_58%,rgba(12,12,12,0.98))] px-5 py-5 shadow-[0_22px_64px_rgba(0,0,0,0.36),0_0_34px_rgba(204,34,34,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[#cc2222]/38 bg-[#210f0f] shadow-[inset_0_0_26px_rgba(239,83,83,0.1),0_12px_26px_rgba(0,0,0,0.28)]">
            <TitleSymbol
              type={title.icon}
              className="h-11 w-11 text-[#ef5353] drop-shadow-[0_0_18px_rgba(239,83,83,0.2)]"
            />
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-[11px] font-black tracking-[0.16em] text-[#c09a9a]">
              현재 장착 중인 칭호
            </p>
            <h4 className="truncate text-[26px] font-black leading-tight text-[#f5f5f5]">
              {title.name}
            </h4>
            <p className="mt-1 text-sm font-bold text-[#9a9a9a]">
              {hasTitle
                ? title.description ?? "현재 프로필에 적용된 칭호입니다."
                : "아직 장착 중인 칭호가 없습니다."}
            </p>
          </div>
        </div>
        <span
          className={[
            "inline-flex h-9 shrink-0 items-center justify-center rounded-lg border px-3 text-xs font-black",
            hasTitle
              ? "border-[#cc2222]/55 bg-[#cc2222]/12 text-[#ef5353]"
              : "border-white/[0.1] bg-white/[0.035] text-[#8a8a8a]",
          ].join(" ")}
        >
          {hasTitle ? "장착 중" : "미장착"}
        </span>
      </div>
    </section>
  );
}

function TitleCard({ title }: { title: TitleItem }) {
  const isCurrent = title.status === "current";
  const isLocked = title.status === "locked";
  return (
    <article
      className={[
        "relative flex min-h-[118px] items-center rounded-xl border bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] px-5 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all",
        isCurrent
          ? "border-[#cc2222]/58 shadow-[0_0_30px_rgba(204,34,34,0.12),0_18px_42px_rgba(0,0,0,0.34)]"
          : "border-white/[0.075]",
        isLocked
          ? "opacity-48"
          : "hover:border-white/[0.13] hover:bg-white/[0.018]",
      ].join(" ")}
    >
      {isCurrent && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md border border-[#cc2222]/60 bg-[#171111] px-2.5 py-1 text-[11px] font-black text-[#ef5353] shadow-[0_0_18px_rgba(204,34,34,0.18)]">
          {"\ud604\uc7ac"}
        </span>
      )}
      <div className="flex min-w-0 items-center gap-2.5">
        <TitleSymbol
          type={title.icon}
          className={["h-10 w-10 shrink-0", getTitleSymbolStyle(title)].join(
            " ",
          )}
        />
        <div className="min-w-0">
          <h4 className="truncate whitespace-nowrap text-[15px] font-black text-[#f5f5f5]">
            {title.name}
          </h4>
          {title.description && (
            <p className="mt-0.5 line-clamp-2 text-[11px] font-bold leading-relaxed text-[#858585]">
              {title.description}
            </p>
          )}
          {!isCurrent && !isLocked && (
            <p className="mt-2 text-[11px] font-black text-[#6f6f6f]">
              조건 참고
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function getTitleSymbolStyle(title: TitleItem) {
  if (title.status === "current")
    return "text-[#ef5353] drop-shadow-[0_0_16px_rgba(239,83,83,0.2)]";
  if (title.status === "locked")
    return "text-[#5f5f5f] opacity-70 drop-shadow-[0_0_10px_rgba(255,255,255,0.02)]";
  if (title.icon === "ghost")
    return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
  if (title.icon === "user")
    return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
  if (title.icon === "flame")
    return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
  if (title.icon === "group")
    return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
  if (title.icon === "heart")
    return "text-[#c97878] drop-shadow-[0_0_12px_rgba(239,83,83,0.06)]";
  return "text-[#8a7d67] drop-shadow-[0_0_12px_rgba(255,255,255,0.04)]";
}

function AchievementCard({ achievement }: { achievement: AchievementItem }) {
  const locked = achievement.status === "locked";
  const complete = achievement.status === "complete";
  const inProgress = achievement.status === "progress";
  const hasMeasuredProgress =
    typeof achievement.progress === "number" &&
    typeof achievement.total === "number" &&
    achievement.total > 0;
  const percent =
    hasMeasuredProgress
      ? Math.min(
          100,
          Math.round(((achievement.progress ?? 0) / achievement.total!) * 100),
        )
      : 0;
  return (
    <article
      className={[
        "relative min-h-[132px] rounded-xl border bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all",
        complete
          ? "border-[#2ecc71]/30 shadow-[inset_0_0_28px_rgba(46,204,113,0.045),0_18px_42px_rgba(0,0,0,0.32)]"
          : "border-white/[0.075]",
        locked
          ? "opacity-48"
          : "hover:border-white/[0.13] hover:bg-white/[0.018] hover:shadow-[inset_0_0_28px_rgba(204,34,34,0.025),0_18px_42px_rgba(0,0,0,0.32)]",
      ].join(" ")}
    >
      {locked && (
        <LockIcon className="absolute right-4 top-4 h-4 w-4 text-[#777]" />
      )}
      <div className="flex items-start gap-4">
        <div
          className={[
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border",
            getAchievementIconStyle(achievement),
          ].join(" ")}
        >
          <AchievementIcon type={achievement.icon} className="h-8 w-8" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-start justify-between gap-3">
            <h4 className="text-[16px] font-black text-[#f5f5f5]">
              {achievement.name}
            </h4>
            {complete && (
              <span className="shrink-0 text-sm font-black text-[#2ecc71]">
                {"\u2713"}
              </span>
            )}
          </div>
          <p className="text-xs font-bold leading-relaxed text-[#898989]">
            {achievement.condition}
          </p>

          {complete && (
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs font-black">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-[#2ecc71]/35 bg-[#2ecc71]/10 px-2 py-0.5 text-[#65dc95]">
                  <span>{"\u2713"}</span>
                  {"획득 완료"}
                </span>
                {hasMeasuredProgress && (
                  <span className="text-[#9bc8ab]">
                    {achievement.progressLabel ?? `${achievement.progress}/${achievement.total}`}
                  </span>
                )}
              </div>
              {hasMeasuredProgress && (
                <div className="h-1.5 overflow-hidden rounded-full bg-[#2ecc71]/10">
                  <div
                    className="h-full rounded-full bg-[#2ecc71] shadow-[0_0_12px_rgba(46,204,113,0.3)]"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>
          )}
          {inProgress && (
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs font-black">
                <span className="rounded-md border border-[#cc2222]/35 bg-[#cc2222]/8 px-2 py-0.5 text-[#ef5353]">
                  {"진행 중"}
                </span>
                {hasMeasuredProgress ? (
                  <span className="text-[#aaa]">
                    {achievement.progressLabel ?? `${achievement.progress}/${achievement.total}`}
                  </span>
                ) : achievement.progressLabel ? (
                  <span className="text-[#aaa]">{achievement.progressLabel}</span>
                ) : achievement.total ? (
                  <span className="text-[#aaa]">
                    {achievement.targetLabel ?? `목표 ${achievement.total}`}
                  </span>
                ) : achievement.targetLabel ? (
                  <span className="text-[#aaa]">{achievement.targetLabel}</span>
                ) : null}
              </div>
              {hasMeasuredProgress && (
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.075]">
                  <div
                    className={getProgressBarStyle()}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}
            </div>
          )}
          {locked && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#777]">
              <LockIcon className="h-3.5 w-3.5" />
              {"\uc7a0\uae08 \ud574\uc81c \ud544\uc694"}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function getAchievementIconStyle(achievement: AchievementItem) {
  if (achievement.accent === "lime")
    return "border-[#7ee063]/22 bg-[#1d341d] text-[#80df66] shadow-[inset_0_0_18px_rgba(126,224,99,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
  if (achievement.accent === "teal")
    return "border-[#42d0a4]/22 bg-[#17342d] text-[#56d6ad] shadow-[inset_0_0_18px_rgba(66,208,164,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
  if (achievement.accent === "rose")
    return "border-[#ff5d86]/24 bg-[#3b1724] text-[#ff6f96] shadow-[inset_0_0_18px_rgba(255,93,134,0.15),0_8px_22px_rgba(0,0,0,0.24)]";
  if (achievement.accent === "deepRed")
    return "border-[#b7192a]/26 bg-[#2f1014] text-[#e03543] shadow-[inset_0_0_18px_rgba(183,25,42,0.16),0_8px_22px_rgba(0,0,0,0.24)]";
  if (achievement.accent === "amber")
    return "border-[#f1bd44]/24 bg-[#352915] text-[#f1bf45] shadow-[inset_0_0_18px_rgba(241,189,68,0.13),0_8px_22px_rgba(0,0,0,0.24)]";
  if (achievement.accent === "orange")
    return "border-[#ff7043]/24 bg-[#371914] text-[#ff7043] shadow-[inset_0_0_18px_rgba(255,112,67,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
  if (achievement.accent === "gold")
    return "border-[#c89b3c]/26 bg-[#302614] text-[#d6aa45] shadow-[inset_0_0_18px_rgba(200,155,60,0.15),0_8px_22px_rgba(0,0,0,0.24)]";
  return "border-[#ff4757]/24 bg-[#3a171a] text-[#ff4757] shadow-[inset_0_0_18px_rgba(255,71,87,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
}

function getProgressBarStyle() {
  return "h-full rounded-full bg-[#ef3f4b] shadow-[0_0_12px_rgba(239,63,75,0.28)]";
}

function ActivityTabContent() {
    const router = useRouter();
  const [reviews, setReviews] = useState<ActivityReview[]>([]);
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [mates, setMates] = useState<ActivityMate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorMessage("");

    Promise.allSettled([
      getMyPageReviews(),
      getMyPageMatePosts(),
      getMyPageMateParticipations(),
    ])
      .then(async([reviewResult, postResult, participationResult]) => {
        if (!isMounted) return;

          if (reviewResult.status === "fulfilled") {
              const enriched = await enrichMyPageReviewsWithThemeImages(reviewResult.value);
              if (isMounted) setReviews(enriched.map(mapReviewToActivity));
          } else {
              setReviews([]);
          }
        setPosts(
          postResult.status === "fulfilled"
            ? postResult.value.map(mapMatePostToActivityPost)
            : [],
        );
        if (participationResult.status === "fulfilled") {
          const enrichedMates = await Promise.all(
            participationResult.value.map(async (participation) => {
              try {
                const detail = await getMatePostById(participation.matePostId);
                return mapMateDetailToActivityMate(detail);
              } catch {
                return mapMatePostToActivityMate(participation);
              }
            }),
          );

          if (isMounted) setMates(enrichedMates);
        } else {
          setMates([]);
        }

        if (
          reviewResult.status === "rejected" &&
          postResult.status === "rejected" &&
          participationResult.status === "rejected"
        ) {
          setErrorMessage("내 활동 정보를 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="mt-5">
        <StateMessageCard message="내 활동 정보를 불러오는 중입니다." />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="mt-5">
        <StateMessageCard message={errorMessage} tone="error" />
      </div>
    );
  }

  const previewReviews = reviews.slice(0, ACTIVITY_REVIEW_PREVIEW_COUNT);
  const hiddenReviewCount = Math.max(
    0,
    reviews.length - ACTIVITY_REVIEW_PREVIEW_COUNT,
  );

  return (
    <div className="mt-5 space-y-8">
      <ActivitySection
        title="내 후기"
        icon="review"
        action={
          <Link
            href="/mypage/reviews"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[#cc2222]/46 bg-[#101010]/55 px-3.5 text-[12px] font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/10 hover:text-white"
          >
            내 후기 관리
          </Link>
        }
      >
        {reviews.length === 0 ? (
          <StateMessageCard message="아직 작성한 후기가 없습니다." />
        ) : (
          <div className="space-y-3.5">
            {previewReviews.map((review) => (
              <ReviewActivityCard key={review.id} review={review}
                                  onEdit={() => router.push(`/mypage/reviews?action=edit&reviewId=${review.id}`)}
                                  onDelete={() => router.push(`/mypage/reviews?action=delete&reviewId=${review.id}`)}
              />
            ))}
            {hiddenReviewCount > 0 && (
              <div className="flex flex-col gap-3 rounded-xl border border-white/[0.075] bg-black/[0.18] px-4 py-4 text-sm font-bold text-[#8c8c8c] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  최근 {ACTIVITY_REVIEW_PREVIEW_COUNT}개만 표시 중입니다. 나머지 {hiddenReviewCount}개 후기는 전체 후기 관리에서 확인할 수 있어요.
                </span>
                <Link
                  href="/mypage/reviews"
                  className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-[#cc2222]/46 px-3.5 text-[12px] font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/10 hover:text-white"
                >
                  전체 후기 보기
                </Link>
              </div>
            )}
          </div>
        )}
      </ActivitySection>

      <ActivitySection title="내가 쓴 글" icon="post">
        {posts.length === 0 ? (
          <StateMessageCard message="아직 작성한 메이트 모집글이 없습니다." />
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/[0.075] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_20px_58px_rgba(0,0,0,0.34)]">
            {posts.map((post, index) => (
              <PostActivityRow
                key={post.id}
                post={post}
                isLast={index === posts.length - 1}
              />
            ))}
          </div>
        )}
      </ActivitySection>

      <ActivitySection title="내가 참여한 메이트 모집" icon="mate">
        {mates.length === 0 ? (
          <StateMessageCard message="아직 참여 중인 메이트 모집이 없습니다." />
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {mates.map((mate) => (
              <MateActivityCard key={mate.id} mate={mate} />
            ))}
          </div>
        )}
      </ActivitySection>
    </div>
  );
}

function ActivitySection({
  title,
  action,
  children,
}: {
  title: string;
  icon: "review" | "post" | "mate";
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#e53939] shadow-[0_0_12px_rgba(229,57,57,0.54)]" />
          <h3 className="text-[18px] font-black text-[#f5f5f5]">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function ReviewActivityCard({ review, onEdit, onDelete,}: { review: ActivityReview; onEdit: () => void;
    onDelete: () => void; }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-white/[0.075] bg-[radial-gradient(circle_at_9%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all hover:border-white/[0.13] hover:bg-white/[0.018] md:flex-row md:items-center md:p-4">
      <ThemeThumbnail
        src={review.imageUrl}
        alt={review.themeTitle}
        width={216}
        className="w-full shrink-0 md:w-[216px]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.36))]" />
      </ThemeThumbnail>
      <div className="min-w-0 flex-1">
        <div className="mb-2.5 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate text-[18px] font-black text-[#f5f5f5]">
              {review.themeTitle}
            </h4>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <span className="text-xs font-bold text-[#747474]">
              {review.date}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="h-8 rounded-md border border-white/[0.11] bg-[#101010]/55 px-3 text-xs font-black text-[#aaa] transition-all hover:border-white/[0.2] hover:text-white"
              >
                수정
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="h-8 rounded-md border border-[#cc2222]/45 bg-[#101010]/55 px-3 text-xs font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/10 hover:text-white"
              >
                삭제
              </button>
            </div>
          </div>
        </div>

        <div className="mb-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-white/[0.055] bg-black/[0.16] px-3 py-2">
          <StarRating rating={review.rating} />
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#898989]">
            <span className="text-[#777]">공포도</span>
            <RatingIcons level={review.horrorLevel} type="horror" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#898989]">
            <span className="text-[#777]">난이도</span>
            <RatingIcons level={review.difficulty} type="difficulty" />
          </span>
        </div>

        <p className="line-clamp-2 text-[13px] font-bold leading-relaxed text-[#b7b7b7]">
          {review.content}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.09] bg-white/[0.035] px-2.5 py-1 text-[11px] font-bold text-[#8f8f8f]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function PostActivityRow({
  post,
  isLast,
}: {
  post: ActivityPost;
  isLast?: boolean;
}) {
    const router = useRouter();
  const categoryStyle =
    post.category === "모집"
      ? "border-[#d7b46a]/35 bg-[#d7b46a]/8 text-[#d7b46a]"
      : "border-[#5d8fd8]/35 bg-[#5d8fd8]/8 text-[#7fa8df]";
  return (
    <article
        onClick={() => router.push(`/mate/${post.id}`)}
      className={[
        "grid min-h-[74px] items-center gap-3 px-4 py-3.5 transition-all hover:bg-white/[0.026] sm:grid-cols-[64px_92px_1fr_72px] cursor-pointer",
        !isLast ? "border-b border-white/[0.042]" : "",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-8 w-fit items-center justify-center rounded-md border px-3 text-xs font-black",
          categoryStyle,
        ].join(" ")}
      >
        {post.category}
      </span>
      <span className="text-sm font-bold text-[#777]">{post.date}</span>
      <h4 className="min-w-0 truncate text-[15px] font-black text-[#e7e7e7]">
        {post.title}
      </h4>
      <span className="inline-flex items-center gap-1.5 justify-self-start text-sm font-bold text-[#898989] sm:justify-self-end">
        <ActivityLineIcon type="comment" className="h-4 w-4 text-[#b5b5b5]" />
        {post.comments}
      </span>
    </article>
  );
}

function MateActivityCard({ mate }: { mate: ActivityMate }) {
  const isClosed = mate.status === "closed";
  const progress = Math.min(
    100,
    Math.round((mate.currentMembers / Math.max(mate.totalMembers, 1)) * 100),
  );
  const isAuthor = !!mate.isAuthor;
  return (
    <article
      className={[
        "group overflow-hidden rounded-xl border border-white/[0.075] bg-[linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all",
        isClosed
          ? "opacity-[0.62]"
          : "hover:border-[#cc2222]/48 hover:shadow-[0_18px_48px_rgba(204,34,34,0.09)]",
      ].join(" ")}
    >
      <ThemeThumbnail
        src={mate.imageUrl}
        alt={mate.themeTitle}
        className="group-hover:scale-[1.035]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.18)_44%,rgba(18,18,18,0.96))]" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-md border border-[#cc2222]/45 bg-[#cc2222]/18 px-2.5 py-1 text-[11px] font-black text-[#ef5353]">
            {mate.themeTitle}
          </span>
          <span className="rounded-md border border-white/[0.14] bg-black/35 px-2.5 py-1 text-[11px] font-bold text-[#c7c7c7]">
            {mate.location}
          </span>
        </div>
      </ThemeThumbnail>

      <div className="p-4">
        <h4 className="line-clamp-2 min-h-[44px] text-[17px] font-black leading-snug text-[#f5f5f5]">
          {mate.title}
        </h4>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-[#858585]">
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon type="date" />
            {mate.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon type="time" />
            {mate.time}
          </span>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-4 py-4">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-black">
          <span className="inline-flex items-center gap-1.5 text-[#8d8d8d]">
            <ActivityLineIcon type="users" className="h-4 w-4" />
            현재 인원
          </span>
          <span className="text-[#bdbdbd]">
            {mate.currentMembers}/{mate.totalMembers}명
          </span>
        </div>
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/[0.075]">
          <span
            className="block h-full rounded-full bg-[#b93a3a] shadow-[0_0_12px_rgba(204,34,34,0.28)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <MateStatusBadge status={mate.status} />
          <Link
            href={`/mate/${mate.id}`}
            className={
              "inline-flex h-9 items-center justify-center rounded-md border px-4 text-xs font-black transition-all border-[#cc2222]/58 bg-[#101010]/55 text-[#ef5353] hover:border-[#cc2222]/90 hover:bg-[#cc2222]/10 hover:text-white"
            }
          >
            {isAuthor ? "관리하기" : "상세보기"}
          </Link>
        </div>
      </div>
    </article>
  );
}

function MateStatusBadge({ status }: { status: MateActivityStatus }) {
  if (status === "closed")
    return (
      <span className="rounded-md border border-white/[0.1] bg-white/[0.035] px-2.5 py-1 text-[11px] font-black text-[#777]">
        마감
      </span>
    );
  if (status === "joined")
    return (
      <span className="rounded-md border border-[#2ecc71]/34 bg-[#2ecc71]/9 px-2.5 py-1 text-[11px] font-black text-[#2ecc71]">
        참여중
      </span>
    );
  return (
    <span className="rounded-md border border-[#cc2222]/45 bg-[#cc2222]/8 px-2.5 py-1 text-[11px] font-black text-[#ef5353]">
      모집중
    </span>
  );
}

export default function MyPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [tab, setTab] = useState<TabKey>("reservation");
  const [profile, setProfile] = useState<MyPageProfile>(DEFAULT_PROFILE);
  const [stats, setStats] = useState<MyPageStats>(DEFAULT_STATS);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const currentTabLabel =
    TABS.find((item) => item.key === tab)?.label ?? K.reservation;
  const currentSubtitle =
    tab === "achievement"
      ? "\ub098\uc758 \uc5c5\uc801\uacfc \uce6d\ud638\ub97c \ud655\uc778\ud574\ubcf4\uc138\uc694."
      : tab === "activity"
        ? "내 후기와 글, 참여 중인 메이트 모집을 확인해보세요."
        : K.subtitle;

  useEffect(() => {
    const queryTab = new URLSearchParams(window.location.search).get("tab");
    if (queryTab === "reservation" || queryTab === "achievement" || queryTab === "activity") {
      setTab(queryTab);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLoggedIn || !getToken()) {
      setIsProfileLoading(false);
      return;
    }

    let isMounted = true;

    setIsProfileLoading(true);
    setProfileErrorMessage("");

    Promise.allSettled([getMyPageMain(), getMyPageStats()])
      .then(([mainResult, statsResult]) => {
        if (!isMounted) return;

        if (mainResult.status === "fulfilled") {
          setProfile(mainResult.value.profile);
          setStats(mainResult.value.stats);
        }

        if (statsResult.status === "fulfilled") {
          setStats(statsResult.value);
        }

        if (mainResult.status === "rejected" && statsResult.status === "rejected") {
          setProfile(DEFAULT_PROFILE);
          setStats(DEFAULT_STATS);
          setProfileErrorMessage("마이페이지 정보를 불러오지 못했습니다.");
        } else if (mainResult.status === "rejected") {
          setProfile(DEFAULT_PROFILE);
          setProfileErrorMessage("프로필 정보를 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (isMounted) setIsProfileLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [hasHydrated, isLoggedIn]);

  const handleTabChange = (nextTab: TabKey) => {
    setTab(nextTab);
    const url = nextTab === "reservation" ? "/mypage?tab=reservation" : `/mypage?tab=${nextTab}`;
    window.history.replaceState(null, "", url);
  };

  if (!hasHydrated) return null;

  if (!isLoggedIn || !getToken()) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0b0b] px-5 text-[#f5f5f5]">
        <div className="rounded-2xl border border-white/[0.08] bg-[#141414] px-8 py-10 text-center">
          <h1 className="text-xl font-black">로그인이 필요합니다</h1>
          <p className="mt-2 text-sm text-[#888]">마이페이지는 로그인 후 이용할 수 있습니다.</p>
          <Link
            href="/login?redirect=%2Fmypage"
            className="mt-6 inline-flex rounded-lg bg-[#cc2222] px-5 py-3 text-sm font-black text-white"
          >
            로그인하기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0b] text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_86%_9%,rgba(150,20,20,0.42),transparent_30%),radial-gradient(circle_at_2%_82%,rgba(150,24,24,0.34),transparent_28%),radial-gradient(circle_at_24%_14%,rgba(204,34,34,0.105),transparent_32%),linear-gradient(180deg,#0b0b0b_0%,#101010_46%,#090909_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_82%_13%,rgba(255,70,70,0.55)_0_1px,transparent_1px),radial-gradient(circle_at_9%_78%,rgba(255,60,60,0.5)_0_1px,transparent_1px)] [background-size:34px_34px,46px_46px] blur-[0.5px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 py-8 sm:px-8 lg:py-10">
        <nav className="mb-7 flex items-center gap-2 text-xs font-bold text-[#777]">
          <Link href="/" className="transition-colors hover:text-[#f5f5f5]">
            {K.home}
          </Link>
          <span>&gt;</span>
          <span>{K.mypage}</span>
          <span>&gt;</span>
          <span className="text-[#f5f5f5]">{currentTabLabel}</span>
        </nav>

        <header className="mb-6">
          <p className="mb-3 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">
            {"// MY PAGE"}
          </p>
          <h1 className="flex items-center gap-3 text-[38px] font-black leading-tight md:text-[50px]">
            <PageTitleIcon className="h-11 w-11 shrink-0 self-center md:h-[52px] md:w-[52px]" />
            <span>
              <span className="text-[#e63946]">{K.titleLead}</span>
              {K.titleRest}
            </span>
          </h1>
          <p className="mt-3 text-sm font-bold text-[#aaa]">
            {currentSubtitle}
          </p>
            <Link
                href="/mypage/settings"
                className="absolute right-10 top-5 text-[#888] transition-all hover:text-[#f5f5f5]"
            >
                ⚙️
            </Link>
        </header>

        <ProfileSummaryCard
          profile={profile}
          stats={stats}
          isLoading={isProfileLoading}
          errorMessage={profileErrorMessage}
        />
        <ReservationTabs active={tab} onChange={handleTabChange} />

        {tab === "reservation" && <ReservationTabContent />}
        {tab === "achievement" && <AchievementTabContent profile={profile} stats={stats} />}
        {tab === "activity" && <ActivityTabContent />}
      </div>
    </main>
  );
}
