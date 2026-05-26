import HeroBanner from '@/components/main/HeroBanner';
import ThemeSection from '@/components/main/ThemeSection';
import MateSection from '@/components/main/MateSection';
import BrandSection from '@/components/main/BrandSection';
import FeaturesSection from '@/components/main/FeaturesSection';
import OfflineSection from '@/components/main/OfflineSection';
import FooterCTA from '@/components/main/FooterCTA';
import { Theme } from '@/types/theme';
import { MatePost } from '@/types/mate';

// ── Mock data (백엔드 연동 전 사용) ────────────────────────────────
const popularThemes: Theme[] = [
  {
    id: 1,
    title: '폐병원의 저주',
    description: '폐허가 된 병원에서 시작되는 극한의 공포 서사.',
    genre: '공포/미스터리',
    difficulty: 4, horrorLevel: 5,
    minPlayers: 2, maxPlayers: 4, duration: 80, price: 28000,
    imageUrl: '/images/horror/theme1.jpg',
    rating: 4.9, reviewCount: 342,
    rank: 1, isBest: true,
    locationName: '홍대', branchName: '홍대 1호점',
    clearRate: 41,
  },
  {
    id: 2,
    title: '13번째 방',
    description: '전설의 13번째 방. 들어간 자는 돌아오지 않는다.',
    genre: '공포/스릴러',
    difficulty: 4, horrorLevel: 5,
    minPlayers: 3, maxPlayers: 6, duration: 90, price: 30000,
    imageUrl: '/images/horror/theme2.jpg',
    rating: 4.8, reviewCount: 312,
    rank: 2, isBest: true,
    locationName: '홍대', branchName: '홍대 6호점',
    clearRate: 38,
  },
  {
    id: 3,
    title: '블러드문',
    description: '붉은 달이 뜨는 밤, 저주가 시작된다.',
    genre: '공포/오컬트',
    difficulty: 5, horrorLevel: 5,
    minPlayers: 3, maxPlayers: 6, duration: 90, price: 32000,
    imageUrl: '/images/horror/theme3.jpg',
    rating: 4.8, reviewCount: 289,
    rank: 3, isHot: true,
    locationName: '강남', branchName: '강남 8호점',
    clearRate: 57,
  },
  {
    id: 4,
    title: '좀비 아포칼립스',
    description: '마이러스가 창궐한 도시에서 살아남아라.',
    genre: '액션/공포',
    difficulty: 3, horrorLevel: 4,
    minPlayers: 2, maxPlayers: 6, duration: 75, price: 26000,
    imageUrl: '/images/horror/theme4.jpg',
    rating: 4.7, reviewCount: 198,
    rank: 4, isHot: true,
    locationName: '강남', branchName: '강남 2호점',
    clearRate: 62,
  },
  {
    id: 5,
    title: '미완의 초상화',
    description: '전체 화가의 눈이 당신을 따라온다. 이곳에서 그림 속 저주를 풀어라.',
    genre: '심리/공포',
    difficulty: 3, horrorLevel: 3,
    minPlayers: 2, maxPlayers: 4, duration: 70, price: 25000,
    imageUrl: '/images/horror/theme5.jpg',
    rating: 4.5, reviewCount: 287,
    rank: 5, isHot: true,
    locationName: '홍대', branchName: '홍대 2호점',
    clearRate: 44,
  },
  {
    id: 6,
    title: '제이콥',
    description: '사라진 화가를 추적하는 극한의 심리 스릴러.',
    genre: '공포/미스터리',
    difficulty: 3, horrorLevel: 3,
    minPlayers: 2, maxPlayers: 6, duration: 80, price: 25000,
    imageUrl: '/images/horror/theme6.jpg',
    rating: 4.8, reviewCount: 234,
    rank: 6,
    locationName: '홍대', branchName: '홍대 1호점',
    clearRate: 55,
  },
];

const matePosts: MatePost[] = [
  {
    id: 1,
    title: '이번 주말 강남점 폐병원 같이 가실 분?',
    content: '공포 방탈출을 경험 10회 이상입니다! 진지하게 공략하기보다는 분위기를 즐기면서 플레이하고 싶어요.',
    authorId: 1, authorNickname: '김공포',
    locationName: '강남', themeTitle: '폐병원의 저주',
    playDate: '2026-05-10', reservationTime: '20:00',
    deadlineDate: '2026-05-08',
    currentMembers: 2, totalMembers: 4,
    experienceLevel: 'ANY',
    atmosphereTags: ['진지하게', '즐겁게'],
    contactMethod: 'KAKAO', status: 'OPEN',
    createdAt: '2026-05-03',
  },
  {
    id: 2,
    title: '건대점 감옥 탈출 일요일 저녁 4인 모집',
    content: '지난 강남점 체벌린 같이 본 2명 모집합니다. 공포 보다는 퍼즐 위주로 편하게 즐기고 싶어요.',
    authorId: 2, authorNickname: '한울서울',
    locationName: '건대', themeTitle: '악마의 제단',
    playDate: '2026-05-17', reservationTime: '20:00',
    deadlineDate: '2026-05-16',
    currentMembers: 2, totalMembers: 4,
    experienceLevel: 'INTERMEDIATE',
    atmosphereTags: ['퍼즐 위주', '편하게'],
    contactMethod: 'KAKAO', status: 'OPEN',
    createdAt: '2026-05-03',
  },
  {
    id: 3,
    title: '건대점 악마의 제단 고수 2명 구합니다',
    content: '이번이 세 번째 도전입니다. 이번엔 반드시 클리어! 방탈출 20회 이상, 공포 위주로 진행해 분 분 모집합니다.',
    authorId: 3, authorNickname: '정배관',
    locationName: '건대', themeTitle: '악마의 제단',
    playDate: '2026-05-19', reservationTime: '19:00',
    deadlineDate: '2026-05-18',
    currentMembers: 1, totalMembers: 3,
    experienceLevel: 'EXPERT',
    atmosphereTags: ['공포 위주', '고수'],
    contactMethod: 'KAKAO', status: 'OPEN',
    createdAt: '2026-05-03',
  },
];
// ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* 1. 히어로 배너 */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4">
        {/* 2. 인기 테마 캐러셀 */}
        <ThemeSection
          title="🔥 인기 테마"
          subtitle="지금 가장 인기 있는 공포 방탈출"
          themes={popularThemes}
          href="/themes"
        />

        {/* 3. 메이트 모집 카드 그리드 */}
        <MateSection posts={matePosts} />
      </div>

      {/* 4. 브랜드 소개 — 풀 와이드 */}
      <BrandSection />

      {/* 5. 서비스 특징 아이콘 */}
      <FeaturesSection />

      {/* 6. 오프라인 방탈출 소개 */}
      <OfflineSection />

      {/* 7. Footer CTA 배너 */}
      <FooterCTA />
    </>
  );
}
