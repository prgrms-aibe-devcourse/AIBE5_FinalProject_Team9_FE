'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MockReview {
  id: number;
  themeTitle: string;
  rating: number;
  difficulty: number;
  horrorLevel: number;
  content: string;
  tags: string[];
  createdAt: string;
}

const MOCK_REVIEWS: MockReview[] = [
  { id: 1, themeTitle: '좀비 아포칼립스', rating: 5, difficulty: 5, horrorLevel: 5, content: '퍼즐 구성이 정말 탄탄하고 좀비 분장이 리얼해서 소름 돋았어요. 팀원들이랑 같이 가면 훨씬 재미있을 것 같아요. 추천합니다!', tags: ['무서워요', '퍼즐이 좋아요', '팀워크 필요'], createdAt: '2026-04-22' },
  { id: 2, themeTitle: '유령 학교', rating: 4, difficulty: 4, horrorLevel: 4, content: '학교 테마가 익숙해서 더 무서웠어요. 초반 단서가 살짝 어려웠지만 그게 또 재미였어요. 난이도 조절이 잘 됐어요.', tags: ['스토리가 좋아요', '난이도 추천'], createdAt: '2026-03-24' },
];

const REVIEW_TAGS = ['무서워요', '퍼즐이 좋아요', '스토리가 좋아요', '팀워크 필요', '스피디해요', '연출이 좋아요', '전문가 추천', '남자 추천'];
const STAR_LABELS = ['', '별로예요', '그저 그래요', '괜찮아요', '좋아요', '최고예요'];
const DIFFICULTY_LABELS = ['', '매우 쉬움', '쉬움', '보통', '높음', '매우 높음'];

function DotRating({ level, max = 5, color = '#e63946' }: { level: number; max?: number; color?: string }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i}
          className={['w-2.5 h-2.5 rounded-full', i < level ? '' : 'bg-[#2a2a2a]'].join(' ')}
          style={i < level ? { backgroundColor: color } : undefined}
        />
      ))}
    </span>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={['text-base', i < value ? 'text-[#f39c12]' : 'text-[#333]'].join(' ')}>★</span>
      ))}
    </div>
  );
}

function InteractiveDots({ value, onChange, max = 5, color = '#e63946' }: { value: number; onChange: (v: number) => void; max?: number; color?: string }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <button key={i} type="button" onClick={() => onChange(i + 1)}
          className={['w-4 h-4 rounded-full border-2 transition-colors shrink-0', i < value ? 'border-0' : 'border-[#333] bg-transparent'].join(' ')}
          style={i < value ? { backgroundColor: color } : undefined}
        />
      ))}
    </div>
  );
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} type="button" onClick={() => onChange(i + 1)}
          className={['text-xl leading-none cursor-pointer transition-colors', i < value ? 'text-[#f39c12]' : 'text-[#333]'].join(' ')}>
          ★
        </button>
      ))}
    </div>
  );
}

