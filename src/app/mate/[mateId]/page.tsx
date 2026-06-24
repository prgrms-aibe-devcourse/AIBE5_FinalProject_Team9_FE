"use client";

import { use, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/common/ConfirmModal";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import RatingStars from "@/components/common/RatingStars";
import {
  closeMatePost,
  createMateComment,
  createMateCommentReply,
  deleteMatePost,
  deleteMateComment,
  getMateComments,
  getMatePostById,
  getMatePostParticipants,
  getMyMateParticipations,
  joinMatePost,
  leaveMatePost,
  MateComment,
  MateCommentItem,
  MateCommentReply,
  updateMateComment,
} from "@/services/mateService";
import { getThemeById, getThemes } from "@/services/themeService";
import {
  MateExperienceLevel,
  MateParticipantListResponse,
  MatePost,
  MatePostStatus,
} from "@/types/mate";
import { Theme, ThemeDetail } from "@/types/theme";
import { formatRelativeTime } from "@/lib/formatDate";
import { useAuthStore } from "@/stores/authStore";

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

function formatPrice(value?: number) {
  if (value === undefined || value === null) return "정보 없음";
  return `${value.toLocaleString()}원`;
}

function isValidPeopleRange(minPlayers?: number, maxPlayers?: number) {
  if (!minPlayers || !maxPlayers) return false;
  return (
    minPlayers > 0 &&
    maxPlayers > 0 &&
    minPlayers <= maxPlayers &&
    maxPlayers <= 20
  );
}

function isValidDuration(duration?: number) {
  return Boolean(duration && duration >= 10 && duration <= 240);
}

function mergeThemeData(
  detail: ThemeDetail,
  fallback?: Theme,
  fallbackTitle?: string,
): ThemeDetail {
  return {
    ...detail,
    title: detail.title || fallback?.title || fallbackTitle || "",
    description: detail.description || fallback?.description || "",
    genre: detail.genre || fallback?.genre || "",
    imageUrl: detail.imageUrl || fallback?.imageUrl || "",
    locationName: detail.locationName || fallback?.locationName,
    storeName: detail.storeName || fallback?.storeName,
    branchName: detail.branchName || fallback?.branchName,
    minPlayers: isValidPeopleRange(detail.minPlayers, detail.maxPlayers)
      ? detail.minPlayers
      : (fallback?.minPlayers ?? detail.minPlayers),
    maxPlayers: isValidPeopleRange(detail.minPlayers, detail.maxPlayers)
      ? detail.maxPlayers
      : (fallback?.maxPlayers ?? detail.maxPlayers),
    duration: isValidDuration(detail.duration)
      ? detail.duration
      : (fallback?.duration ?? detail.duration),
    price: detail.price || fallback?.price || 0,
    rating: detail.rating || fallback?.rating || 0,
    reviewCount: detail.reviewCount || fallback?.reviewCount || 0,
  };
}

function getStatusClass(status: MatePostStatus) {
  if (status === "RECRUITING")
    return "border-[#9f2b2b]/35 bg-[#a72a2a]/80 text-white";
  if (status === "CLOSING_SOON")
    return "border-[#f39c12]/35 bg-[#f39c12]/10 text-[#f0b35f]";
  if (status === "MATCHED")
    return "border-[#2ecc71]/25 bg-[#2ecc71]/10 text-[#75d799]";
  return "border-white/[0.08] bg-[#252525] text-[#777]";
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex h-[22px] items-center rounded-md border px-2 text-[11px] font-bold",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function isMyMatePost(post: MatePost | null, userId?: number) {
  if (!post) return false;
  return Boolean(userId && userId === post.memberId);
}

function MateSkullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
      />
    </svg>
  );
}

function MateLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
      />
    </svg>
  );
}

function MateRatingIcons({
  level,
  type,
}: {
  level: number;
  type: "horror" | "difficulty";
}) {
  const Icon = type === "horror" ? MateSkullIcon : MateLockIcon;
  const activeColor = type === "horror" ? "text-[#c94a4a]" : "text-[#d7b46a]";
  const activeShadow =
    type === "horror"
      ? "drop-shadow-[0_0_5px_rgba(204,34,34,0.16)]"
      : "drop-shadow-[0_0_5px_rgba(215,180,106,0.2)]";

  return (
    <span className="inline-flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          className={[
            "h-4 w-4 transition-all",
            index < level
              ? `${activeColor} ${activeShadow} opacity-100`
              : "text-[#303030] opacity-45",
          ].join(" ")}
        />
      ))}
    </span>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[11px] font-black text-[#626262]">{label}</p>
      <p className="truncate text-sm font-bold text-[#e7e7e7]">{value}</p>
    </div>
  );
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{
    message?: string;
    data?: { message?: string };
  }>;
  return (
    axiosError.response?.data?.message ??
    axiosError.response?.data?.data?.message ??
    fallback
  );
}

