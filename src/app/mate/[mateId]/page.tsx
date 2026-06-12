"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MateComment, MatePost } from "@/types/mate";
import { formatRelativeTime, getDDay } from "@/lib/formatDate";

type DetailMatePost = MatePost & {
  cafeName?: string | null;
  storeName?: string | null;
  branchName?: string | null;
  themeName?: string | null;
  currentParticipants?: number;
  maxParticipants?: number;
  branch?: {
    storeName?: string | null;
    name?: string | null;
  } | null;
  theme?: {
    title?: string | null;
  } | null;
};

const K = {
  home: "홈",
  board: "메이트 모집",
  recruiting: "모집 중",
  closed: "마감",
  pinned: "고정",
  myPost: "내 모집 글",
  summary: "모집 요약",
  detail: "모집 정보",
  cafe: "방탈출 카페명",
  branch: "지점명",
  theme: "테마명",
  playDate: "플레이 날짜",
  time: "예약 시간",
  members: "모집 인원",
  remaining: "남은 자리",
  deadline: "모집 마감",
  contact: "연락 방법",
  comments: "댓글",
  commentPlaceholder: "댓글을 입력하세요.",
  submit: "등록",
  list: "목록으로",
  apply: "참여하기",
  applied: "참여 신청 완료",
  noComment: "아직 댓글이 없습니다.",
  firstComment: "첫 댓글을 남겨보세요.",
  people: "명",
  left: "자리 남음",
};

const MOCK_POSTS: DetailMatePost[] = [
  {
    id: 1,
    title: "이번 주말 강남점 체벌린 같이 가실 분?",
    content:
      "공포 방탈출을 좋아하지만 너무 빡빡하게 공략하기보다는 분위기를 즐기면서 플레이하고 싶어요.\n\n초보도 괜찮고, 끝나고 근처에서 간단히 후기 나눌 분이면 더 좋습니다. 신청 후 댓글로 가능한 연락 방법 남겨주세요.",
    authorId: 1,
    authorNickname: "김공포",
    cafeName: "그림게이트",
    branchName: "강남점",
    locationName: "강남점",
    themeName: "체벌린",
    themeTitle: "체벌린",
    playDate: "2026-05-31",
    reservationTime: "18:30",
    deadlineDate: "2026-05-29",
    currentMembers: 2,
    totalMembers: 3,
    experienceLevel: "ANY",
    atmosphereTags: ["진지하게", "즐겁게"],
    contactMethod: "KAKAO",
    status: "OPEN",
    isPinned: true,
    commentCount: 5,
    createdAt: "2026-05-25T18:30:00",
  },
  {
    id: 2,
    title: "건대점 악마의 제단 고수 2명 구합니다",
    content:
      "이번이 두 번째 도전입니다. 이번에는 반드시 클리어를 목표로 공략 중심으로 진행할 분을 모집합니다.\n\n방탈출 20회 이상, 공포 테마 경험이 있는 분이면 좋아요. 카카오 오픈채팅으로 연락 주시면 코드 공유드리겠습니다.",
    authorId: 3,
    authorNickname: "정배관",
    storeName: "그림게이트",
    branchName: "건대점",
    locationName: "건대점",
    themeName: "악마의 제단",
    themeTitle: "악마의 제단",
    playDate: "2026-05-31",
    reservationTime: "19:00",
    deadlineDate: "2026-05-30",
    currentMembers: 1,
    totalMembers: 3,
    experienceLevel: "EXPERT",
    atmosphereTags: ["공략 위주", "진지하게"],
    contactMethod: "KAKAO",
    contactLink: "https://open.kakao.com/o/mock",
    status: "OPEN",
    commentCount: 8,
    createdAt: "2026-05-24T12:00:00",
  },
];

