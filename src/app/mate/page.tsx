"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MatePost } from "@/types/mate";
import { getDDay } from "@/lib/formatDate";

const K = {
  home: "\ud648",
  mate: "\uba54\uc774\ud2b8",
  mateBoard: "\uba54\uc774\ud2b8 \ubaa8\uc9d1",
  all: "\uc804\uccb4",
  open: "\ubaa8\uc9d1 \uc911",
  openCompact: "\ubaa8\uc9d1\uc911",
  closed: "\ub9c8\uac10",
  comment: "\ub313\uae00",
  mine: "\ub0b4 \uae00",
  pinned: "\uace0\uc815",
  statusLabel: "\ubaa8\uc9d1 \uc0c1\ud0dc",
  currentOpen: "\ud604\uc7ac \ubaa8\uc9d1 \uc911",
  todayPost: "\uc624\ub298 \uc0c8 \uae00",
  totalMatched: "\ub204\uc801 \uc131\uc0ac",
  search: "\ubaa8\uc9d1 \uae00 \uac80\uc0c9",
  myStatus: "\ub0b4 \ubaa8\uc9d1 \ud604\ud669",
  write: "+ \uba54\uc774\ud2b8 \ubaa8\uc9d1 \uae00\uc4f0\uae30",
  filter: "\ud544\ud130",
  reset: "\ucd08\uae30\ud654",
  location: "\uc9c0\uc810",
  level: "\uacbd\ud5d8 \ub808\ubca8",
  tag: "\ubd84\uc704\uae30 \ud0dc\uadf8",
  any: "\ubb34\uad00",
  anyUser: "\ubb34\uad00 (\ub204\uad6c\ub098)",
  beginner: "\uc785\ubb38\uc790 \ud658\uc601",
  intermediate: "\uc911\uae09\uc790 \uc6b0\ub300",
  expert: "\uacbd\ud5d8\uc790 \uc6b0\ub300",
  noticeTitle: "\ubaa8\uc9d1 \uc54c\ub9ac\ubbf8",
  notice: "\uc2e0\uccad \ud6c4 \uc5f0\ub77d\uc774 \uc5c6\ub294 \uacbd\uc6b0 \ucc38\uc5ec\uac00 \uc81c\ud55c\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ucc38\uc5ec\uac00 \uc5b4\ub824\uc6cc\uc9c0\uba74 \ubaa8\uc9d1 \uc0c1\ud0dc\ub97c \ub9c8\uac10\uc73c\ub85c \ubcc0\uacbd\ud574\uc8fc\uc138\uc694.",
  joined: "\ucc38\uc5ec/\ubaa8\uc9d1",
  countSuffix: "\uac1c\uc758 \ubaa8\uc9d1 \uae00",
  noResult: "\uc870\uac74\uc5d0 \ub9de\ub294 \ubaa8\uc9d1 \uae00\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.",
  participants: "\ucc38\uc5ec \ud604\ud669",
  people: "\uba85",
  left: "\uc790\ub9ac \ub0a8\uc74c",
  complete: "\ubaa8\uc9d1 \uc644\ub8cc",
  headline: "\ud63c\uc790 \uac00\uae30 \ubb34\uc11c\uc6b4 \ud14c\ub9c8\ub3c4 \uba54\uc774\ud2b8\uc640 \ud568\uaed8\ub77c\uba74 \ub354 \uc990\uac70\uc6cc\uc838\uc694.",
  subline: "\uc6d0\ud558\ub294 \ud14c\ub9c8, \ub0a0\uc9dc, \ubd84\uc704\uae30\uc5d0 \ub9de\ub294 \ud30c\ud2f0\ub97c \ucc3e\uc544\ubcf4\uc138\uc694.",
};

const L = {
  gangnam: "\uac15\ub0a8\uc810",
  hongdae: "\ud64d\ub300\uc810",
  geondae: "\uac74\ub300\uc810",
};