const EMPTY_PARTICIPANTS: MateParticipantListResponse = {
  currentPeople: 0,
  maxPeople: 0,
  items: [],
};

function ThemePreviewModal({
  theme,
  fallbackTitle,
  isLoading,
  errorMessage,
  onClose,
}: {
  theme: ThemeDetail | null;
  fallbackTitle?: string;
  isLoading: boolean;
  errorMessage: string;
  onClose: () => void;
}) {
  const title = theme?.title || fallbackTitle || "정보 없음";
  const description =
    theme?.story ||
    theme?.description ||
    "테마 설명이 아직 준비되지 않았습니다.";
  const minPlayers = theme?.minPlayers ?? 0;
  const maxPlayers = theme?.maxPlayers ?? 0;
  const detailItems = theme
    ? [
        {
          label: "공포도",
          value: (
            <MateRatingIcons level={theme.horrorLevel || 0} type="horror" />
          ),
        },
        {
          label: "난이도",
          value: (
            <MateRatingIcons level={theme.difficulty || 0} type="difficulty" />
          ),
        },
        {
          label: "인원",
          value: isValidPeopleRange(minPlayers, maxPlayers)
            ? `${minPlayers}~${maxPlayers}명`
            : "정보 없음",
        },
        {
          label: "플레이타임",
          value: isValidDuration(theme.duration)
            ? `${theme.duration}분`
            : "정보 없음",
        },
        { label: "가격", value: formatPrice(theme.price) },
        {
          label: "평점",
          value: (
            <RatingStars
              value={theme.rating || 0}
              showValue
              reviewCount={theme.reviewCount || 0}
              size="xs"
            />
          ),
        },
      ]
    : [];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151515] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#e63946]">
              Theme Preview
            </p>
            <h2 className="mt-1 text-lg font-black text-[#f5f5f5]">
              테마 정보
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-white"
          >
            닫기
          </button>
        </div>

        <div className="max-h-[calc(88vh-72px)] overflow-y-auto p-5">
          {isLoading ? (
            <div className="py-16 text-center text-sm font-bold text-[#888]">
              테마 정보를 불러오는 중입니다.
            </div>
          ) : errorMessage ? (
            <div className="rounded-xl border border-[#e63946]/20 bg-[#e63946]/10 px-4 py-8 text-center text-sm font-bold text-[#ff8b8b]">
              {errorMessage}
            </div>
          ) : theme ? (
            <div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.08] bg-[#101010]">
                <ImageWithFallback
                  src={theme.imageUrl}
                  fallbackSrc="/images/theme-placeholder.png"
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>

              <div className="mt-5 min-w-0">
                <h3 className="text-2xl font-black leading-snug text-[#f5f5f5] md:text-3xl">
                  {title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    theme.storeName,
                    theme.branchName,
                    theme.locationName,
                    theme.genre,
                  ]
                    .filter(Boolean)
                    .map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs font-bold text-[#888]"
                      >
                        {item}
                      </span>
                    ))}
                </div>

                <p className="mt-4 whitespace-pre-line rounded-xl border border-white/[0.06] bg-[#101010]/70 px-4 py-3 text-sm leading-7 text-[#c9c9c9]">
                  {description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {detailItems.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-lg border border-white/[0.06] bg-[#101010]/70 px-3 py-2"
                    >
                      <p className="mb-1 text-[11px] font-black text-[#626262]">
                        {label}
                      </p>
                      <div className="min-h-5 text-sm font-bold text-[#e7e7e7]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-white/[0.1] px-4 py-2.5 text-sm font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-white"
                  >
                    닫기
                  </button>
                  <Link
                    href={`/themes?themeId=${theme.id}`}
                    className="rounded-lg bg-[#e63946] px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-[#c1121f]"
                  >
                    전체 테마에서 보기
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface LegacyMateComment {
  id: number;
  authorNickname: string;
  content: string;
  createdAt: string;
}

function CommentsSection({
  comments = [],
}: {
  comments?: LegacyMateComment[];
}) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-black text-[#f5f5f5]">
          댓글 <span className="text-[#ef5353]">{comments.length}</span>
        </h2>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#101010]/70 p-3">
        <textarea
          rows={3}
          placeholder="댓글을 입력하세요..."
          className="block w-full resize-none rounded-lg border border-white/[0.08] bg-[#0d0d0d] px-3 py-3 text-sm leading-6 text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#e63946]/55"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="rounded-lg bg-[#e63946] px-4 py-2 text-sm font-black text-white transition-colors hover:bg-[#c1121f]"
          >
            등록
          </button>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="mt-4 rounded-xl border border-white/[0.055] bg-[#101010]/45 py-8 text-center">
          <p className="text-sm font-black text-[#d8d8d8]">
            아직 댓글이 없어요
          </p>
          <p className="mt-1 text-xs text-[#666]">첫 댓글을 남겨보세요.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-xl border border-white/[0.055] bg-[#101010]/55 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-black text-[#f5f5f5]">
                  {comment.authorNickname}
                </p>
                <p className="text-xs font-bold text-[#666]">
                  {formatDateTime(comment.createdAt)}
                </p>
              </div>
              <p className="text-sm leading-6 text-[#c9c9c9]">
                {comment.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const COMMENT_CONTENT_LIMIT = 500;

function getCommentAuthorName(comment: MateCommentItem) {
  return comment.authorNickname || "알 수 없음";
}

function validateCommentContent(value: string) {
  const content = value.trim();

  if (!content) return { content: "", error: "내용을 입력해주세요." };
  if (content.length > COMMENT_CONTENT_LIMIT) {
    return { content, error: "댓글은 500자 이하로 입력해주세요." };
  }

  return { content, error: "" };
}

function MateCommentsSection({
  postId,
  currentUserId,
  isLoggedIn,
}: {
  postId: number;
  currentUserId?: number;
  isLoggedIn: boolean;
}) {
  const [comments, setComments] = useState<MateComment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busyCommentId, setBusyCommentId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await getMateComments(postId);
      setComments(data.comments);
      setTotalCount(data.totalCount);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "댓글을 불러오지 못했습니다."));
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorMessage("");
    getMateComments(postId)
      .then((data) => {
        if (!isMounted) return;
        setComments(data.comments);
        setTotalCount(data.totalCount);
      })
      .catch((error) => {
        if (isMounted)
          setErrorMessage(
            getApiErrorMessage(error, "댓글을 불러오지 못했습니다."),
          );
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const showLoginRequired = () => {
    setErrorMessage("로그인이 필요한 기능입니다.");
  };

  const submitNewComment = async () => {
    if (!isLoggedIn) {
      showLoginRequired();
      return;
    }

    const validation = validateCommentContent(newComment);
    if (validation.error) {
      setErrorMessage(validation.error);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await createMateComment(postId, validation.content);
      setNewComment("");
      await loadComments();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "댓글 등록에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openReplyForm = (commentId: number) => {
    if (!isLoggedIn) {
      showLoginRequired();
      return;
    }

    setEditingCommentId(null);
    setEditingContent("");
    setReplyContent("");
    setReplyTargetId((currentId) =>
      currentId === commentId ? null : commentId,
    );
    setErrorMessage("");
  };

  const submitReply = async (commentId: number) => {
    if (!isLoggedIn) {
      showLoginRequired();
      return;
    }

    const validation = validateCommentContent(replyContent);
    if (validation.error) {
      setErrorMessage(validation.error);
      return;
    }

    setBusyCommentId(commentId);
    setErrorMessage("");

    try {
      await createMateCommentReply(postId, commentId, validation.content);
      setReplyContent("");
      setReplyTargetId(null);
      await loadComments();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "답글 등록에 실패했습니다."));
    } finally {
      setBusyCommentId(null);
    }
  };

  const startEdit = (comment: MateCommentItem) => {
    if (!isLoggedIn) {
      showLoginRequired();
      return;
    }

    if (comment.deleted) return;
    setReplyTargetId(null);
    setReplyContent("");
    setEditingCommentId(comment.commentId);
    setEditingContent(comment.content);
    setErrorMessage("");
  };

  const submitEdit = async (commentId: number) => {
    if (!isLoggedIn) {
      showLoginRequired();
      return;
    }

    const validation = validateCommentContent(editingContent);
    if (validation.error) {
      setErrorMessage(validation.error);
      return;
    }

    setBusyCommentId(commentId);
    setErrorMessage("");

    try {
      await updateMateComment(postId, commentId, validation.content);
      setEditingCommentId(null);
      setEditingContent("");
      await loadComments();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "댓글 수정에 실패했습니다."));
    } finally {
      setBusyCommentId(null);
    }
  };

  const requestDeleteComment = (commentId: number) => {
    if (!isLoggedIn) {
      showLoginRequired();
      return;
    }

    setDeleteTargetId(commentId);
    setErrorMessage("");
  };

  const confirmDeleteComment = async () => {
    if (!deleteTargetId) return;

    if (!isLoggedIn) {
      showLoginRequired();
      return;
    }

    setBusyCommentId(deleteTargetId);
    setErrorMessage("");

    try {
      await deleteMateComment(postId, deleteTargetId);
      setDeleteTargetId(null);
      await loadComments();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "댓글 삭제에 실패했습니다."));
    } finally {
      setBusyCommentId(null);
    }
  };

  const renderComment = (
    comment: MateComment | MateCommentReply,
    isReply = false,
  ) => {
    const isMine = Boolean(currentUserId && comment.authorId === currentUserId);
    const canManage = !comment.deleted && isMine;
    const isEditing = editingCommentId === comment.commentId;
    const isBusy = busyCommentId === comment.commentId;

    return (
      <article
        key={comment.commentId}
        className={[
          "rounded-xl border border-white/[0.055] bg-[#101010]/55 p-4",
          isReply ? "ml-4 border-l-[#e63946]/25 bg-[#0d0d0d]/80 sm:ml-8" : "",
          comment.deleted ? "border-white/[0.04] bg-[#101010]/35" : "",
        ].join(" ")}
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            {isReply && (
              <span className="text-xs font-black text-[#555]">ㄴ</span>
            )}
            <p className="truncate text-sm font-black text-[#f5f5f5]">
              {getCommentAuthorName(comment)}
            </p>
          </div>
          <p className="text-xs font-bold text-[#666]">
            {formatDateTime(comment.createdAt)}
          </p>
        </div>

        {isEditing ? (
          <div className="rounded-lg border border-white/[0.06] bg-[#0d0d0d] p-3">
            <textarea
              rows={3}
              value={editingContent}
              maxLength={COMMENT_CONTENT_LIMIT + 1}
              onChange={(event) => setEditingContent(event.target.value)}
              className="block w-full resize-none bg-transparent text-sm leading-6 text-[#f5f5f5] outline-none placeholder:text-[#555]"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#666]">
                {editingContent.trim().length}/{COMMENT_CONTENT_LIMIT}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCommentId(null);
                    setEditingContent("");
                  }}
                  disabled={isBusy}
                  className="rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-white disabled:opacity-45"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => submitEdit(comment.commentId)}
                  disabled={isBusy}
                  className="rounded-lg bg-[#e63946] px-3 py-1.5 text-xs font-black text-white transition-colors hover:bg-[#c1121f] disabled:opacity-45"
                >
                  {isBusy ? "저장 중" : "저장"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p
            className={[
              "whitespace-pre-line text-sm leading-6",
              comment.deleted ? "text-[#777]" : "text-[#c9c9c9]",
            ].join(" ")}
          >
            {comment.content}
          </p>
        )}

        {!comment.deleted && !isEditing && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!isReply && (
              <button
                type="button"
                onClick={() => openReplyForm(comment.commentId)}
                className="rounded-lg border border-white/[0.08] px-2.5 py-1 text-xs font-bold text-[#888] transition-colors hover:border-[#e63946]/40 hover:text-[#ff8b8b]"
              >
                답글
              </button>
            )}
            {canManage && (
              <>
                <button
                  type="button"
                  onClick={() => startEdit(comment)}
                  disabled={isBusy}
                  className="rounded-lg border border-white/[0.08] px-2.5 py-1 text-xs font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-white disabled:opacity-45"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => requestDeleteComment(comment.commentId)}
                  disabled={isBusy}
                  className="rounded-lg border border-[#cc2222]/35 px-2.5 py-1 text-xs font-bold text-[#ef5353] transition-colors hover:bg-[#cc2222]/10 disabled:opacity-45"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        )}
      </article>
    );
  };

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-black text-[#f5f5f5]">
          댓글 <span className="text-[#ef5353]">{totalCount}</span>
        </h2>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#101010]/70 p-3">
        <textarea
          rows={3}
          value={newComment}
          maxLength={COMMENT_CONTENT_LIMIT + 1}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="댓글을 입력하세요."
          className="block w-full resize-none rounded-lg border border-white/[0.08] bg-[#0d0d0d] px-3 py-3 text-sm leading-6 text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#e63946]/55"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#666]">
            {newComment.trim().length}/{COMMENT_CONTENT_LIMIT}
          </span>
          <button
            type="button"
            onClick={submitNewComment}
            disabled={isSubmitting}
            className="rounded-lg bg-[#e63946] px-4 py-2 text-sm font-black text-white transition-colors hover:bg-[#c1121f] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isSubmitting ? "등록 중" : "등록"}
          </button>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-3 rounded-lg border border-[#e63946]/20 bg-[#e63946]/10 px-3 py-2 text-xs font-bold text-[#ff8b8b]">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <div className="mt-4 rounded-xl border border-white/[0.055] bg-[#101010]/45 py-8 text-center">
          <p className="text-sm font-black text-[#d8d8d8]">
            댓글을 불러오는 중입니다.
          </p>
        </div>
      ) : comments.length === 0 ? (
        <div className="mt-4 rounded-xl border border-white/[0.055] bg-[#101010]/45 py-8 text-center">
          <p className="text-sm font-black text-[#d8d8d8]">
            아직 댓글이 없습니다.
          </p>
          <p className="mt-1 text-xs text-[#666]">첫 댓글을 남겨보세요.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {comments.map((comment) => (
            <div key={comment.commentId} className="space-y-3">
              {renderComment(comment)}

              {replyTargetId === comment.commentId && (
                <div className="ml-4 rounded-xl border border-[#e63946]/15 bg-[#101010]/70 p-3 sm:ml-8">
                  <textarea
                    rows={3}
                    value={replyContent}
                    maxLength={COMMENT_CONTENT_LIMIT + 1}
                    onChange={(event) => setReplyContent(event.target.value)}
                    placeholder="답글을 입력하세요."
                    className="block w-full resize-none rounded-lg border border-white/[0.08] bg-[#0d0d0d] px-3 py-3 text-sm leading-6 text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#e63946]/55"
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#666]">
                      {replyContent.trim().length}/{COMMENT_CONTENT_LIMIT}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setReplyTargetId(null);
                          setReplyContent("");
                        }}
                        disabled={busyCommentId === comment.commentId}
                        className="rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-white disabled:opacity-45"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        onClick={() => submitReply(comment.commentId)}
                        disabled={busyCommentId === comment.commentId}
                        className="rounded-lg bg-[#e63946] px-3 py-1.5 text-xs font-black text-white transition-colors hover:bg-[#c1121f] disabled:opacity-45"
                      >
                        {busyCommentId === comment.commentId
                          ? "등록 중"
                          : "답글 등록"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {comment.replies.length > 0 && (
                <div className="space-y-3">
                  {comment.replies.map((reply) => renderComment(reply, true))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={deleteTargetId !== null}
        title="댓글을 삭제할까요?"
        description="삭제한 댓글은 복구할 수 없습니다."
        cancelText="취소"
        confirmText="삭제"
        onCancel={() => {
          if (busyCommentId !== deleteTargetId) setDeleteTargetId(null);
        }}
        onConfirm={confirmDeleteComment}
        isLoading={deleteTargetId !== null && busyCommentId === deleteTargetId}
        variant="danger"
      />
    </section>
  );
}

export default function MateDetailPage({
  params,
}: {
  params: Promise<{ mateId: string }>;
}) {
  const { mateId } = use(params);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const postId = Number(mateId);
  const [post, setPost] = useState<MatePost | null>(null);
  const [participants, setParticipants] =
    useState<MateParticipantListResponse>(EMPTY_PARTICIPANTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isParticipantsLoading, setIsParticipantsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"close" | "delete" | null>(
    null,
  );
  const [joined, setJoined] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [themePreview, setThemePreview] = useState<ThemeDetail | null>(null);
  const [summaryTheme, setSummaryTheme] = useState<ThemeDetail | null>(null);
  const [isThemePreviewLoading, setIsThemePreviewLoading] = useState(false);
  const [themePreviewError, setThemePreviewError] = useState("");

  const loadPost = async () => {
    const data = await getMatePostById(postId);
    setPost(data);
  };

  const loadParticipants = async () => {
    setIsParticipantsLoading(true);
    try {
      const data = await getMatePostParticipants(postId);
      setParticipants(data);
    } finally {
      setIsParticipantsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorMessage("");

    Promise.allSettled([
      getMatePostById(postId),
      isLoggedIn ? getMyMateParticipations() : Promise.resolve([]),
    ])
      .then(([postResult, myParticipationsResult]) => {
        if (!isMounted) return;
        if (postResult.status === "fulfilled") {
          setPost(postResult.value);
        } else {
          setErrorMessage("메이트 모집 글을 불러오지 못했습니다.");
        }

        if (myParticipationsResult.status === "fulfilled") {
          setJoined(
            myParticipationsResult.value.some(
              (participation) => participation.matePostId === postId,
            ),
          );
        } else {
          setJoined(false);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [postId, isLoggedIn]);

  useEffect(() => {
    if (!post) return;

    let isMounted = true;
    const canViewParticipants = isMyMatePost(post, user?.id);

    if (!canViewParticipants) {
      setParticipants(EMPTY_PARTICIPANTS);
      setIsParticipantsLoading(false);
      return;
    }

    setIsParticipantsLoading(true);
    getMatePostParticipants(post.id)
      .then((data) => {
        if (isMounted) setParticipants(data);
      })
      .catch(() => {
        if (isMounted) setParticipants(EMPTY_PARTICIPANTS);
      })
      .finally(() => {
        if (isMounted) setIsParticipantsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [post, user?.id]);

  useEffect(() => {
    if (!post?.themeId) {
      setSummaryTheme(null);
      return;
    }

    let isMounted = true;

    Promise.allSettled([getThemeById(post.themeId), getThemes()])
      .then(([detailResult, listResult]) => {
        if (!isMounted || detailResult.status !== "fulfilled") return;

        const fallback =
          listResult.status === "fulfilled"
            ? listResult.value.find((theme) => theme.id === post.themeId)
            : undefined;

        setSummaryTheme(
          mergeThemeData(detailResult.value, fallback, post.themeTitle),
        );
      })
      .catch(() => {
        if (isMounted) setSummaryTheme(null);
      });

    return () => {
      isMounted = false;
    };
  }, [post?.themeId, post?.themeTitle]);

  const currentPeople = participants.currentPeople || post?.currentPeople || 0;
  const maxPeople = participants.maxPeople || post?.maxPeople || 0;
  const isAuthor = isMyMatePost(post, user?.id);
  const canViewParticipants = isAuthor;
  const isAlreadyParticipant = Boolean(
    user?.id &&
    participants.items.some((participant) => participant.memberId === user.id),
  );
  const isClosed =
    !post ||
    post.status === "CLOSED" ||
    post.status === "MATCHED" ||
    post.status === "DELETED" ||
    currentPeople >= maxPeople;
  const canClosePost = Boolean(
    post &&
    isAuthor &&
    (post.status === "RECRUITING" || post.status === "CLOSING_SOON"),
  );
  const remaining = Math.max(maxPeople - currentPeople, 0);
  const progress =
    maxPeople > 0
      ? Math.min(100, Math.round((currentPeople / maxPeople) * 100))
      : 0;

  const handleJoin = async () => {
    if (!post || isClosed || isAuthor) return;
    setIsJoining(true);
    setActionError("");

    try {
      await joinMatePost(post.id);
      setJoined(true);
      await Promise.allSettled([
        loadPost(),
        isAuthor ? loadParticipants() : Promise.resolve(),
      ]);
    } catch (error) {
      const message = getApiErrorMessage(error, "참여 신청에 실패했습니다.");
      if (message.includes("이미 참여")) {
        setJoined(true);
      }
      setActionError(message);
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!post) return;
    setIsJoining(true);
    setActionError("");

    try {
      await leaveMatePost(post.id);
      setJoined(false);
      await Promise.allSettled([
        loadPost(),
        isAuthor ? loadParticipants() : Promise.resolve(),
      ]);
    } catch (error) {
      setActionError(getApiErrorMessage(error, "참여 취소에 실패했습니다."));
    } finally {
      setIsJoining(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !isAuthor) return;

    setIsDeleting(true);
    setActionError("");

    try {
      await deleteMatePost(post.id);
      router.push("/mate");
    } catch (error) {
      setActionError(getApiErrorMessage(error, "모집 글 삭제에 실패했습니다."));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = async () => {
    if (!post || !canClosePost) return;

    setIsClosing(true);
    setActionError("");

    try {
      await closeMatePost(post.id);
      await Promise.allSettled([loadPost(), loadParticipants()]);
      setConfirmAction(null);
    } catch (error) {
      setActionError(getApiErrorMessage(error, "모집 마감에 실패했습니다."));
    } finally {
      setIsClosing(false);
    }
  };

  const handleOpenThemePreview = async () => {
    if (!post?.themeId) return;

    setIsThemeModalOpen(true);
    if (summaryTheme) setThemePreview(summaryTheme);
    setIsThemePreviewLoading(true);
    setThemePreviewError("");

    try {
      const [detailResult, listResult] = await Promise.allSettled([
        getThemeById(post.themeId),
        getThemes(),
      ]);

      if (detailResult.status === "rejected") {
        throw detailResult.reason;
      }

      const detail = detailResult.value;
      const listTheme =
        listResult.status === "fulfilled"
          ? listResult.value.find((theme) => theme.id === post.themeId)
          : undefined;

      setThemePreview(mergeThemeData(detail, listTheme, post.themeTitle));
    } catch (error) {
      setThemePreview(null);
      setThemePreviewError(
        getApiErrorMessage(error, "테마 정보를 불러오지 못했습니다."),
      );
    } finally {
      setIsThemePreviewLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] py-24 text-center text-sm font-bold text-[#888]">
        메이트 모집 글을 불러오는 중입니다.
      </div>
    );
  }

  if (errorMessage || !post) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] px-4 py-24 text-center">
        <p className="text-sm font-black text-[#ef5353]">
          {errorMessage || "모집 글을 찾을 수 없습니다."}
        </p>
        <Link
          href="/mate"
          className="mt-6 inline-flex rounded-lg border border-white/[0.1] px-4 py-2.5 text-sm font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-[#f5f5f5]"
        >
          목록으로
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24 text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.13),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]" />

      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs font-bold text-[#777]">
            <Link href="/" className="transition-colors hover:text-[#f5f5f5]">
              홈
            </Link>
            <span>&middot;</span>
            <Link
              href="/mate"
              className="transition-colors hover:text-[#f5f5f5]"
            >
              메이트 모집
            </Link>
            <span>&middot;</span>
            <span className="line-clamp-1 max-w-xs text-[#aaa]">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="min-w-0">
            <div className="mb-5 rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.25)]">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.055] pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={getStatusClass(post.status)}>
                    {STATUS_LABEL[post.status]}
                  </Badge>
                  {isAuthor && (
                    <Badge className="border-[#e63946]/30 bg-[#e63946]/10 text-[#ff8b8b]">
                      내 모집 글
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e63946] text-sm font-bold text-white">
                  {post.authorNickname[0] ?? "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-[22px] font-black leading-snug text-[#f5f5f5] md:text-[28px]">
                    {post.title}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#707070]">
                    <span className="font-bold text-[#bdbdbd]">
                      {post.authorNickname}
                    </span>
                    <span>&middot;</span>
                    <span>
                      {post.createdAt
                        ? formatRelativeTime(post.createdAt)
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs font-bold text-[#777]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-[#c9c9c9]">
                {post.content}
              </p>
            </div>

            <div className="mb-5 rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-black text-[#f5f5f5]">모집 요약</h2>
              </div>

              <div className="mb-5 flex flex-col gap-4 rounded-xl border border-white/[0.055] bg-[#101010]/60 p-3.5 sm:flex-row sm:items-center">
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-[#0d0d0d] sm:w-[200px] md:w-[220px]">
                  <ImageWithFallback
                    src={summaryTheme?.imageUrl || post.imageUrl}
                    fallbackSrc="/images/theme-placeholder.png"
                    alt={
                      summaryTheme?.title || post.themeTitle || "테마 이미지"
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <p className="mb-1 text-[11px] font-black text-[#626262]">
                    테마
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="min-w-0 text-xl font-black leading-tight text-[#f5f5f5]">
                      {summaryTheme?.title || post.themeTitle || "-"}
                    </h3>
                    <button
                      type="button"
                      onClick={handleOpenThemePreview}
                      disabled={!post.themeId}
                      className="rounded-lg border border-[#e63946]/40 px-3 py-1.5 text-xs font-black text-[#ef5353] transition-colors hover:bg-[#e63946]/10 disabled:cursor-not-allowed disabled:border-white/[0.08] disabled:text-[#555]"
                    >
                      테마 정보 보기
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[
                      summaryTheme?.storeName,
                      summaryTheme?.branchName,
                      summaryTheme?.locationName,
                      summaryTheme?.genre,
                    ]
                      .filter(Boolean)
                      .map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/[0.07] bg-[#171717] px-2.5 py-1 text-xs font-bold text-[#888]"
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryItem
                  label="모임 시간"
                  value={formatDateTime(post.meetingTime)}
                />
                <SummaryItem
                  label="모집 마감"
                  value={formatDateTime(post.deadline)}
                />
                <SummaryItem
                  label="남은 자리"
                  value={isClosed ? "마감" : `${remaining}자리 남음`}
                />
                <SummaryItem
                  label="경험 레벨"
                  value={EXPERIENCE_LABEL[post.experienceLevel]}
                />
              </div>

              <div className="mt-5 rounded-xl border border-white/[0.055] bg-[#101010]/70 px-4 py-3">
                <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold">
                  <span className="text-[#888]">모집 진행률</span>
                  <span className="text-[#d8d8d8]">
                    {progress}% · {currentPeople}/{maxPeople}명
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    className="block h-full rounded-full bg-[#e63946] shadow-[0_0_12px_rgba(230,57,70,0.35)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-[#d8d8d8]">
                  {currentPeople}명 참여 중{" "}
                  <span className="mx-1 text-[#555]">&middot;</span>{" "}
                  {isClosed ? "마감" : `${remaining}자리 남음`}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]">
              <h2 className="mb-4 text-sm font-black text-[#f5f5f5]">
                모집 정보
              </h2>
              <div className="grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
                <SummaryItem label="작성자" value={post.authorNickname} />
                <SummaryItem label="상태" value={STATUS_LABEL[post.status]} />
                <SummaryItem
                  label="오픈채팅"
                  value={
                    post.openChatUrl ? (
                      <a
                        href={post.openChatUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#ef5353] hover:text-white"
                      >
                        링크 열기
                      </a>
                    ) : (
                      "-"
                    )
                  }
                />
                <SummaryItem
                  label="생성일"
                  value={formatDateTime(post.createdAt)}
                />
                <SummaryItem
                  label="수정일"
                  value={post.updatedAt ? formatDateTime(post.updatedAt) : "-"}
                />
                <SummaryItem label="모집글 번호" value={`#${post.id}`} />
              </div>
            </div>

            <div className="mt-5">
              <MateCommentsSection
                postId={post.id}
                currentUserId={user?.id}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </section>

          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="rounded-xl border border-white/[0.08] bg-[#171717]/92 shadow-[0_16px_42px_rgba(0,0,0,0.25)]">
              <div className="border-b border-white/[0.06] px-4 py-3">
                <h2 className="text-sm font-black text-[#f5f5f5]">
                  {canViewParticipants ? "참여 신청자" : "참여 현황"}{" "}
                  <span className="text-[#ef5353]">
                    {canViewParticipants
                      ? participants.items.length
                      : `${currentPeople}/${maxPeople}`}
                  </span>
                </h2>
                <p className="mt-1 text-[11px] leading-4 text-[#666]">
                  {canViewParticipants
                    ? `모집 요약의 ${currentPeople}/${maxPeople}명에는 작성자가 포함될 수 있습니다.`
                    : "참여 신청자 목록은 모집글 작성자만 확인할 수 있습니다."}
                </p>
              </div>
              <div className="max-h-[430px] overflow-y-auto px-4">
                {isParticipantsLoading ? (
                  <div className="py-7 text-center text-xs font-bold text-[#777]">
                    참여자 목록을 불러오는 중입니다.
                  </div>
                ) : !canViewParticipants ? (
                  <div className="py-7 text-center">
                    <p className="text-xs font-bold text-[#777]">
                      {currentPeople}명 참여 중입니다
                    </p>
                    <p className="mt-1 text-[11px] text-[#555]">
                      신청자 상세 목록은 작성자에게만 공개됩니다.
                    </p>
                  </div>
                ) : participants.items.length === 0 ? (
                  <div className="py-7 text-center">
                    <p className="text-xs font-bold text-[#777]">
                      아직 참여 신청자가 없어요
                    </p>
                    <p className="mt-1 text-[11px] text-[#555]">
                      이 목록은 작성자를 제외한 참여 신청자 기준입니다.
                    </p>
                  </div>
                ) : (
                  participants.items.map((participant) => (
                    <div
                      key={`${participant.memberId}-${participant.joinedAt ?? ""}`}
                      className="border-b border-white/[0.045] py-3"
                    >
                      <div className="flex gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">
                          {participant.nickname[0] ?? "?"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#f5f5f5]">
                            {participant.nickname}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            {participant.joinedAt && (
                              <p className="text-xs text-[#555]">
                                {formatDateTime(participant.joinedAt)}
                              </p>
                            )}
                            {participant.openChatUrl && (
                              <a
                                href={participant.openChatUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] font-black text-[#ef5353] transition-colors hover:text-white"
                              >
                                오픈채팅
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 flex justify-center">
        <div className="pointer-events-auto w-full max-w-7xl">
          <div className="border-t border-white/[0.06] bg-[#0d0d0d]/95 px-4 py-3 backdrop-blur">
            {actionError && (
              <p className="mb-2 text-right text-xs font-bold text-[#ef5353]">
                {actionError}
              </p>
            )}
            <div className="flex items-center justify-end gap-3">
              <Link
                href="/mate"
                className="rounded-lg border border-white/[0.1] px-4 py-2.5 text-sm font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-[#f5f5f5]"
              >
                목록으로
              </Link>
              {isAuthor ? (
                <>
                  {canClosePost && (
                    <button
                      type="button"
                      onClick={() => setConfirmAction("close")}
                      disabled={isClosing}
                      className="rounded-lg border border-[#f39c12]/45 px-6 py-2.5 text-sm font-black text-[#f0b35f] transition-colors hover:bg-[#f39c12]/10 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {isClosing ? "마감 중..." : "마감하기"}
                    </button>
                  )}
                  <Link
                    href={`/mate/write?editId=${post.id}`}
                    className="rounded-lg bg-[#e63946] px-6 py-2.5 text-sm font-black text-white transition-colors hover:bg-[#c1121f]"
                  >
                    수정하기
                  </Link>
                  <button
                    type="button"
                    onClick={() => setConfirmAction("delete")}
                    disabled={isDeleting}
                    className="rounded-lg border border-[#cc2222]/60 px-6 py-2.5 text-sm font-black text-[#ef5353] transition-colors hover:bg-[#cc2222]/10 disabled:opacity-45"
                  >
                    {isDeleting ? "삭제 중..." : "삭제하기"}
                  </button>
                </>
              ) : joined || isAlreadyParticipant ? (
                <button
                  type="button"
                  onClick={handleLeave}
                  disabled={isJoining}
                  className="rounded-lg border border-white/[0.12] px-6 py-2.5 text-sm font-black text-[#d8d8d8] transition-colors hover:bg-white/[0.06] disabled:opacity-45"
                >
                  참여 취소
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleJoin}
                  disabled={isClosed || isJoining}
                  className={[
                    "rounded-lg px-6 py-2.5 text-sm font-black transition-colors",
                    isClosed
                      ? "cursor-not-allowed bg-[#2a2a2a] text-[#555]"
                      : "bg-[#e63946] text-white hover:bg-[#c1121f]",
                  ].join(" ")}
                >
                  {isJoining ? "처리 중..." : isClosed ? "마감" : "참여하기"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmAction === "close"}
        title="정말 마감하시겠어요?"
        description="메이트 모집을 마감하면 신규 참여만 제한되고, 현재 참여자는 유지됩니다."
        cancelText="취소"
        confirmText="마감하기"
        onCancel={() => {
          if (!isClosing) setConfirmAction(null);
        }}
        onConfirm={handleClose}
        isLoading={isClosing}
      />
      <ConfirmModal
        open={confirmAction === "delete"}
        title="모집 글을 삭제할까요?"
        description="삭제한 메이트 모집글은 다시 복구할 수 없습니다."
        cancelText="취소"
        confirmText="삭제하기"
        onCancel={() => {
          if (!isDeleting) setConfirmAction(null);
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        variant="danger"
      />

      {isThemeModalOpen && (
        <ThemePreviewModal
          theme={themePreview}
          fallbackTitle={post.themeTitle}
          isLoading={isThemePreviewLoading}
          errorMessage={themePreviewError}
          onClose={() => setIsThemeModalOpen(false)}
        />
      )}
    </div>
  );
}