const MOCK_COMMENTS: MateComment[] = [
  { id: 1, postId: 2, userId: 10, userNickname: "이달빛", content: "방탈출 30회 정도 경험 있습니다. 오픈채팅 링크 부탁드려요.", createdAt: "2026-05-24T13:00:00" },
  { id: 2, postId: 2, userId: 11, userNickname: "나도탈출", content: "악마의 제단 아직 클리어 못 했는데 이번에 같이 도전해보고 싶어요.", createdAt: "2026-05-24T14:30:00" },
  { id: 3, postId: 2, userId: 3, userNickname: "정배관", content: "관심 감사합니다. 신청 주시면 순서대로 연락드릴게요.", createdAt: "2026-05-24T16:30:00" },
];

const AVATAR_COLORS = ["bg-[#e63946]", "bg-[#f39c12]", "bg-[#2ecc71]", "bg-[#3498db]", "bg-[#9b59b6]", "bg-[#e67e22]"];

const EXPERIENCE_MAP = {
  ANY: { label: "무관", cls: "border-white/[0.08] bg-[#101010]/70 text-[#777]" },
  BEGINNER: { label: "입문자 환영", cls: "border-[#2ecc71]/22 bg-[#101010]/80 text-[#79c99a]" },
  INTERMEDIATE: { label: "중급자 우대", cls: "border-[#f39c12]/24 bg-[#101010]/80 text-[#d0a35c]" },
  EXPERT: { label: "경험자 우대", cls: "border-[#7a3f35]/35 bg-[#151111]/80 text-[#b77a6b]" },
};

function avatarColor(id: number) {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}

function getDDayLabel(dateStr?: string) {
  if (!dateStr) return { text: "-", cls: "text-[#777]" };
  const d = getDDay(dateStr);
  if (d < 0) return { text: K.closed, cls: "text-[#888]" };
  if (d === 0) return { text: "D-Day", cls: "font-bold text-[#e63946]" };
  return { text: `D-${d}`, cls: "font-bold text-[#f39c12]" };
}