const T = {
  serious: "\uc9c4\uc9c0\ud558\uac8c",
  fun: "\uc990\uac81\uac8c",
  strategy: "\uacf5\ub7b5 \uc704\uc8fc",
  mood: "\ubd84\uc704\uae30 \uc704\uc8fc",
  first: "\ucc98\uc74c \ub9cc\ub09c \ud32c\ud140",
  women: "\uc5ec\uc131\ub9cc",
  photo: "\uc0ac\uc9c4 \ucd2c\uc601",
};

const MOCK_POSTS: MatePost[] = [
  { id: 1, title: "\uc774\ubc88 \uc8fc\ub9d0 \uac15\ub0a8\uc810 \uccb4\ubc8c\ub9b0 \uac19\uc774 \uac00\uc2e4 \ubd84?", content: "\uc9c4\uc9c0\ud558\uac8c \uacf5\ub7b5\ud558\uae30\ubcf4\ub2e4 \ubd84\uc704\uae30\ub97c \uc990\uae30\uba70 \ud50c\ub808\uc774\ud558\uace0 \uc2f6\uc5b4\uc694.", authorId: 1, authorNickname: "\uae40\uacf5\ud3ec", locationName: L.gangnam, themeTitle: "\uccb4\ubc8c\ub9b0", playDate: "2026-05-31", reservationTime: "18:30", deadlineDate: "2026-05-29", currentMembers: 2, totalMembers: 3, experienceLevel: "ANY", atmosphereTags: [T.serious, T.fun], contactMethod: "KAKAO", status: "OPEN", isPinned: true, commentCount: 5, createdAt: "2026-05-25T18:30:00" },
  { id: 2, title: "\uac74\ub300\uc810 \uc545\ub9c8\uc758 \uc81c\ub2e8 \uace0\uc218 2\uba85 \uad6c\ud569\ub2c8\ub2e4", content: "\ubc29\ud0c8\ucd9c 20\ud68c \uc774\uc0c1, \uacf5\ud3ec \uc704\uc8fc\ub85c \uc9c4\ud589\ud560 \ubd84 \ubaa8\uc9d1\ud569\ub2c8\ub2e4.", authorId: 3, authorNickname: "\uc815\ubc30\uad00", locationName: L.geondae, themeTitle: "\uc545\ub9c8\uc758 \uc81c\ub2e8", playDate: "2026-05-31", reservationTime: "19:00", deadlineDate: "2026-05-30", currentMembers: 1, totalMembers: 3, experienceLevel: "EXPERT", atmosphereTags: [T.strategy, T.serious], contactMethod: "KAKAO", status: "OPEN", commentCount: 18, createdAt: "2026-05-24T12:00:00" },
  { id: 3, title: "\uac15\ub0a8\uc810 \uccb4\ubc8c\ub9b0 \uc77c\uc694\uc77c \uc800\ub141 4\uc778 \ubaa8\uc9d1", content: "\uc7ac\ubbf8 \uc704\uc8fc\ub85c \ud3b8\ud558\uac8c \uc990\uae30\uace0 \uc2f6\uc5b4\uc694.", authorId: 4, authorNickname: "\ud55c\uc6b8\uc11c\uc6b8", locationName: L.gangnam, themeTitle: "\uccb4\ubc8c\ub9b0", playDate: "2026-05-30", reservationTime: "20:00", deadlineDate: "2026-05-29", currentMembers: 2, totalMembers: 4, experienceLevel: "INTERMEDIATE", atmosphereTags: [T.fun, T.mood], contactMethod: "KAKAO", status: "OPEN", commentCount: 3, createdAt: "2026-05-24T09:00:00" },
  { id: 4, title: "\ud64d\ub300\uc810 \uc800\uc8fc\ubc1b\uc740 \uc220 \uc8fc\ub9d0 \uc624\uc804 \uccab \ubaa8\uc9d1", content: "\uc0ac\uc9c4 \ucc0d\uace0 \uac00\ubccd\uac8c \uc990\uae30\ub294 \ubd84 \ud658\uc601\ud574\uc694.", authorId: 5, authorNickname: "\uadf8\ub85c\ud1a0", locationName: L.hongdae, themeTitle: "\uc800\uc8fc\ubc1b\uc740 \uc220", playDate: "2026-05-30", reservationTime: "10:30", deadlineDate: "2026-05-29", currentMembers: 3, totalMembers: 4, experienceLevel: "BEGINNER", atmosphereTags: [T.fun, T.mood, T.photo], contactMethod: "KAKAO", status: "OPEN", commentCount: 7, createdAt: "2026-05-23T16:00:00" },
  { id: 5, title: "\uac74\ub300\uc810 \uc545\ub9c8\uc758 \ubcd1\uc6d0 \uccab \ubc29\ud0c8\uc744 \ub3c4\uc804\ud574\uc694", content: "\ucd08\ubcf4\ub3c4 \ud3b8\ud558\uac8c \ud568\uaed8\ud560 \ubd84\ub4e4 \ucc3e\uc544\uc694.", authorId: 6, authorNickname: "\ub098\ub3c4\uc804\uc11c", locationName: L.geondae, themeTitle: "\uc545\ub9c8\uc758 \ubcd1\uc6d0", playDate: "2026-05-31", reservationTime: "14:00", deadlineDate: "2026-05-29", currentMembers: 4, totalMembers: 5, experienceLevel: "BEGINNER", atmosphereTags: [T.fun, T.first], contactMethod: "COMMENT", status: "OPEN", commentCount: 2, createdAt: "2026-05-23T11:00:00" },
  { id: 6, title: "\uac15\ub0a8\uc810 \uc0b4\uc778\ub9c8\uc758 \ubc29 3\uc778 \ub531 1\uc790\ub9ac \ub0a8\uc558\uc5b4\uc694", content: "\ub09c\uc774\ub3c4\uac00 \ub192\uc544 \uacbd\ud5d8\uc790\uba74 \uc88b\uaca0\uc2b5\ub2c8\ub2e4.", authorId: 7, authorNickname: "\ucd5c\uae0d\ubc15", locationName: L.gangnam, themeTitle: "\uc0b4\uc778\ub9c8\uc758 \ubc29", playDate: "2026-05-27", reservationTime: "21:00", deadlineDate: "2026-05-26", currentMembers: 3, totalMembers: 3, experienceLevel: "EXPERT", atmosphereTags: [T.serious, T.strategy], contactMethod: "KAKAO", status: "FULL", commentCount: 12, createdAt: "2026-05-22T21:00:00" },
  { id: 7, title: "\uc880\ube44 \uc544\ud3ec\uce7c\ub9bd\uc2a4 \uac19\uc774 \uac08 \uc0ac\ub78c", content: "\uacf5\ub7b5 \uacf5\uc720\ud558\uba70 \uc9c4\uc9c0\ud558\uac8c \ub3c4\uc804\ud560 \uc778\uc6d0\uc744 \ubaa8\uc2ed\ub2c8\ub2e4.", authorId: 8, authorNickname: "\uc774\ud65c\ub3d9", locationName: L.gangnam, themeTitle: "\uc880\ube44 \uc544\ud3ec\uce7c\ub9bd\uc2a4", playDate: "2026-06-01", reservationTime: "20:00", deadlineDate: "2026-05-31", currentMembers: 2, totalMembers: 4, experienceLevel: "EXPERT", atmosphereTags: [T.strategy, T.serious], contactMethod: "KAKAO", status: "OPEN", commentCount: 4, createdAt: "2026-05-22T09:00:00" },
  { id: 8, title: "\ud64d\ub300\uc810 13\ubc88\uc9f8 \ubc29 \uc8fc\ub9d0 \ud3b8\ud558\uac8c \uc990\uae30\uc790", content: "\ucd08\ubcf4\ub3c4 \uad1c\ucc2e\uc2b5\ub2c8\ub2e4.", authorId: 9, authorNickname: "\ubc15\uacf5\ud3ec", locationName: L.hongdae, themeTitle: "13\ubc88\uc9f8 \ubc29", playDate: "2026-06-01", reservationTime: "19:00", deadlineDate: "2026-05-30", currentMembers: 1, totalMembers: 4, experienceLevel: "ANY", atmosphereTags: [T.fun, T.mood], contactMethod: "COMMENT", status: "OPEN", commentCount: 1, createdAt: "2026-05-21T15:00:00" },
];

