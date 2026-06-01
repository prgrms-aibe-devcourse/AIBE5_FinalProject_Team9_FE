'use client';

import { use, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MateComment } from '@/types/mate';
import { getDDay, formatRelativeTime } from '@/lib/formatDate';
import { useMateStore, MateForbiddenError, MateNotFoundError, MateValidationException } from '@/stores/mateStore';
import { useAuthStore } from '@/stores/authStore';
import { canEditOrDelete } from '@/lib/mateValidation';

// ── Constants ─────────────────────────────────────────────────────
const AVATAR_COLORS = [
  'bg-[#e63946]', 'bg-[#f39c12]', 'bg-[#2ecc71]',
  'bg-[#3498db]', 'bg-[#9b59b6]', 'bg-[#e67e22]',
];

const EXPERIENCE_MAP = {
  ANY:          { label: '무관',       cls: 'border-[#2a2a2a] text-[#888]' },
  BEGINNER:     { label: '입문자 환영', cls: 'border-[#2ecc71] text-[#2ecc71]' },
  INTERMEDIATE: { label: '중급자 우대', cls: 'border-[#f39c12] text-[#f39c12]' },
  EXPERT:       { label: '경험자 우대', cls: 'border-[#e63946] text-[#e63946]' },
};

const LOCATION_CLS: Record<string, string> = {
  '강남점': 'bg-[#e63946]/10 text-[#e63946] border-[#e63946]/40',
  '홍대점': 'bg-[#9b59b6]/10 text-[#9b59b6] border-[#9b59b6]/40',
  '건대점': 'bg-[#3498db]/10 text-[#3498db] border-[#3498db]/40',
  '신촌점': 'bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/40',
};

// ── Helpers ───────────────────────────────────────────────────────
function getDDayLabel(dateStr: string) {
  const d = getDDay(dateStr);
  if (d < 0) return { text: '마감', cls: 'text-[#888]' };
  if (d === 0) return { text: 'D-Day', cls: 'text-[#e63946] font-bold' };
  return { text: `D-${d}`, cls: 'text-[#f39c12] font-bold' };
}

function avatarColor(id: number) {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}

function formatDateWithDay(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  return `${dateStr} (${DAYS[d.getDay()]})`;
}

// ── Sub-components ────────────────────────────────────────────────
function MemberDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={['w-4 h-4 rounded-full border', i < current ? 'bg-[#e63946] border-[#e63946]' : 'bg-transparent border-[#444]'].join(' ')} />
      ))}
    </div>
  );
}