function formatDateValue(value?: string | number[]) {
  if (!value) return "-";
  if (Array.isArray(value)) {
    const [year, month, day, hour, minute] = value;
    if (hour !== undefined) return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute ?? 0).padStart(2, "0")}`;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  return value;
}

function MemberDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: Math.max(total, 1) }).map((_, index) => (
        <span
          key={index}
          className={[
            "h-2.5 w-2.5 rounded-full border",
            index < current ? "border-[#e63946] bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.28)]" : "border-white/[0.14] bg-[#101010]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={["inline-flex h-[22px] items-center rounded-md border px-2 text-[11px] font-bold", className].join(" ")}>{children}</span>;
}

function SummaryItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[11px] font-black text-[#626262]">{label}</p>
      <p className="truncate text-sm font-bold text-[#e7e7e7]">{value}</p>
    </div>
  );
}

function CommentItem({ comment, authorId }: { comment: MateComment; authorId: number }) {
  const isAuthorReply = comment.userId === authorId;
  return (
    <div className={["border-b border-white/[0.045] py-3", isAuthorReply ? "bg-[#cc2222]/[0.035]" : ""].join(" ")}>
      <div className="flex gap-2.5">
        <div className={["flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white", avatarColor(comment.userId)].join(" ")}>
          {comment.userNickname[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#f5f5f5]">{comment.userNickname}</span>
            {isAuthorReply && <span className="rounded border border-[#cc2222]/35 bg-[#cc2222]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#ef5353]">작성자</span>}
            <span className="text-xs text-[#555]">{formatRelativeTime(comment.createdAt)}</span>
          </div>
          <p className="text-xs leading-relaxed text-[#bdbdbd]">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}

export default function MateDetailPage({ params }: { params: Promise<{ mateId: string }> }) {
  const { mateId } = use(params);
  const post = MOCK_POSTS.find((item) => item.id === Number(mateId)) ?? MOCK_POSTS[1];
  const comments = MOCK_COMMENTS.filter((comment) => comment.postId === post.id);
  const [commentText, setCommentText] = useState("");
  const [applied, setApplied] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const cafeName = post.cafeName ?? post.storeName ?? post.branch?.storeName ?? null;
  const branchName = post.branchName ?? post.branch?.name ?? post.locationName ?? "-";
  const themeName = post.themeName ?? post.theme?.title ?? post.themeTitle ?? "-";
  const currentParticipants = post.currentParticipants ?? post.currentMembers ?? 0;
  const maxParticipants = post.maxParticipants ?? post.totalMembers ?? 0;
  const remaining = Math.max(maxParticipants - currentParticipants, 0);
  const exp = EXPERIENCE_MAP[post.experienceLevel] ?? EXPERIENCE_MAP.ANY;
  const isFull = post.status === "FULL" || post.status === "CLOSED" || currentParticipants >= maxParticipants;
  const isMyPost = post.authorId === 1;
  const dday = getDDayLabel(post.deadlineDate);
  const visibleComments = showAllComments ? comments : comments.slice(0, 4);

  const handleApply = () => {
    if (!isFull && !applied) setApplied(true);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24 text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.13),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]" />

      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs font-bold text-[#777]">
            <Link href="/" className="transition-colors hover:text-[#f5f5f5]">{K.home}</Link>
            <span>&middot;</span>
            <Link href="/mate" className="transition-colors hover:text-[#f5f5f5]">{K.board}</Link>
            <span>&middot;</span>
            <span className="line-clamp-1 max-w-xs text-[#aaa]">{post.title}</span>
          </nav>
        </div>
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className={isFull ? "border-white/[0.08] bg-[#252525] text-[#777]" : "border-[#9f2b2b]/35 bg-[#a72a2a]/80 text-white"}>{isFull ? K.closed : K.recruiting}</Badge>
              {cafeName && <Badge className="border-white/[0.09] bg-[#101010]/80 text-[#9a9a9a]">{cafeName}</Badge>}
              <Badge className="border-white/[0.09] bg-[#101010]/80 text-[#858585]">{branchName}</Badge>
              <Badge className="border-white/[0.09] bg-[#101010]/80 text-[#d0d0d0]">{themeName}</Badge>
              <Badge className={exp.cls}>{exp.label}</Badge>
              {post.isPinned && <Badge className="border-[#d7b46a]/22 bg-[#101010]/70 text-[#b99a5e]">{K.pinned}</Badge>}
            </div>

            <div className="mb-5 rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.25)]">
              <div className="mb-4 flex flex-wrap items-start gap-3 border-b border-white/[0.055] pb-4">
                <div className={["flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white", avatarColor(post.authorId)].join(" ")}>
                  {post.authorNickname[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-[22px] font-black leading-snug text-[#f5f5f5] md:text-[28px]">{post.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#707070]">
                    <span className="font-bold text-[#bdbdbd]">{post.authorNickname}</span>
                    {isMyPost && <span className="rounded border border-[#cc2222]/35 bg-[#cc2222]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#ef5353]">{K.myPost}</span>}
                    <span>&middot;</span>
                    <span>{formatRelativeTime(post.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.atmosphereTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs font-bold text-[#777]">{tag}</span>
                ))}
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-[#c9c9c9]">{post.content}</p>
            </div>

            <div className="mb-5 rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-sm font-black text-[#f5f5f5]">{K.summary}</h2>
                <span className={["text-xs", dday.cls].join(" ")}>{dday.text}</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryItem label={K.cafe} value={cafeName ?? "-"} />
                <SummaryItem label={K.branch} value={branchName} />
                <SummaryItem label={K.theme} value={themeName} />
                <SummaryItem label={K.playDate} value={formatDateValue(post.playDate)} />
                <SummaryItem label={K.time} value={formatDateValue(post.reservationTime)} />
                <SummaryItem label={K.members} value={`${currentParticipants}/${maxParticipants}${K.people}`} />
                <SummaryItem label={K.remaining} value={isFull ? K.closed : `${remaining}${K.left}`} />
                <SummaryItem label={K.deadline} value={formatDateValue(post.deadlineDate)} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.055] bg-[#101010]/70 px-4 py-3">
                <MemberDots current={currentParticipants} total={maxParticipants} />
                <span className="text-sm font-bold text-[#d8d8d8]">
                  {currentParticipants}{K.people} 참여 중 <span className="mx-1 text-[#555]">&middot;</span> {isFull ? K.closed : `${remaining}${K.left}`}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
              <h2 className="mb-4 text-sm font-black text-[#f5f5f5]">{K.detail}</h2>
              <div className="grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
                <SummaryItem label={K.cafe} value={cafeName ?? "-"} />
                <SummaryItem label={K.branch} value={branchName} />
                <SummaryItem label={K.theme} value={themeName} />
                <SummaryItem label={K.contact} value={post.contactMethod === "KAKAO" ? "카카오 오픈채팅" : "댓글 문의"} />
                <SummaryItem label={K.playDate} value={formatDateValue(post.playDate)} />
                <SummaryItem label={K.time} value={formatDateValue(post.reservationTime)} />
              </div>
            </div>
          </section>

          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="rounded-xl border border-white/[0.08] bg-[#171717]/92 shadow-[0_16px_42px_rgba(0,0,0,0.25)]">
              <div className="border-b border-white/[0.06] px-4 py-3">
                <h2 className="text-sm font-black text-[#f5f5f5]">
                  {K.comments} <span className="text-[#ef5353]">{post.commentCount ?? comments.length}</span>
                </h2>
              </div>

              <div className="max-h-[430px] overflow-y-auto px-4">
                {comments.length === 0 && (
                  <div className="py-7 text-center">
                    <p className="text-xs font-bold text-[#777]">{K.noComment}</p>
                    <p className="mt-1 text-[11px] text-[#555]">{K.firstComment}</p>
                  </div>
                )}
                {visibleComments.map((comment) => <CommentItem key={comment.id} comment={comment} authorId={post.authorId} />)}
                {!showAllComments && comments.length > visibleComments.length && (
                  <button type="button" onClick={() => setShowAllComments(true)} className="w-full border-b border-white/[0.045] py-3 text-xs font-bold text-[#888] transition-colors hover:text-[#f5f5f5]">
                    댓글 더보기 ({comments.length - visibleComments.length})
                  </button>
                )}
              </div>

              <div className="border-t border-white/[0.06] px-4 py-3">
                <textarea
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  placeholder={K.commentPlaceholder}
                  rows={3}
                  className="mb-2 w-full resize-none rounded-lg border border-white/[0.08] bg-[#0d0d0d] p-3 text-xs text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/70"
                />
                <button
                  type="button"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="h-9 w-full rounded-lg bg-[#e63946] text-xs font-black text-white transition-colors hover:bg-[#c1121f] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {K.submit}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center pointer-events-none">
        <div className="w-full max-w-7xl pointer-events-auto">
          <div className="border-t border-white/[0.06] bg-[#0d0d0d]/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-end gap-3">
              <Link href="/mate" className="rounded-lg border border-white/[0.1] px-4 py-2.5 text-sm font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-[#f5f5f5]">
                {K.list}
              </Link>
              {isMyPost ? (
                <button type="button" disabled className="rounded-lg bg-[#2a2a2a] px-6 py-2.5 text-sm font-bold text-[#666]">
                  {K.myPost}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={isFull || applied}
                  className={[
                    "rounded-lg px-6 py-2.5 text-sm font-black transition-colors",
                    applied ? "cursor-default bg-[#2ecc71] text-white" : isFull ? "cursor-not-allowed bg-[#2a2a2a] text-[#555]" : "bg-[#e63946] text-white hover:bg-[#c1121f]",
                  ].join(" ")}
                >
                  {applied ? K.applied : isFull ? K.closed : K.apply}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