const AVATAR_COLORS = ["bg-[#e63946]", "bg-[#f39c12]", "bg-[#2ecc71]", "bg-[#3498db]", "bg-[#9b59b6]", "bg-[#e67e22]"];
const ALL_TAGS = [T.serious, T.fun, T.strategy, T.mood, T.first, T.women, T.photo];
const PER_PAGE = 6;

type StatusFilter = "all" | "OPEN" | "CLOSED";

const STATUS_FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: K.all },
  { value: "OPEN", label: K.open },
  { value: "CLOSED", label: K.closed },
];

const BADGE_BASE = "inline-flex h-[18px] items-center rounded-md border px-1.5 text-[10px] font-bold leading-none";
const LOCATION_BADGE_CLS = "border-white/[0.09] bg-[#101010]/80 text-[#858585]";

const EXPERIENCE_MAP = {
  ANY: { label: K.any, cls: "border-white/[0.08] bg-[#101010]/70 text-[#777]" },
  BEGINNER: { label: K.beginner, cls: "border-[#2ecc71]/22 bg-[#101010]/80 text-[#79c99a]" },
  INTERMEDIATE: { label: K.intermediate, cls: "border-[#f39c12]/24 bg-[#101010]/80 text-[#d0a35c]" },
  EXPERT: { label: K.expert, cls: "border-[#7a3f35]/35 bg-[#151111]/80 text-[#b77a6b]" },
};

