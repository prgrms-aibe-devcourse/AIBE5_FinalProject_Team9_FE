"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getEffectiveMateStatus, isMatePostClosed } from "@/lib/mateStatus";
import { getMatePosts } from "@/services/mateService";
import {
  MateExperienceLevel,
  MatePost,
  MatePostListResponse,
  MatePostStatus,
} from "@/types/mate";

const PAGE_SIZE = 10;

const STATUS_OPTIONS: { value: "" | MatePostStatus; label: string }[] = [
  { value: "", label: "전체" },
  { value: "DRAFT", label: "임시저장" },
  { value: "RECRUITING", label: "모집중" },
  { value: "CLOSING_SOON", label: "마감임박" },
  { value: "MATCHED", label: "매칭완료" },
  { value: "CLOSED", label: "마감" },
  { value: "DELETED", label: "삭제됨" },
];

const EXPERIENCE_OPTIONS: { value: "" | MateExperienceLevel; label: string }[] = [
  { value: "", label: "무관" },
  { value: "BEGINNER", label: "초보" },
  { value: "INTERMEDIATE", label: "중급" },
  { value: "EXPERT", label: "숙련자" },
];

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "deadline", label: "마감순" },
  { value: "meetingTime", label: "모임순" },
];

const STATUS_LABEL: Record<MatePostStatus, string> = {
  DRAFT: "임시저장",
  RECRUITING: "모집중",
  CLOSING_SOON: "마감임박",
  MATCHED: "매칭완료",
  CLOSED: "마감",
  DELETED: "삭제됨",
};

const EXPERIENCE_LABEL: Record<MateExperienceLevel, string> = {
  ANY: "무관",
  BEGINNER: "초보",
  INTERMEDIATE: "중급",
  EXPERT: "숙련자",
};

const EMPTY_RESPONSE: MatePostListResponse = {
  items: [],
  page: 0,
  size: PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
};

function formatDateTime(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function getPlaceLabel(post: MatePost) {
  return [post.storeName, post.branchName, post.region].filter(Boolean).join(" · ");
}

function getStatusClass(status: MatePostStatus) {
  if (status === "RECRUITING") return "border-[#9f2b2b]/35 bg-[#a72a2a]/78 text-[#f3e8e8]";
  if (status === "CLOSING_SOON") return "border-[#f39c12]/35 bg-[#f39c12]/10 text-[#f0b35f]";
  if (status === "MATCHED") return "border-[#2ecc71]/25 bg-[#2ecc71]/10 text-[#75d799]";
  return "border-white/[0.08] bg-[#252525] text-[#777]";
}

function getExperienceClass(level: MateExperienceLevel) {
  if (level === "BEGINNER") return "border-[#2ecc71]/22 bg-[#101010]/80 text-[#79c99a]";
  if (level === "INTERMEDIATE") return "border-[#f39c12]/24 bg-[#101010]/80 text-[#d0a35c]";
  if (level === "EXPERT") return "border-[#7a3f35]/35 bg-[#151111]/80 text-[#b77a6b]";
  return "border-white/[0.08] bg-[#101010]/70 text-[#777]";
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={["inline-flex h-[20px] items-center rounded-md border px-2 text-[11px] font-bold", className].join(" ")}>
      {children}
    </span>
  );
}

function MemberDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: Math.max(total, 1) }).map((_, index) => (
        <span
          key={index}
          className={[
            "h-2.5 w-2.5 rounded-full border",
            index < current
              ? "border-[#e63946] bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.28)]"
              : "border-white/[0.14] bg-[#101010]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: MatePost }) {
  const effectiveStatus = getEffectiveMateStatus(post);
  const isFull = isMatePostClosed(post);
  const remains = Math.max(post.maxPeople - post.currentPeople, 0);
  const place = getPlaceLabel(post);

  return (
    <Link href={`/mate/${post.id}`} className="group block cursor-pointer">
      <article className="overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717]/92 shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#e63946]/70 group-hover:bg-[#1b1b1b] group-hover:shadow-[0_18px_52px_rgba(230,57,70,0.18)]">
        <div className="flex max-md:flex-col">
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">
                {post.authorNickname[0] ?? "?"}
              </div>
              <span className="mr-1 text-sm font-bold text-[#d8d8d8]">{post.authorNickname}</span>
              <Badge className={getStatusClass(effectiveStatus)}>{STATUS_LABEL[effectiveStatus]}</Badge>
              <Badge className={getExperienceClass(post.experienceLevel)}>{EXPERIENCE_LABEL[post.experienceLevel]}</Badge>
            </div>

            <h3 className="mb-2 text-[17px] font-black leading-snug text-[#f5f5f5]">{post.title}</h3>
            <p className="mb-3 line-clamp-2 text-sm leading-6 text-[#9a9a9a]">{post.content}</p>

            <div className="mb-3 flex flex-wrap gap-1.5">
              <Badge className="border-white/[0.07] bg-[#101010] text-[#d0d0d0]">{post.themeTitle || "테마 정보 없음"}</Badge>
              {place && <Badge className="border-white/[0.07] bg-[#101010] text-[#777]">{place}</Badge>}
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs text-[#747474]">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#606060]">
              <span>모임 {formatDateTime(post.meetingTime)}</span>
              <span className="text-[#444]">&middot;</span>
              <span>마감 {formatDateTime(post.deadline)}</span>
            </div>
          </div>

          <div className="flex w-[150px] shrink-0 flex-col p-2.5 max-md:w-full">
            <div className="flex flex-1 flex-col items-center justify-center rounded-[10px] border border-white/[0.025] bg-white/[0.018] px-3 py-2.5 text-center">
              <p className="mb-1.5 text-xs text-[#555]">참여 현황</p>
              <p className={["whitespace-nowrap text-[21px] font-black leading-none", isFull ? "text-[#777]" : "text-[#f5f5f5]"].join(" ")}>
                <span className={isFull ? "" : "text-[#e63946]"}>{post.currentPeople}</span>
                <span className="mx-0.5 text-sm text-[#666]">/</span>
                <span className="text-base text-[#a0a0a0]">{post.maxPeople}</span>
                <span className="ml-0.5 text-xs text-[#777]">명</span>
              </p>
              <div className="mt-2">
                <MemberDots current={post.currentPeople} total={post.maxPeople} />
              </div>
              <p className="mt-2 text-xs text-[#747474]">{isFull ? "모집 완료" : `${remains}자리 남음`}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-[#777]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-[10px] border border-white/[0.1] bg-[#101010] px-3 text-sm font-bold text-[#f5f5f5] outline-none transition-colors focus:border-[#cc2222]/75"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function MatePage() {
  const [tab, setTab] = useState<"all" | "mine">("all");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(0);
  const [response, setResponse] = useState<MatePostListResponse>(EMPTY_RESPONSE);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPage(0), 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [keyword]);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorMessage("");

    getMatePosts({
      tab,
      keyword: keyword.trim() || undefined,
      status: status as MatePostStatus | "",
      experienceLevel: experienceLevel as MateExperienceLevel | "",
      sort,
      page,
      size: PAGE_SIZE,
    })
      .then((data) => {
        if (isMounted) setResponse(data);
      })
      .catch(() => {
        if (isMounted) {
          setResponse(EMPTY_RESPONSE);
          setErrorMessage("메이트 모집 글을 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [experienceLevel, keyword, page, sort, status, tab]);

  const recruitingCount = useMemo(
    () =>
      response.items.filter(
        (post) => getEffectiveMateStatus(post) === "RECRUITING",
      ).length,
    [response.items],
  );
  const closingSoonCount = useMemo(
    () =>
      response.items.filter(
        (post) => getEffectiveMateStatus(post) === "CLOSING_SOON",
      ).length,
    [response.items],
  );

  const resetFilters = () => {
    setKeyword("");
    setStatus("");
    setExperienceLevel("");
    setSort("latest");
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.14),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]" />
      <div className="relative mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <nav className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#777]">
          <Link href="/" className="transition-colors hover:text-[#f5f5f5]">홈</Link>
          <span>&middot;</span>
          <span className="text-[#f5f5f5]">메이트 모집</span>
        </nav>

        <div className="mb-7 border-b border-white/[0.08] pb-6">
          <p className="mb-2 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">{"// MATE RECRUITMENT"}</p>
          <h1 className="text-[34px] font-black leading-tight text-[#f5f5f5] md:text-[44px]">
            <span className="text-[#e63946]">메이트</span> 모집
          </h1>
          <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-[#a0a0a0]">
            원하는 테마, 날짜, 분위기에 맞는 파티를 찾아보세요.
          </p>
          <div className="mt-5 grid max-w-[520px] grid-cols-3 gap-2.5">
            {[
              { value: response.totalElements, label: "전체 모집", color: "text-[#f39c12]" },
              { value: recruitingCount, label: "현재 모집중", color: "text-[#2ecc71]" },
              { value: closingSoonCount, label: "마감임박", color: "text-[#e63946]" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[12px] border border-white/[0.08] bg-[#101010]/64 px-3 py-3 text-center backdrop-blur">
                <p className={["text-xl font-black leading-none", stat.color].join(" ")}>{stat.value}</p>
                <p className="mt-1.5 text-[11px] font-bold text-[#8a8a8a]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[248px_1fr] lg:gap-7">
          <aside className="hidden shrink-0 self-start rounded-[18px] border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur md:block lg:sticky lg:top-24">
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="모집 글 검색"
              className="mb-4 h-11 w-full rounded-[10px] border border-white/[0.1] bg-[#101010] px-3 text-sm font-semibold text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/80"
            />
            <Link href="/mate/write" className="mb-7 flex h-11 w-full items-center justify-center gap-1 rounded-[10px] border border-[#cc2222]/45 bg-[#cc2222]/10 text-sm font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/16 hover:text-white hover:shadow-[0_0_20px_rgba(204,34,34,0.14)]">
              + 메이트 모집 글쓰기
            </Link>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">필터</span>
              <button onClick={resetFilters} className="text-xs font-bold text-[#666] transition-colors hover:text-[#e63946]">초기화</button>
            </div>
            <div className="space-y-5">
              <SelectFilter label="모집 상태" value={status} options={STATUS_OPTIONS} onChange={(value) => { setStatus(value); setPage(0); }} />
              <SelectFilter label="경험 레벨" value={experienceLevel} options={EXPERIENCE_OPTIONS} onChange={(value) => { setExperienceLevel(value); setPage(0); }} />
              <SelectFilter label="정렬" value={sort} options={SORT_OPTIONS} onChange={(value) => { setSort(value); setPage(0); }} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex border-b border-white/[0.08]">
              {[
                { id: "all" as const, label: "전체" },
                { id: "mine" as const, label: "참여/모집" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setTab(item.id); setPage(0); }}
                  className={[
                    "flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-colors",
                    tab === item.id ? "border-b-2 border-[#cc2222] text-[#ef5353]" : "text-[#888] hover:text-[#f5f5f5]",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-white/[0.08] bg-[#171717]/58 px-4 py-2.5">
              <span className="text-sm font-semibold text-[#8f8f8f]">
                <span className="font-bold text-[#f5f5f5]">{response.totalElements}</span>개의 모집 글
              </span>
              <div className="flex gap-2 md:hidden">
                <SelectFilter label="상태" value={status} options={STATUS_OPTIONS} onChange={(value) => { setStatus(value); setPage(0); }} />
              </div>
            </div>

            {isLoading ? (
              <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] py-20 text-center text-sm font-bold text-[#888]">
                메이트 모집 글을 불러오는 중입니다.
              </div>
            ) : errorMessage ? (
              <div className="rounded-[14px] border border-[#cc2222]/35 bg-[#171717] py-20 text-center">
                <p className="text-sm font-black text-[#ef5353]">{errorMessage}</p>
                <p className="mt-2 text-xs text-[#777]">백엔드 서버 또는 API 응답을 확인해주세요.</p>
              </div>
            ) : response.items.length === 0 ? (
              <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] py-20 text-center">
                <p className="text-sm font-black text-[#d8d8d8]">조건에 맞는 모집 글이 없습니다.</p>
                <p className="mt-2 text-xs text-[#777]">검색어 또는 필터를 바꿔보세요.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {response.items.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {response.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-1">
                <button
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={response.page <= 0}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30"
                >
                  {"<"}
                </button>
                {Array.from({ length: response.totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index)}
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors",
                      response.page === index ? "border-[#e63946] bg-[#e63946]/10 text-[#e63946]" : "border-[#2a2a2a] text-[#888] hover:border-[#555]",
                    ].join(" ")}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((prev) => Math.min(response.totalPages - 1, prev + 1))}
                  disabled={!response.hasNext}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30"
                >
                  {">"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