function CommentItem({
  comment, postAuthorId, currentUserId, onDelete,
}: {
  comment: MateComment;
  postAuthorId: number;
  currentUserId?: number;
  onDelete: (id: number) => void;
}) {
  const isAuthorReply = comment.userId === postAuthorId;
  const isMine = currentUserId != null && comment.userId === currentUserId;

  return (
    <div className={['py-3 border-b border-[#1a1a1a]', isAuthorReply ? 'bg-[#e63946]/5' : ''].join(' ')}>
      <div className="flex gap-2.5">
        <div className={['w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0', avatarColor(comment.userId)].join(' ')}>
          {comment.userNickname[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-medium text-[#f5f5f5]">{comment.userNickname}</span>
            {isAuthorReply && (
              <span className="text-xs bg-[#e63946]/20 text-[#e63946] px-1.5 py-0.5 rounded">작성자</span>
            )}
            <span className="text-xs text-[#555]">{formatRelativeTime(comment.createdAt)}</span>
            {isMine && (
              <button
                onClick={() => onDelete(comment.id)}
                className="ml-auto text-xs text-[#888] hover:text-[#e63946] transition-colors"
              >삭제</button>
            )}
          </div>
          <p className="text-xs text-[#ccc] leading-relaxed whitespace-pre-line">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function MateDetailPage({ params }: { params: Promise<{ mateId: string }> }) {
  const { mateId } = use(params);
  const router = useRouter();

  const { user, isLoggedIn } = useAuthStore();
  const posts = useMateStore(s => s.posts);
  const allComments = useMateStore(s => s.comments);
  const deletePost = useMateStore(s => s.deletePost);
  const addComment = useMateStore(s => s.addComment);
  const removeComment = useMateStore(s => s.removeComment);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const numericId = Number(mateId);
  const post = useMemo(
    () => (Number.isFinite(numericId) ? posts.find(p => p.id === numericId) : undefined),
    [posts, numericId]
  );
  const comments = useMemo(
    () => allComments.filter(c => c.postId === numericId).sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ),
    [allComments, numericId]
  );

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [actionError, setActionError] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-[#888] text-sm">
        불러오는 중...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center mx-auto mb-4 text-2xl">❓</div>
          <p className="text-[#f5f5f5] font-bold text-lg mb-1">모집글을 찾을 수 없습니다</p>
          <p className="text-[#888] text-sm mb-4">삭제되었거나 존재하지 않는 글입니다.</p>
          <Link href="/mate" className="text-xs text-[#e63946] underline hover:opacity-80">메이트 모집 페이지로</Link>
        </div>
      </div>
    );
  }

  const exp = EXPERIENCE_MAP[post.experienceLevel];
  const locCls = LOCATION_CLS[post.locationName] ?? 'bg-[#1a1a1a] text-[#888] border-[#2a2a2a]';
  const isFull = post.status === 'FULL' || post.status === 'CLOSED';
  const { text: ddayText, cls: ddayCls } = getDDayLabel(post.deadlineDate);
  const VISIBLE = 5;
  const displayedComments = showAllComments ? comments : comments.slice(0, VISIBLE);
  const isMyPost = canEditOrDelete(post, user?.id ?? null);

  const handleSubmitComment = () => {
    setCommentError('');
    if (!isLoggedIn || !user) {
      setCommentError('로그인이 필요합니다.');
      return;
    }
    try {
      addComment(post.id, commentText, {
        id: user.id,
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl,
      });
      setCommentText('');
    } catch (e) {
      if (e instanceof MateValidationException) {
        setCommentError(e.errors[0]?.message ?? '잘못된 입력입니다.');
      } else {
        setCommentError('댓글 등록에 실패했습니다.');
      }
    }
  };

  const handleDeleteComment = (commentId: number) => {
    if (!user) return;
    try {
      removeComment(commentId, user.id);
    } catch (e) {
      if (e instanceof MateForbiddenError) alert(e.message);
      else if (e instanceof MateNotFoundError) alert(e.message);
    }
  };

  const handleEdit = () => {
    if (!isMyPost) {
      setActionError('본인의 글만 수정할 수 있습니다.');
      return;
    }
    router.push(`/mate/write?edit=${post.id}`);
  };

  const handleDelete = () => {
    if (!user) {
      setActionError('로그인이 필요합니다.');
      return;
    }
    try {
      deletePost(post.id, user.id);
      router.push('/mate');
    } catch (e) {
      if (e instanceof MateForbiddenError) setActionError(e.message);
      else if (e instanceof MateNotFoundError) setActionError(e.message);
      else setActionError('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="hover:text-[#888] transition-colors">홈</Link>
            <span>›</span>
            <Link href="/mate" className="hover:text-[#888] transition-colors">메이트 모집</Link>
            <span>›</span>
            <span className="text-[#888] line-clamp-1 max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={['text-sm px-2.5 py-1 rounded font-medium', isFull ? 'bg-[#2a2a2a] text-[#888]' : 'bg-[#e63946] text-white'].join(' ')}>
                {isFull ? '● 모집 마감' : '● 모집 중'}
              </span>
              <span className={['text-xs border rounded px-2 py-1', locCls].join(' ')}>{post.locationName}</span>
              <span className={['text-xs border rounded px-2 py-1', exp.cls].join(' ')}>{exp.label}</span>
              {post.isPinned && (
                <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 rounded px-2 py-1">📌 고정</span>
              )}
            </div>

            <h1 className="text-xl font-black text-[#f5f5f5] leading-snug mb-3">{post.title}</h1>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1a1a1a]">
              <div className={['w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0', avatarColor(post.authorId)].join(' ')}>
                {post.authorNickname[0]}
              </div>
              <div>
                <span className="text-sm font-medium text-[#f5f5f5]">{post.authorNickname}</span>
                {isMyPost && <span className="ml-2 text-xs bg-[#e63946]/20 text-[#e63946] px-1.5 py-0.5 rounded">내 글</span>}
                <p className="text-xs text-[#555]">
                  {formatRelativeTime(post.createdAt)}
                  {post.updatedAt && post.updatedAt !== post.createdAt && ' · 수정됨'}
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                {isMyPost && (
                  <>
                    <button onClick={handleEdit} className="text-xs border border-[#2a2a2a] text-[#888] hover:text-[#f5f5f5] hover:border-[#444] px-2.5 py-1 rounded transition-colors">수정</button>
                    <button onClick={() => setConfirmingDelete(true)} className="text-xs border border-[#e63946]/40 text-[#e63946] hover:bg-[#e63946]/10 px-2.5 py-1 rounded transition-colors">삭제</button>
                  </>
                )}
              </div>
            </div>

            {actionError && (
              <div className="mb-3 px-3 py-2 bg-[#e63946]/10 border border-[#e63946]/40 rounded text-xs text-[#e63946]">⚠ {actionError}</div>
            )}

            <div className="flex flex-wrap gap-1.5 mb-5">
              <span className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-2.5 py-1 text-[#888]">
                🎭 {post.themeTitle}
              </span>
              {post.atmosphereTags.map(tag => (
                <span key={tag} className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-2.5 py-1 text-[#888]">{tag}</span>
              ))}
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-5">
              <p className="text-sm text-[#ccc] leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-5">
              <h2 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4">📋 모집 정보</h2>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                {[
                  { label: '지점', value: post.locationName },
                  { label: '테마', value: post.themeTitle },
                  { label: '플레이 날짜', value: formatDateWithDay(post.playDate) },
                  { label: '예약 시간', value: post.reservationTime },
                  { label: '모집 마감일', value: `${post.deadlineDate} (${ddayText})` },
                  { label: '모집 인원', value: `${post.currentMembers}명 / ${post.totalMembers}명` },
                ].map(row => (
                  <div key={row.label}>
                    <p className="text-xs text-[#555] mb-0.5">{row.label}</p>
                    <p className={['text-sm', row.label === '모집 마감일' ? ddayCls : 'text-[#f5f5f5]'].join(' ')}>{row.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
                <p className="text-xs text-[#555] mb-2">참여 현황</p>
                <div className="flex items-center gap-3">
                  <MemberDots current={post.currentMembers} total={post.totalMembers} />
                  <span className="text-xs text-[#888]">
                    {post.currentMembers}명 참여 중 · {post.totalMembers - post.currentMembers}자리 남음
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5">
              <h2 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-3">📞 연락 방법</h2>
              {post.contactMethod === 'KAKAO' ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#f5f5f5]">카카오톡 오픈채팅</span>
                  {post.contactLink && (
                    <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 px-2.5 py-1 rounded">
                      링크 있음 (참가 신청 후 공개)
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#f5f5f5]">이 글에 댓글로 신청해주세요</p>
              )}
            </div>
          </div>

          {/* 댓글 패널 */}
          <div className="w-80 shrink-0 hidden lg:block">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg sticky top-4">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
                <span className="text-sm font-bold text-[#f5f5f5]">
                  댓글 <span className="text-[#e63946]">{comments.length}</span>
                </span>
                <button onClick={() => router.back()} className="text-[#555] hover:text-[#888] transition-colors text-lg leading-none">×</button>
              </div>

              <div className="px-4 max-h-105 overflow-y-auto">
                {comments.length === 0 && (
                  <div className="py-8 text-center text-[#555] text-xs">
                    <p className="mb-1">💬</p>
                    <p>첫 댓글을 달아보세요!</p>
                  </div>
                )}
                {displayedComments.map(c => (
                  <CommentItem key={c.id} comment={c} postAuthorId={post.authorId} currentUserId={user?.id} onDelete={handleDeleteComment} />
                ))}
                {!showAllComments && comments.length > VISIBLE && (
                  <button onClick={() => setShowAllComments(true)} className="w-full py-2.5 text-xs text-[#888] hover:text-[#f5f5f5] transition-colors border-b border-[#1a1a1a]">
                    댓글 더보기 ({comments.length - VISIBLE}개 남음)
                  </button>
                )}
              </div>

              <div className="px-4 py-3 border-t border-[#2a2a2a]">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder={isLoggedIn ? '댓글을 입력하세요... (최대 300자)' : '로그인 후 댓글을 작성할 수 있습니다.'}
                  maxLength={300}
                  disabled={!isLoggedIn}
                  rows={3}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-xs rounded p-2.5 placeholder-[#555] focus:border-[#e63946] outline-none resize-none mb-2 disabled:opacity-50"
                />
                {commentError && <p className="text-xs text-[#e63946] mb-2">{commentError}</p>}
                <button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim() || !isLoggedIn}
                  className="w-full py-2 rounded bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 모바일 댓글 */}
        <div className="lg:hidden mt-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2a2a2a]">
              <span className="text-sm font-bold text-[#f5f5f5]">
                댓글 <span className="text-[#e63946]">{comments.length}</span>
              </span>
            </div>
            <div className="px-4">
              {comments.length === 0 && (
                <div className="py-8 text-center text-[#555] text-xs">첫 댓글을 달아보세요!</div>
              )}
              {displayedComments.map(c => (
                <CommentItem key={c.id} comment={c} postAuthorId={post.authorId} currentUserId={user?.id} onDelete={handleDeleteComment} />
              ))}
              {!showAllComments && comments.length > VISIBLE && (
                <button onClick={() => setShowAllComments(true)} className="w-full py-3 text-xs text-[#888] hover:text-[#f5f5f5] transition-colors">
                  댓글 더보기
                </button>
              )}
            </div>
            <div className="px-4 py-3 border-t border-[#2a2a2a]">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder={isLoggedIn ? '댓글을 입력하세요...' : '로그인 후 댓글을 작성할 수 있습니다.'}
                maxLength={300}
                disabled={!isLoggedIn}
                rows={3}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-xs rounded p-2.5 placeholder-[#555] focus:border-[#e63946] outline-none resize-none mb-2 disabled:opacity-50"
              />
              {commentError && <p className="text-xs text-[#e63946] mb-2">{commentError}</p>}
              <button
                onClick={handleSubmitComment}
                disabled={!commentText.trim() || !isLoggedIn}
                className="w-full py-2 rounded bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-30 text-white text-xs font-medium transition-colors"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none z-10">
        <div className="w-full max-w-7xl pointer-events-auto">
          <div className="border-t border-[#1a1a1a] bg-[#0d0d0d]/95 backdrop-blur px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <MemberDots current={post.currentMembers} total={post.totalMembers} />
                <span className="text-sm text-[#888]">{post.currentMembers}/{post.totalMembers}명</span>
              </div>
              <div className="flex-1" />
              <Link href="/mate" className="px-4 py-2.5 rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] text-sm transition-colors">
                목록으로
              </Link>
              {isMyPost ? (
                <span className="px-6 py-2.5 rounded bg-[#2a2a2a] text-[#555] text-sm">내 모집 글</span>
              ) : (
                <button
                  disabled={isFull}
                  className={[
                    'px-6 py-2.5 rounded text-sm font-bold transition-colors',
                    isFull ? 'bg-[#2a2a2a] text-[#555] cursor-not-allowed' : 'bg-[#e63946] hover:bg-[#c1121f] text-white',
                  ].join(' ')}
                >
                  {isFull ? '모집 마감' : '참가 신청'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {confirmingDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-base font-bold text-[#f5f5f5] mb-2">모집글을 삭제하시겠습니까?</h3>
            <p className="text-xs text-[#888] mb-5">삭제된 글과 댓글은 복구할 수 없습니다.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmingDelete(false)} className="flex-1 py-2 rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] text-sm transition-colors">취소</button>
              <button onClick={handleDelete} className="flex-1 py-2 rounded bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-bold transition-colors">삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
