"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeCard from "@/components/card/ThemeCard";
import { Theme } from "@/types/theme";

const MOCK_THEMES: Theme[] = [
  {
    id: 1,
    title: "폐병원의 저주",
    description: "폐허가 된 병원에서 시작되는 극한의 공포 서사.",
    genre: "공포/미스터리",
    difficulty: 4,
    horrorLevel: 5,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 80,
    price: 28000,
    imageUrl: "https://picsum.photos/seed/grimgate1/400/300",
    rating: 4.9,
    reviewCount: 342,
    rank: 1,
    isBest: true,
    locationName: "홍대",
    branchName: "홍대 1호점",
    clearRate: 41,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "13번째 방",
    description: "전설의 13번째 방. 들어간 자는 돌아오지 않는다.",
    genre: "공포/스릴러",
    difficulty: 5,
    horrorLevel: 3,
    minPlayers: 3,
    maxPlayers: 6,
    duration: 90,
    price: 30000,
    imageUrl: "https://picsum.photos/seed/grimgate2/400/300",
    rating: 4.9,
    reviewCount: 312,
    rank: 2,
    isBest: true,
    locationName: "홍대",
    branchName: "홍대 6호점",
    clearRate: 38,
    createdAt: "2024-02-01",
  },
  {
    id: 3,
    title: "블러드문",
    description: "붉은 달이 뜨는 밤, 저주가 시작된다.",
    genre: "공포/오컬트",
    difficulty: 5,
    horrorLevel: 5,
    minPlayers: 3,
    maxPlayers: 6,
    duration: 90,
    price: 32000,
    imageUrl: "https://picsum.photos/seed/grimgate3/400/300",
    rating: 4.8,
    reviewCount: 289,
    isHot: true,
    locationName: "강남",
    branchName: "강남 8호점",
    clearRate: 57,
    createdAt: "2024-01-20",
  },
  {
    id: 4,
    title: "좀비 아포칼립스",
    description: "바이러스가 창궐한 도시에서 살아남아라.",
    genre: "액션/공포",
    difficulty: 3,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 75,
    price: 26000,
    imageUrl: "https://picsum.photos/seed/grimgate4/400/300",
    rating: 4.8,
    reviewCount: 275,
    isHot: true,
    locationName: "강남",
    branchName: "강남 3호점",
    clearRate: 62,
    createdAt: "2024-01-10",
  },
  {
    id: 5,
    title: "미완의 초상",
    description: "전체 화가의 눈이 당신을 따라온다. 저주를 풀어라.",
    genre: "심리/공포",
    difficulty: 4,
    horrorLevel: 4,
    minPlayers: 1,
    maxPlayers: 6,
    duration: 70,
    price: 25000,
    imageUrl: "https://picsum.photos/seed/grimgate5/400/300",
    rating: 4.5,
    reviewCount: 287,
    rank: 1,
    locationName: "건대",
    branchName: "건대 2호점",
    clearRate: 44,
    createdAt: "2024-03-01",
  },
  {
    id: 6,
    title: "체이금",
    description: "사라진 탐정을 추적하다 발견한 잔혹 스릴러.",
    genre: "스릴러",
    difficulty: 5,
    horrorLevel: 5,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 75,
    price: 27000,
    imageUrl: "https://picsum.photos/seed/grimgate6/400/300",
    rating: 4.8,
    reviewCount: 234,
    isHot: true,
    locationName: "건대",
    branchName: "건대 6호점",
    clearRate: 41,
    createdAt: "2024-02-15",
  },
  {
    id: 7,
    title: "감옥 탈출",
    description: "탈출 가능하다 했지만, 시간 안에 살아 나가라.",
    genre: "스릴러",
    difficulty: 4,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 7,
    duration: 60,
    price: 22000,
    imageUrl: "https://picsum.photos/seed/grimgate7/400/300",
    rating: 4.5,
    reviewCount: 221,
    isHot: true,
    locationName: "홍대",
    branchName: "홍대 2호점",
    clearRate: 68,
    createdAt: "2024-01-05",
  },
  {
    id: 8,
    title: "사일런스",
    description: "소리를 내면 안 된다. 침묵 속에서 탈출하라.",
    genre: "공포/스릴러",
    difficulty: 3,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 70,
    price: 24000,
    imageUrl: "https://picsum.photos/seed/grimgate8/400/300",
    rating: 4.5,
    reviewCount: 203,
    locationName: "신촌",
    branchName: "신촌 4호점",
    clearRate: 72,
    createdAt: "2024-04-01",
  },
  {
    id: 9,
    title: "인형의 밤",
    description: "자꾸만 인형들이 움직이기 시작했다.",
    genre: "공포",
    difficulty: 4,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 75,
    price: 25000,
    imageUrl: "https://picsum.photos/seed/grimgate9/400/300",
    rating: 4.7,
    reviewCount: 198,
    rank: 3,
    locationName: "홍대",
    branchName: "홍대 3호점",
    clearRate: 55,
    createdAt: "2024-03-15",
  },
  {
    id: 10,
    title: "귀신 들린 인형",
    description: "완벽한 인형들이 자학하기 시작했다.",
    genre: "공포",
    difficulty: 3,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 65,
    price: 23000,
    imageUrl: "https://picsum.photos/seed/grimgate10/400/300",
    rating: 4.5,
    reviewCount: 188,
    rank: 4,
    locationName: "강남",
    branchName: "강남 5호점",
    clearRate: 61,
    createdAt: "2024-03-20",
  },
  {
    id: 11,
    title: "저주받은 산장",
    description: "눈 내린 산장에 서린 저주를 풀어라.",
    genre: "미스터리",
    difficulty: 3,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 80,
    price: 25000,
    imageUrl: "https://picsum.photos/seed/grimgate11/400/300",
    rating: 4.6,
    reviewCount: 180,
    rank: 4,
    locationName: "강남",
    branchName: "강남 1호점",
    clearRate: 59,
    createdAt: "2024-04-10",
  },
  {
    id: 12,
    title: "악마의 계약",
    description: "계약서에 서명하면 다신 돌아올 수 없다.",
    genre: "공포/스릴러",
    difficulty: 4,
    horrorLevel: 5,
    minPlayers: 2,
    maxPlayers: 5,
    duration: 75,
    price: 26000,
    imageUrl: "https://picsum.photos/seed/grimgate12/400/300",
    rating: 4.4,
    reviewCount: 165,
    locationName: "건대",
    branchName: "건대 1호점",
    clearRate: 48,
    createdAt: "2024-04-15",
  },
  {
    id: 13,
    title: "어둠 속의 목소리",
    description: "귀에 들려오는 목소리... 탈출할 수 있을까.",
    genre: "공포",
    difficulty: 2,
    horrorLevel: 3,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 60,
    price: 22000,
    imageUrl: "https://picsum.photos/seed/grimgate13/400/300",
    rating: 4.3,
    reviewCount: 155,
    locationName: "신촌",
    branchName: "신촌 1호점",
    clearRate: 74,
    createdAt: "2024-05-01",
  },
  {
    id: 14,
    title: "저승사자의 초대",
    description: "저승으로부터 초대장이 도착했다.",
    genre: "공포/판타지",
    difficulty: 4,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 85,
    price: 27000,
    imageUrl: "https://picsum.photos/seed/grimgate14/400/300",
    rating: 4.6,
    reviewCount: 142,
    isNew: true,
    locationName: "홍대",
    branchName: "홍대 4호점",
    clearRate: 44,
    createdAt: "2024-06-01",
  },
  {
    id: 15,
    title: "비밀 연구소",
    description: "정부에서 숨겨온 실험실, 진실이 폭로된다.",
    genre: "스릴러",
    difficulty: 3,
    horrorLevel: 2,
    minPlayers: 2,
    maxPlayers: 5,
    duration: 70,
    price: 23000,
    imageUrl: "https://picsum.photos/seed/grimgate15/400/300",
    rating: 4.2,
    reviewCount: 134,
    locationName: "강남",
    branchName: "강남 2호점",
    clearRate: 78,
    createdAt: "2024-05-15",
  },
  {
    id: 16,
    title: "고택의 원혼",
    description: "100년 된 고택에 서린 원혼을 달래라.",
    genre: "공포",
    difficulty: 3,
    horrorLevel: 5,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 80,
    price: 25000,
    imageUrl: "https://picsum.photos/seed/grimgate16/400/300",
    rating: 4.4,
    reviewCount: 128,
    locationName: "건대",
    branchName: "건대 3호점",
    clearRate: 52,
    createdAt: "2024-05-20",
  },
  {
    id: 17,
    title: "복수의 시간",
    description: "살인범이 당신 앞에 있다. 증거를 찾아 탈출하라.",
    genre: "미스터리/스릴러",
    difficulty: 4,
    horrorLevel: 3,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 75,
    price: 26000,
    imageUrl: "https://picsum.photos/seed/grimgate17/400/300",
    rating: 4.5,
    reviewCount: 117,
    isNew: true,
    locationName: "신촌",
    branchName: "신촌 2호점",
    clearRate: 63,
    createdAt: "2024-06-10",
  },
  {
    id: 18,
    title: "파멸의 시계",
    description: "시계가 멈추면 모든 것이 끝난다.",
    genre: "스릴러",
    difficulty: 5,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 90,
    price: 29000,
    imageUrl: "https://picsum.photos/seed/grimgate18/400/300",
    rating: 4.7,
    reviewCount: 109,
    locationName: "홍대",
    branchName: "홍대 5호점",
    clearRate: 38,
    createdAt: "2024-06-15",
  },
  {
    id: 19,
    title: "잃어버린 기억",
    description: "기억을 잃은 채 깨어났다. 나는 누구인가.",
    genre: "미스터리",
    difficulty: 2,
    horrorLevel: 2,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 60,
    price: 21000,
    imageUrl: "https://picsum.photos/seed/grimgate19/400/300",
    rating: 4.1,
    reviewCount: 98,
    locationName: "강남",
    branchName: "강남 7호점",
    clearRate: 82,
    createdAt: "2024-07-01",
  },
  {
    id: 20,
    title: "혈족의 저주",
    description: "대대로 내려오는 저주, 당신이 마지막 희망이다.",
    genre: "공포",
    difficulty: 4,
    horrorLevel: 5,
    minPlayers: 2,
    maxPlayers: 5,
    duration: 85,
    price: 27000,
    imageUrl: "https://picsum.photos/seed/grimgate20/400/300",
    rating: 4.6,
    reviewCount: 87,
    isNew: true,
    locationName: "건대",
    branchName: "건대 4호점",
    clearRate: 42,
    createdAt: "2024-07-10",
  },
  {
    id: 21,
    title: "유령 병동",
    description: "폐쇄된 병동에서의 하룻밤, 살아남아라.",
    genre: "공포/스릴러",
    difficulty: 3,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 75,
    price: 25000,
    imageUrl: "https://picsum.photos/seed/grimgate21/400/300",
    rating: 4.3,
    reviewCount: 76,
    locationName: "신촌",
    branchName: "신촌 3호점",
    clearRate: 58,
    createdAt: "2024-07-15",
  },
  {
    id: 22,
    title: "사냥꾼의 덫",
    description: "숲 속에서 덫에 걸렸다. 사냥꾼이 오기 전에 탈출하라.",
    genre: "스릴러",
    difficulty: 4,
    horrorLevel: 3,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 70,
    price: 24000,
    imageUrl: "https://picsum.photos/seed/grimgate22/400/300",
    rating: 4.2,
    reviewCount: 65,
    locationName: "홍대",
    branchName: "홍대 7호점",
    clearRate: 67,
    createdAt: "2024-08-01",
  },
  {
    id: 23,
    title: "마지막 제물",
    description: "의식의 마지막 제물로 선택받았다.",
    genre: "공포",
    difficulty: 5,
    horrorLevel: 5,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 90,
    price: 30000,
    imageUrl: "https://picsum.photos/seed/grimgate23/400/300",
    rating: 4.8,
    reviewCount: 54,
    isNew: true,
    locationName: "강남",
    branchName: "강남 9호점",
    clearRate: 29,
    createdAt: "2024-08-15",
  },
  {
    id: 24,
    title: "폐광의 비밀",
    description: "금을 찾아 들어간 폐광에서 기이한 존재와 마주쳤다.",
    genre: "공포/미스터리",
    difficulty: 3,
    horrorLevel: 3,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 80,
    price: 24000,
    imageUrl: "https://picsum.photos/seed/grimgate24/400/300",
    rating: 4.0,
    reviewCount: 43,
    locationName: "건대",
    branchName: "건대 5호점",
    clearRate: 71,
    createdAt: "2024-09-01",
  },
];

