import Link from "next/link";
import { MatePost } from "@/types/mate";

interface MateSectionProps {
  posts: MatePost[];
}

const levelLabel: Record<string, string> = {
  ANY: "무관",
  BEGINNER: "입문",
  INTERMEDIATE: "중급",
  EXPERT: "고수",
};

const mateImages = [
  "/images/horror/theme-clown.png",
  "/images/horror/theme-smoke.png",
  "/images/horror/theme-zebra.png",
];

export default function MateSection({ posts }: MateSectionProps) {
  return (
    <div>
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-[28px] font-black leading-none text-[#f4f4f4]">
            👥 메이트 모집
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-[#888]">
            함께 공포를 즐길 메이트를 찾아보세요
          </p>
        </div>

        <Link
          href="/mate"
          className="pb-1 text-[13px] font-bold text-[#888] transition-colors hover:text-[#cc2222]"
        >
          전체보기 →
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => (
          <Link
            key={post.id}
            href={`/mate/${post.id}`}
            className="group overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#1b1b1b] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-[#cc2222]/70"
          >
            <div className="relative h-[210px] overflow-hidden bg-[#101010] lg:h-[230px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${mateImages[index % mateImages.length]}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b] via-black/10 to-black/20" />

              <div className="absolute left-5 top-5 flex gap-2">
                <span className="rounded-[5px] bg-[#cc2222] px-3 py-1.5 text-[11px] font-black text-white">
                  {post.status === "OPEN" ? "모집중" : "마감"}
                </span>
                <span className="rounded-[5px] border border-white/25 bg-black/50 px-3 py-1.5 text-[11px] font-bold text-[#d2d2d2]">
                  {levelLabel[post.experienceLevel]}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-[6px] border border-[#cc2222]/45 bg-[#cc2222]/10 px-3.5 py-2 text-[13px] font-bold text-[#cc2222]">
                  {post.themeTitle}
                </span>
                <span className="rounded-[6px] border border-white/[0.12] bg-[#252525] px-3.5 py-2 text-[13px] text-[#c6c6c6]">
                  {post.locationName}
                </span>
              </div>

              <h3 className="text-[20px] font-black leading-snug text-white">
                {post.title}
              </h3>

              <div className="mt-5 text-[14px] leading-6 text-[#858585]">
                📅 {post.playDate} / {post.reservationTime}
              </div>
            </div>

            <div className="border-t border-white/[0.08] px-6 py-5">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3 text-[15px] text-[#8d8d8d]">
                  <div className="flex -space-x-1">
                    {Array.from({ length: post.totalMembers }).map((_, i) => (
                      <span
                        key={i}
                        className={[
                          "h-8 w-8 rounded-full border border-[#1b1b1b]",
                          i < post.currentMembers
                            ? "bg-[radial-gradient(circle_at_35%_30%,#d95cff,#7b2ac9_48%,#4b1a70)]"
                            : "bg-[#333]",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                  <span>
                    {post.currentMembers}/{post.totalMembers}명
                  </span>
                </div>

                <span className="inline-flex h-12 min-w-[128px] items-center justify-center rounded-[8px] border border-[#cc2222]/75 px-6 text-[15px] font-black text-[#cc2222] transition-colors group-hover:bg-[#cc2222] group-hover:text-white">
                  참여하기
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
