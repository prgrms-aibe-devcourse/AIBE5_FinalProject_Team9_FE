import HeroBanner from "@/components/main/HeroBanner";
import AiRecommendSection from "@/components/main/AiRecommendSection";
import ThemeSection from "@/components/main/ThemeSection";
import MateSection from "@/components/main/MateSection";
import BrandSection from "@/components/main/BrandSection";
import FeaturesSection from "@/components/main/FeaturesSection";
import OfflineSection from "@/components/main/OfflineSection";
import FooterCTA from "@/components/main/FooterCTA";
import FloatingSectionNav from "@/components/main/FloatingSectionNav";
import { Theme } from "@/types/theme";
import { MatePost } from "@/types/mate";

const popularThemes: Theme[] = [
  {
    id: 1,
    title: "폐병원의 저주",
    description: "문을 닫은 병원에서 시작되는 기괴한 공포 서사.",
    genre: "공포/미스터리",
    difficulty: 4,
    horrorLevel: 5,
    minPlayers: 2,
    maxPlayers: 4,
    duration: 80,
    price: 28000,
    imageUrl: "/images/horror/theme-clown.png",
    rating: 4.9,
    reviewCount: 342,
    rank: 1,
    isBest: true,
    locationName: "홍대",
    branchName: "홍대 1호점",
    clearRate: 41,
  },
  {
    id: 2,
    title: "검은 달의 방",
    description: "열리지 않아야 할 문 뒤의 소리를 따라가는 스릴러.",
    genre: "공포/스릴러",
    difficulty: 4,
    horrorLevel: 5,
    minPlayers: 3,
    maxPlayers: 6,
    duration: 90,
    price: 30000,
    imageUrl: "/images/horror/theme-smoke.png",
    rating: 4.8,
    reviewCount: 312,
    rank: 2,
    locationName: "홍대",
    branchName: "홍대 6호점",
    clearRate: 38,
  },
  {
    id: 3,
    title: "인형의 방",
    description: "붉은 달빛 아래 사라진 사람들의 흔적을 좇는다.",
    genre: "공포/추리",
    difficulty: 5,
    horrorLevel: 5,
    minPlayers: 3,
    maxPlayers: 6,
    duration: 90,
    price: 32000,
    imageUrl: "/images/horror/theme-zebra.png",
    rating: 4.7,
    reviewCount: 289,
    rank: 3,
    isHot: true,
    locationName: "강남",
    branchName: "강남 8호점",
    clearRate: 57,
  },
  {
    id: 4,
    title: "저주받은 신랑",
    description: "마지막 생존자가 남긴 신호를 따라 폐쇄 구역을 탈출한다.",
    genre: "액션/공포",
    difficulty: 3,
    horrorLevel: 4,
    minPlayers: 2,
    maxPlayers: 6,
    duration: 75,
    price: 26000,
    imageUrl: "/images/horror/theme-pumpkin.png",
    rating: 4.5,
    reviewCount: 198,
    rank: 4,
    isHot: true,
    locationName: "강남",
    branchName: "강남 2호점",
    clearRate: 62,
  },
];

const matePosts: MatePost[] = [
  {
    id: 1,
    memberId: 1,
    title: "이번 주말 강남 폐병원 같이 가실 분?",
    content: "분위기를 즐기면서 플레이할 메이트를 찾고 있어요.",
    authorNickname: "김공포",
    themeId: 1,
    themeTitle: "폐병원의 저주",
    region: "강남",
    meetingTime: "2026-05-10T20:00:00",
    deadline: "2026-05-08T23:59:00",
    currentPeople: 2,
    maxPeople: 4,
    experienceLevel: "ANY",
    tags: ["진지하게", "몰입형"],
    openChatUrl: "https://open.kakao.com/o/mock",
    status: "RECRUITING",
    createdAt: "2026-05-03",
  },
  {
    id: 2,
    memberId: 2,
    title: "홍대 감옥 탈출 처음인데 같이 가요!",
    content: "공포보다는 추리 위주로 침착하게 즐기고 싶어요.",
    authorNickname: "서울쫄보",
    themeId: 2,
    themeTitle: "검은 달의 방",
    region: "홍대",
    meetingTime: "2026-05-17T20:00:00",
    deadline: "2026-05-16T23:59:00",
    currentPeople: 3,
    maxPeople: 4,
    experienceLevel: "BEGINNER",
    tags: ["추리 위주", "침착하게"],
    openChatUrl: "https://open.kakao.com/o/mock",
    status: "RECRUITING",
    createdAt: "2026-05-03",
  },
  {
    id: 3,
    memberId: 3,
    title: "건대 인형의 방 2인 구합니다",
    content: "고난도 장치와 공포 연출을 같이 공략할 분을 찾습니다.",
    authorNickname: "방탈관",
    themeId: 3,
    themeTitle: "인형의 방",
    region: "건대",
    meetingTime: "2026-05-19T19:00:00",
    deadline: "2026-05-18T23:59:00",
    currentPeople: 1,
    maxPeople: 3,
    experienceLevel: "EXPERT",
    tags: ["공포 위주", "고수"],
    openChatUrl: "https://open.kakao.com/o/mock",
    status: "RECRUITING",
    createdAt: "2026-05-03",
  },
];

export default function HomePage() {
  return (
    <>
      <div id="hero" className="scroll-mt-20">
        <HeroBanner />
      </div>

      <main className="bg-[#0d0d0d]">
        <FloatingSectionNav />

        <div id="ai-recommend" className="scroll-mt-20">
          <AiRecommendSection />
        </div>

        <section
          id="popular-themes"
          className="scroll-mt-20 bg-[#0d0d0d] pt-[96px] pb-[112px]"
        >
          <div className="gg-container">
            <ThemeSection
              title="🔥 인기 테마"
              subtitle="지금 가장 인기 있는 공포 방탈출"
              themes={popularThemes}
              href="/themes"
            />
          </div>
        </section>

        <section
          id="mate-section"
          className="scroll-mt-20 border-t border-[#252525] bg-[#171717] pt-[96px] pb-[112px]"
        >
          <div className="gg-container">
            <MateSection posts={matePosts} />
          </div>
        </section>

        <div id="brand-section" className="scroll-mt-20">
          <BrandSection />
        </div>
        <div id="how-to-use" className="scroll-mt-20">
          <OfflineSection />
        </div>
        <div id="features-section" className="scroll-mt-20">
          <FeaturesSection />
        </div>

        <div id="quick-reservation" className="scroll-mt-20">
          <FooterCTA />
        </div>
      </main>
    </>
  );
}