const LOCATIONS = ["강남", "홍대", "건대", "신촌"];
const PER_PAGE = 12;
const SORT_OPTIONS = [
  { value: "popular", label: "인기순" },
  { value: "latest", label: "최신순" },
] as const;

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
  const Icon = type === "horror" ? FilterSkullIcon : FilterLockIcon;
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

function ThemeDetailDrawer({
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

export default function ThemesPage() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [horrorLevel, setHorrorLevel] = useState(0);
  const [minPlayers, setMinPlayers] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"popular" | "latest">("popular");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let list = [...MOCK_THEMES];
    if (selectedLocations.length > 0) {
      list = list.filter((t) =>
        selectedLocations.includes(t.locationName ?? ""),
      );
    }
    if (difficulty > 0) list = list.filter((t) => t.difficulty === difficulty);
    if (horrorLevel > 0)
      list = list.filter((t) => t.horrorLevel === horrorLevel);
    if (minPlayers > 0) list = list.filter((t) => t.maxPlayers >= minPlayers);
    if (minRating > 0) list = list.filter((t) => (t.rating ?? 0) >= minRating);
    if (sort === "popular")
      list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [selectedLocations, difficulty, horrorLevel, minPlayers, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const selectedTheme =
    selectedThemeId !== null
      ? MOCK_THEMES.find((theme) => theme.id === selectedThemeId)
      : undefined;

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
    );
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
    setSort("popular");
    setIsSortOpen(false);
    setPage(1);
  };

  const openThemeDrawer = (theme: Theme) => {
    setSelectedThemeId(theme.id);
    window.history.pushState(null, "", `/themes?themeId=${theme.id}`);
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
      const themeId = Number(new URLSearchParams(window.location.search).get("themeId"));
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
              onChange={(event) => setSearchKeyword(event.target.value)}
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
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
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
                    {n === 0 ? "전체" : `${n}인+`}
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
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
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
                {(["popular", "latest"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(setSort, s)}
                    className={[
                      "rounded-full border px-3 py-1.5 text-xs font-black transition-all",
                      sort === s
                        ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]"
                        : "border-white/[0.1] text-[#888] hover:border-white/20 hover:text-[#d8d8d8]",
                    ].join(" ")}
                  >
                    {s === "popular" ? "인기순" : "최신순"}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {paged.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [&_article_h3]:text-[20px] [&_article_h3]:tracking-[-0.01em] [&_article_h3+div]:mt-4 [&_article_h3+div]:space-y-3 [&_article_h3+div>div:first-child]:grid [&_article_h3+div>div:first-child]:gap-2 [&_article_h3+div>div:first-child]:text-[12px] [&_article_h3+div>div:first-child>span]:flex [&_article_h3+div>div:first-child>span]:w-full [&_article_h3+div>div:first-child>span]:justify-between [&_article_h3+div>div:nth-child(2)]:justify-between [&_article_h3+div>div:nth-child(2)]:text-[11px] [&_article_h3+div>div:nth-child(2)]:text-[#707070] [&_article_h3+div>div:nth-child(2)>span:first-child]:inline-flex [&_article_h3+div>div:nth-child(2)>span:first-child]:items-center [&_article_h3+div>div:nth-child(2)>span:first-child]:gap-3 [&_article_h3+div>div:nth-child(2)>span:last-child]:shrink-0 [&_article_h3+div>div:nth-child(3)]:flex [&_article_h3+div>div:nth-child(3)]:justify-between [&_article_h3+div>div:nth-child(3)]:text-[11px] [&_article_h3+div>div:nth-child(3)]:text-[#626262]">
                {paged.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    showRank={false}
                    showPrice
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
            {totalPages > 1 && (
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
        <ThemeDetailDrawer theme={selectedTheme} onClose={closeThemeDrawer} />
      )}
    </div>
  );
}
