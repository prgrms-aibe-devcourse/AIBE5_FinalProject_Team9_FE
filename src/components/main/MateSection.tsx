import Image from "next/image";
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
  "/images/horror/theme-pumpkin.png",
];

export default function MateSection({ posts }: MateSectionProps) {
  return (
    <div>
      <div className="mb-12 flex items-end justify-between gap-6">
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

      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => {
          const progress = Math.min(
            100,
            (post.currentMembers / Math.max(post.totalMembers, 1)) * 100,
          );

          return (
            <Link
              key={post.id}
              href={`/mate/${post.id}`}
              className="group overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#1b1b1b] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-[#cc2222]/70 hover:shadow-[0_18px_48px_rgba(204,34,34,0.16)]"
            >
              <div className="relative mb-[-1px] block h-[210px] overflow-hidden bg-[#1b1b1b] leading-none lg:h-[230px]">
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-[0.68] contrast-115 saturate-[0.68] transition duration-700 group-hover:scale-105 group-hover:brightness-[0.84] group-hover:saturate-80"
                  style={{
                    backgroundImage: `url('${mateImages[index % mateImages.length]}')`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-[-1px] top-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.26)_0%,rgba(0,0,0,0.06)_42%,rgba(27,27,27,0.96)_100%)] opacity-100 transition-opacity duration-700 group-hover:opacity-[0.78]" />

                <div className="absolute left-5 top-5 flex gap-2">
                  <span className="rounded-[5px] border border-[#cc2222]/45 bg-[#cc2222]/85 px-3 py-1.5 text-[11px] font-black text-white">
                    {post.status === "OPEN" ? "모집중" : "마감"}
                  </span>
                  <span className="rounded-[5px] border border-white/25 bg-black/50 px-3 py-1.5 text-[11px] font-bold text-[#d2d2d2]">
                    {levelLabel[post.experienceLevel]}
                  </span>
                </div>
              </div>

              <div className="relative bg-[#1b1b1b] p-6">
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="rounded-[6px] border border-[#cc2222]/35 bg-[#cc2222]/8 px-3.5 py-2 text-[13px] font-bold text-[#d46464]">
                    {post.themeTitle}
                  </span>
                  <span className="rounded-[6px] border border-white/[0.12] bg-[#252525] px-3.5 py-2 text-[13px] text-[#c6c6c6]">
                    {post.locationName}
                  </span>
                </div>

                <h3 className="text-[21px] font-black leading-snug text-white">
                  {post.title}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-[14px] leading-6 text-[#858585]">
                  <Image
                    src="/images/icons/icon-date.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-[24px] w-[24px] shrink-0 object-contain"
                  />
                  <span>
                    {post.playDate} / {post.reservationTime}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/[0.08] px-6 py-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2.5 flex items-center justify-between gap-4 text-[13px]">
                      <span className="font-bold text-[#8d8d8d]">
                        참여 인원
                      </span>
                      <span className="shrink-0 font-semibold text-[#b5b5b5]">
                        {post.currentMembers}/{post.totalMembers}명
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#333]">
                      <span
                        className="block h-full rounded-full bg-[#b93a3a] shadow-[0_0_12px_rgba(204,34,34,0.28)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <span className="inline-flex h-12 w-full items-center justify-center rounded-[8px] border border-[#e23b3b]/75 bg-transparent px-6 text-[15px] font-black text-[#e23b3b] transition-all duration-300 group-hover:bg-[#e23b3b]/10 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(204,34,34,0.18)] sm:w-auto sm:min-w-[128px]">
                    참여하기
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