// Review Edit Modal
function ReviewEditModal({ review, onClose }: { review: MockReview; onClose: () => void }) {
  const [rating, setRating] = useState(review.rating);
  const [difficulty, setDifficulty] = useState(review.difficulty);
  const [horrorLevel, setHorrorLevel] = useState(review.horrorLevel);
  const [tags, setTags] = useState<string[]>(review.tags);
  const [content, setContent] = useState(review.content);
  const [hasSpoiler, setHasSpoiler] = useState(false);

  const toggleTag = (t: string) => setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
          <h2 className="text-sm font-bold text-[#f5f5f5]">🌤 후기 수정</h2>
          <button onClick={onClose} className="text-[#555] hover:text-[#888] text-xl leading-none">×</button>
        </div>

        <div className="px-5 py-3.5 bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-xl shrink-0">🏚</div>
          <p className="text-sm font-medium text-[#f5f5f5]">{review.themeTitle}</p>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-xs text-[#888] w-12 shrink-0">별점</label>
            <StarRating value={rating} onChange={setRating} />
            <span className="text-xs text-[#f39c12]">{STAR_LABELS[rating]}</span>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-xs text-[#888] w-12 shrink-0">난이도</label>
            <InteractiveDots value={difficulty} onChange={setDifficulty} color="#3498db" />
            <span className="text-xs text-[#3498db]">{DIFFICULTY_LABELS[difficulty]}</span>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-xs text-[#888] w-12 shrink-0">공포도</label>
            <InteractiveDots value={horrorLevel} onChange={setHorrorLevel} color="#e63946" />
            <span className="text-xs text-[#e63946]">{DIFFICULTY_LABELS[horrorLevel]}</span>
          </div>
          <div>
            <label className="text-xs text-[#888] mb-2 block">느낌 태그 <span className="text-[#555]">(복수 선택)</span></label>
            <div className="flex flex-wrap gap-1.5">
              {REVIEW_TAGS.map(tag => (
                <button key={tag} type="button" onClick={() => toggleTag(tag)}
                  className={['text-xs px-2.5 py-1 rounded-full border transition-colors',
                    tags.includes(tag) ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#444]'
                  ].join(' ')}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <textarea value={content} onChange={e => setContent(e.target.value)}
              rows={5} maxLength={500}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] resize-none" />
            <p className="text-xs text-[#555] text-right mt-1">{content.length}/500</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={hasSpoiler} onChange={e => setHasSpoiler(e.target.checked)} className="accent-[#e63946] w-3.5 h-3.5" />
            <span className="text-xs text-[#888]">이 후기에는 스포일러가 포함되어 있습니다.</span>
          </label>
        </div>

        <div className="px-5 py-4 border-t border-[#1a1a1a] flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-[#888] text-sm hover:border-[#444] transition-colors">취소</button>
          <button onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-bold transition-colors">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyReviewsPage() {
  const [editTarget, setEditTarget] = useState<MockReview | null>(null);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="hover:text-[#888] transition-colors">홈</Link>
            <span>›</span>
            <Link href="/mypage" className="hover:text-[#888] transition-colors">마이페이지</Link>
            <span>›</span>
            <span className="text-[#888]">내 후기</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-black text-[#f5f5f5]">내 후기</h1>
          <span className="text-xs text-[#888]">{MOCK_REVIEWS.length}개</span>
        </div>

        <div className="space-y-4">
          {MOCK_REVIEWS.map(r => (
            <div key={r.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#111] flex items-center justify-center text-lg shrink-0">🏚</div>
                  <div>
                    <p className="text-sm font-bold text-[#f5f5f5]">{r.themeTitle}</p>
                    <p className="text-xs text-[#555] mt-0.5">{r.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setEditTarget(r)}
                    className="text-xs border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#f5f5f5] px-2.5 py-1.5 rounded-lg transition-colors">
                    수정
                  </button>
                  <button className="text-xs border border-[#e63946]/40 text-[#e63946] hover:bg-[#e63946]/10 px-2.5 py-1.5 rounded-lg transition-colors">
                    삭제
                  </button>
                </div>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-5 mb-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <StarDisplay value={r.rating} />
                  <span className="text-xs text-[#f39c12]">{STAR_LABELS[r.rating]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DotRating level={r.difficulty} color="#3498db" />
                  <span className="text-xs text-[#555]">난이도 {DIFFICULTY_LABELS[r.difficulty]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DotRating level={r.horrorLevel} color="#e63946" />
                  <span className="text-xs text-[#555]">공포도 {DIFFICULTY_LABELS[r.horrorLevel]}</span>
                </div>
              </div>

              <p className="text-sm text-[#aaa] leading-relaxed mb-4">{r.content}</p>

              <div className="flex flex-wrap gap-1.5">
                {r.tags.map(tag => (
                  <span key={tag} className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded-full px-2.5 py-0.5 text-[#888]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {MOCK_REVIEWS.length === 0 && (
            <div className="py-16 text-center text-[#888]">
              <p className="text-3xl mb-3">📝</p>
              <p>아직 작성한 후기가 없습니다.</p>
              <Link href="/mypage/reservations" className="text-xs text-[#e63946] mt-2 inline-block hover:underline">
                예약 내역에서 후기를 작성해보세요 →
              </Link>
            </div>
          )}
        </div>
      </div>

      {editTarget && <ReviewEditModal review={editTarget} onClose={() => setEditTarget(null)} />}
    </div>
  );
}
