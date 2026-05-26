import Link from 'next/link';
import { MatePost } from '@/types/mate';

interface MateSectionProps {
  posts: MatePost[];
}

const levelLabel: Record<string, string> = {
  ANY: '무관',
  BEGINNER: '입문자',
  INTERMEDIATE: '중급자',
  EXPERT: '고수',
};

export default function MateSection({ posts }: MateSectionProps) {
  return (
    <section className="py-14">
      {/* 헤더 */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#f5f5f5]">
            <span className="text-[#e63946] mr-1">🤝</span> 메이트 모집
          </h2>
          <p className="text-xs text-[#666] mt-1">함께 공포를 즐길 메이트를 찾아보세요</p>
        </div>
        <Link href="/mate" className="text-xs text-[#888] hover:text-[#e63946] transition-colors">
          전체 보기 ›
        </Link>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/mate/${post.id}`}
            className="group flex flex-col bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#e63946] transition-colors duration-200"
          >
            {/* 썸네일 */}
            <div className="relative aspect-video bg-[#111] overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('/images/horror/mate-default.jpg')` }}
              >
                <div className="w-full h-full bg-[#0d0d0d]/60" />
              </div>
              {/* 상태 배지 */}
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className={[
                  'text-[10px] font-bold px-2 py-0.5 rounded',
                  post.status === 'OPEN'
                    ? 'bg-[#e63946] text-white'
                    : 'bg-[#444] text-[#aaa]',
                ].join(' ')}>
                  {post.status === 'OPEN' ? '모집중' : '마감'}
                </span>
                {post.experienceLevel && post.experienceLevel !== 'ANY' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1a1a1a]/80 text-[#f39c12] border border-[#f39c12]/40">
                    {levelLabel[post.experienceLevel]} 우대
                  </span>
                )}
              </div>
            </div>

            {/* 내용 */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h3 className="text-sm font-semibold text-[#f5f5f5] leading-snug line-clamp-2">
                {post.title}
              </h3>

              {/* 테마 / 지점 태그 */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] text-[#888] bg-[#222] px-2 py-0.5 rounded border border-[#2a2a2a]">
                  📍 {post.locationName}
                </span>
                <span className="text-[10px] text-[#888] bg-[#222] px-2 py-0.5 rounded border border-[#2a2a2a]">
                  🎭 {post.themeTitle}
                </span>
              </div>

              {/* 날짜 + 인원 */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#2a2a2a]">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#666]">📅 {post.playDate}</span>
                  {post.reservationTime && (
                    <span className="text-[10px] text-[#666]">{post.reservationTime}</span>
                  )}
                </div>
                {/* 인원 도트 */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: post.totalMembers }).map((_, i) => (
                    <span
                      key={i}
                      className={[
                        'w-2 h-2 rounded-full',
                        i < post.currentMembers ? 'bg-[#e63946]' : 'bg-[#2a2a2a]',
                      ].join(' ')}
                    />
                  ))}
                  <span className="text-[10px] text-[#888] ml-1">
                    {post.currentMembers}/{post.totalMembers}
                  </span>
                </div>
              </div>

              <button className="w-full text-center bg-[#e63946] hover:bg-[#c1121f] text-white text-xs py-2 rounded transition-colors font-medium">
                신청하기
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