function getDDayLabel(dateStr: string) {
  const d = getDDay(dateStr);
  if (d < 0) return { text: K.closed, cls: "text-[#888]" };
  if (d === 0) return { text: "D-Day", cls: "text-[#e63946] font-bold" };
  return { text: `D-${d}`, cls: "text-[#f39c12] font-bold" };
}

function MemberDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={["h-2.5 w-2.5 rounded-full border", i < current ? "border-[#e63946] bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.28)]" : "border-white/[0.14] bg-[#101010]"].join(" ")} />
      ))}
    </div>
  );
}

function StatusDropdown({ value, onChange }: { value: StatusFilter; onChange: (value: StatusFilter) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLabel = STATUS_FILTER_OPTIONS.find((option) => option.value === value)?.label ?? K.open;

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <div ref={ref} className="relative w-[124px]">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((prev) => !prev)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} className={["flex h-9 w-full items-center justify-between rounded-xl border bg-[#101010] px-3 text-left text-sm font-bold text-[#f5f5f5] outline-none transition-all", open ? "border-[#cc2222]/75 shadow-[0_0_18px_rgba(204,34,34,0.14)]" : "border-[#cc2222]/38 hover:border-[#cc2222]/65 hover:bg-[#cc2222]/8"].join(" ")}>
        <span>{currentLabel}</span>
        <span aria-hidden="true" className={["ml-2 h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-[#ef5353] transition-transform", open ? "rotate-180" : ""].join(" ")} />
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-[124px] overflow-hidden rounded-xl border border-[#cc2222]/35 bg-[#101010] p-1 shadow-[0_18px_36px_rgba(0,0,0,0.42)]">
          <ul role="listbox" aria-label={K.statusLabel}>
            {STATUS_FILTER_OPTIONS.map((option) => {
              const selected = value === option.value;
              return (
                <li key={option.value} role="option" aria-selected={selected}>
                  <button type="button" onClick={() => { onChange(option.value); setOpen(false); }} className={["flex h-9 w-full items-center justify-between rounded-[9px] px-3 text-left text-sm font-bold transition-colors", selected ? "bg-[#cc2222]/16 text-[#ef5353]" : "text-[#b8b8b8] hover:bg-[#cc2222]/8 hover:text-[#f2f2f2]"].join(" ")}>
                    <span>{option.label}</span>
                    {selected && <span className="h-1.5 w-1.5 rounded-full bg-[#ef5353]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function PostCard({ post }: { post: MatePost }) {
  const avatarColor = AVATAR_COLORS[(post.authorId - 1) % AVATAR_COLORS.length];
  const exp = EXPERIENCE_MAP[post.experienceLevel];
  const isFull = post.status === "FULL" || post.status === "CLOSED" || post.currentMembers >= post.totalMembers;
  const remains = Math.max(post.totalMembers - post.currentMembers, 0);

  return (
    <Link href={`/mate/${post.id}`} className="block">
      <div className="overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717]/92 shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#cc2222]/55 hover:bg-[#1b1b1b] hover:shadow-[0_18px_48px_rgba(204,34,34,0.13)]">
        <div className="flex">
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <div className={["flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white", avatarColor].join(" ")}>{post.authorNickname[0]}</div>
              <span className="mr-1 text-sm font-bold text-[#d8d8d8]">{post.authorNickname}</span>
              {post.isPinned && <span className={[BADGE_BASE, "border-[#d7b46a]/22 bg-[#101010]/70 text-[#b99a5e]"].join(" ")}>{K.pinned}</span>}
              <span className={[BADGE_BASE, LOCATION_BADGE_CLS].join(" ")}>{post.locationName}</span>
              {post.experienceLevel !== "ANY" && <span className={[BADGE_BASE, exp.cls].join(" ")}>{exp.label}</span>}
              <span className={[BADGE_BASE, isFull ? "border-white/[0.06] bg-[#252525] text-[#777]" : "border-[#9f2b2b]/35 bg-[#a72a2a]/78 text-[#f3e8e8]"].join(" ")}>{isFull ? K.closed : K.openCompact}</span>
            </div>
            <h3 className="mb-2 text-[16px] font-black leading-snug text-[#f5f5f5]">{post.title}</h3>
            <div className="mb-3 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs text-[#777]">{post.themeTitle}</span>
              {post.atmosphereTags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs text-[#747474]">{tag}</span>)}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#606060]">
              <span>{post.playDate} {post.reservationTime}</span><span className="text-[#444]">&middot;</span><span>{post.locationName}</span>
              {(post.commentCount ?? 0) > 0 && <><span className="text-[#444]">&middot;</span><span>{K.comment} {post.commentCount}</span></>}
              {post.authorId === 1 && <><span className="text-[#444]">&middot;</span><span className="rounded border border-[#e63946]/35 bg-[#101010] px-1.5 py-0.5 text-xs font-bold text-[#d56a6a]">{K.mine}</span></>}
            </div>
          </div>
          <div className="flex w-[140px] shrink-0 flex-col p-3">
            <div className="flex flex-1 flex-col items-center justify-center rounded-[10px] border border-white/[0.025] bg-white/[0.018] px-3 py-3 text-center">
              <p className="mb-2 text-xs text-[#555]">{K.participants}</p>
              <p className={["mt-1 whitespace-nowrap text-[22px] font-black leading-none", isFull ? "text-[#777]" : "text-[#f5f5f5]"].join(" ")}><span className={isFull ? "" : "text-[#e63946]"}>{post.currentMembers}</span><span className="mx-0.5 text-sm text-[#666]">/</span><span className="text-base text-[#a0a0a0]">{post.totalMembers}</span><span className="ml-0.5 text-xs text-[#777]">{K.people}</span></p>
              <div className="mt-2.5"><MemberDots current={post.currentMembers} total={post.totalMembers} /></div>
              <p className="mt-2.5 text-xs text-[#747474]">{isFull ? K.complete : `${remains}${K.left}`}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MatePage() {
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("OPEN");
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState("");
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...MOCK_POSTS];
    if (activeTab === "mine") list = list.filter((p) => p.authorId === 1);
    if (search) list = list.filter((p) => p.title.includes(search) || p.content.includes(search) || p.locationName.includes(search));
    if (statusFilter === "OPEN") list = list.filter((p) => p.status === "OPEN" && p.currentMembers < p.totalMembers);
    if (statusFilter === "CLOSED") list = list.filter((p) => p.status === "FULL" || p.status === "CLOSED" || p.currentMembers >= p.totalMembers);
    if (locationFilter.length > 0) list = list.filter((p) => locationFilter.includes(p.locationName));
    if (expFilter) list = list.filter((p) => p.experienceLevel === expFilter);
    if (tagFilter.length > 0) list = list.filter((p) => tagFilter.every((t) => p.atmosphereTags.includes(t)));
    list.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    return list;
  }, [activeTab, search, statusFilter, locationFilter, expFilter, tagFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const openCount = MOCK_POSTS.filter((p) => p.status === "OPEN" && p.currentMembers < p.totalMembers).length;
  const toggleLocation = (loc: string) => { setLocationFilter((prev) => prev.includes(loc) ? prev.filter((item) => item !== loc) : [...prev, loc]); setPage(1); };
  const toggleTag = (tag: string) => { setTagFilter((prev) => prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]); setPage(1); };
  const resetFilters = () => { setLocationFilter([]); setExpFilter(""); setTagFilter([]); setPage(1); };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.14),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]" />
      <div className="relative mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <nav className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#777]"><Link href="/" className="transition-colors hover:text-[#f5f5f5]">{K.home}</Link><span>&middot;</span><span className="text-[#f5f5f5]">{K.mateBoard}</span></nav>
        <div className="mb-7 border-b border-white/[0.08] pb-6">
          <p className="mb-2 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">{"// MATE RECRUITMENT"}</p>
          <h1 className="text-[34px] font-black leading-tight text-[#f5f5f5] md:text-[44px]"><span>{"\ud83d\udd25"}</span> <span className="text-[#e63946]">{K.mate}</span> {"\ubaa8\uc9d1"}</h1>
          <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-[#a0a0a0]">{K.headline}<br />{K.subline}</p>
          <div className="mt-5 grid max-w-[520px] grid-cols-3 gap-2.5">{[{ value: openCount, label: K.currentOpen, color: "text-[#f39c12]" }, { value: 8, label: K.todayPost, color: "text-[#2ecc71]" }, { value: "1,247", label: K.totalMatched, color: "text-[#3498db]" }].map((stat) => <div key={stat.label} className="rounded-[12px] border border-white/[0.08] bg-[#101010]/64 px-3 py-3 text-center backdrop-blur"><p className={["text-xl font-black leading-none", stat.color].join(" ")}>{stat.value}</p><p className="mt-1.5 text-[11px] font-bold text-[#8a8a8a]">{stat.label}</p></div>)}</div>
        </div>
        <div className="grid gap-7 lg:grid-cols-[248px_1fr] lg:gap-7">
          <aside className="hidden shrink-0 self-start rounded-[18px] border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur md:block lg:sticky lg:top-24">
            <input type="text" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder={K.search} className="mb-3 h-11 w-full rounded-[10px] border border-white/[0.1] bg-[#101010] px-3 text-sm font-semibold text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/80" />
            <div className="mb-4 rounded-[14px] border border-[#cc2222]/22 bg-[#101010]/22 p-3.5"><p className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#b85a5a]">{K.myStatus}</p><p className="mb-1.5 line-clamp-2 text-sm font-bold leading-snug text-[#dedede]">{MOCK_POSTS[0].title}</p><p className="text-xs leading-relaxed text-[#858585]">{getDDayLabel(MOCK_POSTS[0].deadlineDate).text} &middot; {MOCK_POSTS[0].locationName} &middot; {MOCK_POSTS[0].currentMembers}/{MOCK_POSTS[0].totalMembers}{K.people} {K.open}</p></div>
            <Link href="/mate/write" className="mb-7 flex h-11 w-full items-center justify-center gap-1 rounded-[10px] border border-[#cc2222]/45 bg-[#cc2222]/10 text-sm font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/16 hover:text-white hover:shadow-[0_0_20px_rgba(204,34,34,0.14)]">{K.write}</Link>
            <div className="mb-4 flex items-center justify-between"><span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">{K.filter}</span><button onClick={resetFilters} className="text-xs font-bold text-[#666] transition-colors hover:text-[#e63946]">{K.reset}</button></div>
            <div className="mb-6"><p className="mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#777]">{K.location}</p>{[L.gangnam, L.hongdae, L.geondae].map((loc) => <label key={loc} className="mb-1.5 mr-1.5 inline-flex h-9 cursor-pointer items-center justify-center rounded-full border border-white/[0.1] bg-[#101010] px-3 text-sm font-bold transition-all hover:border-white/20 hover:bg-[#202020] has-[:checked]:border-[#cc2222]/60 has-[:checked]:bg-[#cc2222]/12"><input type="checkbox" checked={locationFilter.includes(loc)} onChange={() => toggleLocation(loc)} className="sr-only" /><span className={locationFilter.includes(loc) ? "text-[#ef5353]" : "text-[#cfcfcf]"}>{loc}</span></label>)}</div>
            <div className="mb-6"><p className="mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#777]">{K.level}</p>{[{ value: "", label: K.anyUser }, { value: "BEGINNER", label: K.beginner }, { value: "EXPERT", label: K.expert }].map((opt) => <label key={opt.value} className="inline-flex cursor-pointer items-center"><input type="radio" name="exp" checked={expFilter === opt.value} onChange={() => { setExpFilter(opt.value); setPage(1); }} className="sr-only" /><span className={["mb-1.5 mr-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all", expFilter === opt.value ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]" : "border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]"].join(" ")}>{opt.label}</span></label>)}</div>
            <div><p className="mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#777]">{K.tag}</p><div className="flex flex-wrap gap-1.5">{ALL_TAGS.map((tag) => <button key={tag} onClick={() => toggleTag(tag)} className={["rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all", tagFilter.includes(tag) ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]" : "border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]"].join(" ")}>{tag}</button>)}</div></div>
          </aside>
          <div className="min-w-0">
            <div className="mb-4 flex items-start gap-3 rounded-[12px] border border-[#d7b46a]/25 bg-[#d7b46a]/8 px-4 py-3 text-xs"><span className="inline-flex h-[20px] shrink-0 items-center rounded-md border border-[#d7b46a]/20 bg-transparent px-2 text-[10px] font-black text-[#c9a85f]">{K.noticeTitle}</span><span className="mt-[2px] hidden text-[#d7b46a]/35 sm:block">&middot;</span><span className="leading-5 text-[#a9956e]">{K.notice}</span></div>
            <div className="mb-4 flex border-b border-white/[0.08]">{[{ id: "all" as const, label: K.all, count: MOCK_POSTS.length }, { id: "mine" as const, label: K.joined, count: MOCK_POSTS.filter((p) => p.authorId === 1).length }].map((tab) => <button key={tab.id} onClick={() => { setActiveTab(tab.id); setPage(1); }} className={["flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-colors", activeTab === tab.id ? "border-b-2 border-[#cc2222] text-[#ef5353]" : "text-[#888] hover:text-[#f5f5f5]"].join(" ")}>{tab.label}<span className={["rounded-full px-1.5 py-0.5 text-xs", activeTab === tab.id ? "bg-[#cc2222] text-white" : "bg-white/[0.08] text-[#888]"].join(" ")}>{tab.count}</span></button>)}</div>
            <div className="mb-4 flex items-center justify-between gap-4 rounded-[12px] border border-white/[0.08] bg-[#171717]/58 px-4 py-2.5"><span className="text-sm font-semibold text-[#8f8f8f]"><span className="font-bold text-[#f5f5f5]">{filtered.length}</span>{K.countSuffix}</span><StatusDropdown value={statusFilter} onChange={(nextValue) => { setStatusFilter(nextValue); setPage(1); }} /></div>
            <div className="space-y-2.5">{paged.map((post) => <PostCard key={post.id} post={post} />)}{paged.length === 0 && <div className="py-16 text-center text-[#888]"><p>{K.noResult}</p></div>}</div>
            {totalPages > 1 && <div className="mt-8 flex items-center justify-center gap-1"><button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30">{"<"}</button>{Array.from({ length: totalPages }).map((_, i) => <button key={i} onClick={() => setPage(i + 1)} className={["flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors", page === i + 1 ? "border-[#e63946] bg-[#e63946]/10 text-[#e63946]" : "border-[#2a2a2a] text-[#888] hover:border-[#555]"].join(" ")}>{i + 1}</button>)}<button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30">{">"}</button></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
