'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReservationCalendar from '@/components/reservation/ReservationCalendar';
import ReservationSlideOver from '@/components/reservation/ReservationSlideOver';
import ReviewCard from '@/components/card/ReviewCard';
import { getThemeById } from '@/services/themeService';
import { Review } from '@/types/review';
import { ThemeDetail } from '@/types/theme';

type TabType = 'info' | 'review' | 'location' | 'reservation';

interface TimeSlot {
  time: string;
  soldOut: boolean;
}

interface BranchInfo {
  phone: string;
  hours: string;
  address: string;
}

interface ThemeDetailData {
  id: number;
  title: string;
  description: string;
  genre: string;
  difficulty: number;
  horrorLevel: number;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  clearRate: number;
  locationName: string;
  branchName: string;
  isBest?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  story: string;
  notice: string;
  timeSlots: TimeSlot[];
  branchInfo: BranchInfo;
  reviews: Review[];
}

const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { time: '10:00', soldOut: false },
  { time: '11:30', soldOut: false },
  { time: '13:00', soldOut: true },
  { time: '14:30', soldOut: false },
  { time: '16:00', soldOut: false },
  { time: '17:30', soldOut: true },
  { time: '19:00', soldOut: false },
  { time: '20:30', soldOut: false },
  { time: '22:00', soldOut: false },
  { time: '23:30', soldOut: false },
];

const MOCK_THEMES: ThemeDetailData[] = [
  {
    id: 1, title: '폐병원의 저주', description: '폐허가 된 병원에서 시작되는 극한의 공포 서사.',
    genre: '공포/미스터리', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 4,
    duration: 80, price: 28000, imageUrl: 'https://picsum.photos/seed/grimgate1/800/450',
    rating: 4.9, reviewCount: 342, clearRate: 41, locationName: '홍대', branchName: '홍대 1호점', isBest: true,
    story: '한때 번성했던 병원이 어느 날 갑자기 폐쇄되었다. 그 안에서 무슨 일이 있었는지 아무도 모른다. 당신은 진실을 파헤치기 위해 홀로 폐병원에 발을 들였다. 복도 끝에서 들려오는 발소리, 꺼졌던 불빛이 다시 켜지는 수술실... 이 병원에는 아직도 무언가가 살아 있다.',
    notice: '공포 연출이 강한 테마입니다. 심장 질환이 있으신 분은 참가를 삼가주세요. 10분 전 도착 부탁드립니다.',
    timeSlots: DEFAULT_TIME_SLOTS,
    branchInfo: { phone: '010-1234-5678', hours: '10:00 – 22:00 (연중무휴)', address: '서울특별시 마포구 홍대입구역 · 홍대 1호점' },
    reviews: [
      { id: 1, themeId: 1, themeTitle: '폐병원의 저주', userId: 1, userNickname: '공포마니아', rating: 5, difficulty: 4, horrorLevel: 5, content: '진짜 너무 무섭습니다. 배우가 갑자기 나타날 때 심장이 멎는 줄 알았어요. 강력 추천!', tags: ['배우 연기 최고', '심장 쫄깃', '다시 가고 싶어요'], hasSpoiler: false, createdAt: '2026-04-10' },
      { id: 2, themeId: 1, themeTitle: '폐병원의 저주', userId: 2, userNickname: '탈출왕', rating: 5, difficulty: 4, horrorLevel: 5, content: '10번 넘게 방탈출 다녔는데 이게 제일 무서웠어요. 스토리도 탄탄하고 연출이 정말 대박입니다.', tags: ['스토리 굿', '연출 최고'], hasSpoiler: false, createdAt: '2026-03-22' },
      { id: 3, themeId: 1, themeTitle: '폐병원의 저주', userId: 3, userNickname: '공포초보', rating: 4, difficulty: 3, horrorLevel: 5, content: '너무 무서워서 중간에 포기할 뻔했어요. 그래도 끝까지 해냈습니다! 뿌듯해요.', tags: ['초보주의', '무서워요'], hasSpoiler: false, createdAt: '2026-03-05' },
    ],
  },
  {
    id: 2, title: '13번째 방', description: '전설의 13번째 방. 들어간 자는 돌아오지 않는다.',
    genre: '공포/스릴러', difficulty: 5, horrorLevel: 3, minPlayers: 3, maxPlayers: 6,
    duration: 90, price: 30000, imageUrl: 'https://picsum.photos/seed/grimgate2/800/450',
    rating: 4.9, reviewCount: 312, clearRate: 28, locationName: '홍대', branchName: '홍대 6호점', isBest: true,
    story: '13번째 방은 존재하지 않는다고 했다. 하지만 당신은 분명히 그 문을 열었다. 들어간 자는 돌아오지 않는다는 전설이 있는 이 방에서, 당신은 90분 안에 탈출해야만 한다. 벽에 새겨진 암호와 바닥에 흩뿌려진 단서들이 탈출의 열쇠다.',
    notice: '난이도가 매우 높은 테마입니다. 3인 이상 참가를 권장합니다. 10분 전 도착 부탁드립니다.',
    timeSlots: DEFAULT_TIME_SLOTS,
    branchInfo: { phone: '010-2345-6789', hours: '10:00 – 22:00 (연중무휴)', address: '서울특별시 마포구 홍대입구역 · 홍대 6호점' },
    reviews: [
      { id: 4, themeId: 2, themeTitle: '13번째 방', userId: 4, userNickname: '퍼즐마스터', rating: 5, difficulty: 5, horrorLevel: 3, content: '퍼즐 난이도가 역대급입니다. 5명이서 갔는데도 시간이 모자랐어요. 도전 의식이 생기는 테마!', tags: ['퍼즐 어려움', '재도전 필요'], hasSpoiler: false, createdAt: '2026-04-15' },
      { id: 5, themeId: 2, themeTitle: '13번째 방', userId: 5, userNickname: '방탈출고수', rating: 5, difficulty: 5, horrorLevel: 2, content: '인테리어 퀄리티가 정말 높아요. 공포보다는 미스터리 느낌이라 부담 없이 즐길 수 있어요.', tags: ['인테리어 최고', '미스터리 분위기'], hasSpoiler: false, createdAt: '2026-04-01' },
    ],
  },
  {
    id: 3, title: '블러드문', description: '붉은 달이 뜨는 밤, 저주가 시작된다.',
    genre: '공포/오컬트', difficulty: 5, horrorLevel: 5, minPlayers: 3, maxPlayers: 6,
    duration: 90, price: 32000, imageUrl: 'https://picsum.photos/seed/grimgate3/800/450',
    rating: 4.8, reviewCount: 289, clearRate: 57, locationName: '강남', branchName: '강남 8호점', isHot: true,
    story: '붉은 달이 뜨는 밤, 저주가 시작된다. 이 테마는 단순한 방탈출을 넘어, 치밀하게 설계된 공포 서사 속으로 당신을 끌어들입니다. 매 순간 예측 불가능한 전개와 몰입감 넘치는 연출이 기다리고 있습니다. 과연 당신은 살아서 나올 수 있을까요?',
    notice: '10분전 도착 부탁드립니다.',
    timeSlots: DEFAULT_TIME_SLOTS,
    branchInfo: { phone: '010-2388-1921', hours: '10:00 – 22:00 (연중무휴)', address: '서울특별시 강남구 · 강남 8호점' },
    reviews: [
      { id: 6, themeId: 3, themeTitle: '블러드문', userId: 6, userNickname: '공포왕', rating: 5, difficulty: 5, horrorLevel: 5, content: '최고의 공포 방탈출이었습니다. 배우와의 상호작용이 정말 리얼했고, 마지막 반전이 소름이 돋았어요.', tags: ['배우 최고', '반전 있음', '다시 가고 싶어요'], hasSpoiler: false, createdAt: '2026-04-20' },
      { id: 7, themeId: 3, themeTitle: '블러드문', userId: 7, userNickname: '일행5명', rating: 4, difficulty: 4, horrorLevel: 5, content: '5명이서 갔는데 모두 만족했어요. 공포 연출이 정말 훌륭하고 스토리도 탄탄합니다.', tags: ['그룹 추천', '스토리 좋음'], hasSpoiler: false, createdAt: '2026-04-08' },
    ],
  },
  {
    id: 4, title: '좀비 아포칼립스', description: '바이러스가 창궐한 도시에서 살아남아라.',
    genre: '액션/공포', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6,
    duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate4/800/450',
    rating: 4.8, reviewCount: 275, clearRate: 62, locationName: '강남', branchName: '강남 3호점', isHot: true,
    story: '도시 전체를 뒤덮은 의문의 바이러스. 감염된 자들이 거리를 배회하는 가운데, 당신은 마지막 생존자로서 탈출구를 찾아야 한다. 백신 연구소에서 해독제 레시피를 찾고, 살아서 이 도시를 빠져나가라.',
    notice: '활동량이 많은 테마입니다. 편안한 복장을 권장합니다. 10분 전 도착 부탁드립니다.',
    timeSlots: DEFAULT_TIME_SLOTS,
    branchInfo: { phone: '010-3456-7890', hours: '10:00 – 23:00 (연중무휴)', address: '서울특별시 강남구 강남대로 · 강남 3호점' },
    reviews: [
      { id: 8, themeId: 4, themeTitle: '좀비 아포칼립스', userId: 8, userNickname: '액션러버', rating: 5, difficulty: 3, horrorLevel: 4, content: '액션과 공포의 완벽한 조화! 좀비 분장이 너무 리얼해서 깜짝 놀랐어요.', tags: ['액션 최고', '좀비 분장 리얼'], hasSpoiler: false, createdAt: '2026-04-25' },
    ],
  },
  {
    id: 5, title: '미완의 초상', description: '전체 화가의 눈이 당신을 따라온다. 저주를 풀어라.',
    genre: '심리/공포', difficulty: 4, horrorLevel: 4, minPlayers: 1, maxPlayers: 6,
    duration: 70, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate5/800/450',
    rating: 4.5, reviewCount: 287, clearRate: 44, locationName: '건대', branchName: '건대 2호점',
    story: '전설의 화가가 마지막 작품을 완성하지 못한 채 세상을 떠났다. 그의 초상화는 보는 이의 눈을 따라온다는 소문이 있다. 작품 속 저주를 풀고, 화가가 남긴 비밀을 밝혀내라.',
    notice: '혼자서도 참가 가능한 테마입니다. 10분 전 도착 부탁드립니다.',
    timeSlots: DEFAULT_TIME_SLOTS,
    branchInfo: { phone: '010-4567-8901', hours: '10:00 – 22:00 (연중무휴)', address: '서울특별시 광진구 건대입구역 · 건대 2호점' },
    reviews: [
      { id: 9, themeId: 5, themeTitle: '미완의 초상', userId: 9, userNickname: '예술러버', rating: 5, difficulty: 4, horrorLevel: 3, content: '예술적인 인테리어가 정말 아름다워요. 심리적 공포가 주를 이루어 잔인한 연출 없이도 무서웠어요.', tags: ['인테리어 아름다움', '심리 공포'], hasSpoiler: false, createdAt: '2026-04-12' },
    ],
  },
  {
    id: 6, title: '체이금', description: '사라진 탐정을 추적하다 발견한 잔혹 스릴러.',
    genre: '스릴러', difficulty: 5, horrorLevel: 5, minPlayers: 2, maxPlayers: 4,
    duration: 75, price: 27000, imageUrl: 'https://picsum.photos/seed/grimgate6/800/450',
    rating: 4.8, reviewCount: 234, clearRate: 41, locationName: '건대', branchName: '건대 6호점', isHot: true,
    story: '저명한 탐정 체이금이 갑자기 사라졌다. 그의 사무실에는 미완의 수사 파일만 남아있고, 벽에는 알 수 없는 메모들이 가득하다. 당신은 탐정의 뒤를 이어 그가 쫓던 범인을 찾아야만 한다.',
    notice: '퍼즐 난이도가 매우 높습니다. 10분 전 도착 부탁드립니다.',
    timeSlots: DEFAULT_TIME_SLOTS,
    branchInfo: { phone: '010-5678-9012', hours: '11:00 – 22:00 (연중무휴)', address: '서울특별시 광진구 건대입구역 · 건대 6호점' },
    reviews: [
      { id: 10, themeId: 6, themeTitle: '체이금', userId: 10, userNickname: '미스터리팬', rating: 5, difficulty: 5, horrorLevel: 4, content: '스토리 완성도가 최상급입니다. 단서를 하나씩 모아가는 과정이 정말 재미있었어요.', tags: ['스토리 최고', '단서 수집'], hasSpoiler: false, createdAt: '2026-04-18' },
    ],
  },
];

// Fill remaining themes 7-24 with generated data
for (let i = 7; i <= 24; i++) {
  if (!MOCK_THEMES.find(t => t.id === i)) {
    const titles = ['감옥 탈출', '사일런스', '인형의 밤', '귀신 들린 인형', '저주받은 산장', '악마의 계약', '어둠 속의 목소리', '저승사자의 초대', '비밀 연구소', '고택의 원혼', '복수의 시간', '파멸의 시계', '잃어버린 기억', '혈족의 저주', '유령 병동', '사냥꾼의 덫', '마지막 제물', '폐광의 비밀'];
    const locations = ['홍대', '강남', '건대', '신촌', '홍대', '건대', '신촌', '홍대', '강남', '건대', '신촌', '홍대', '강남', '건대', '신촌', '홍대', '강남', '건대'];
    const branches = ['홍대 2호점', '강남 5호점', '건대 1호점', '신촌 1호점', '홍대 3호점', '건대 3호점', '신촌 2호점', '홍대 4호점', '강남 2호점', '건대 4호점', '신촌 3호점', '홍대 5호점', '강남 7호점', '건대 4호점', '신촌 3호점', '홍대 7호점', '강남 9호점', '건대 5호점'];
    const idx = i - 7;
    MOCK_THEMES.push({
      id: i,
      title: titles[idx] ?? `테마 ${i}`,
      description: '어둠 속에 숨겨진 비밀을 풀어라.',
      genre: '공포/스릴러',
      difficulty: ((i % 4) + 2) as number,
      horrorLevel: ((i % 4) + 2) as number,
      minPlayers: 2,
      maxPlayers: 6,
      duration: 75,
      price: 25000,
      imageUrl: `https://picsum.photos/seed/grimgate${i}/800/450`,
      rating: parseFloat((3.9 + (i % 10) * 0.1).toFixed(1)),
      reviewCount: Math.max(30, 200 - i * 7),
      clearRate: 40 + (i % 40),
      locationName: locations[idx] ?? '강남',
      branchName: branches[idx] ?? `강남 ${i}호점`,
      story: '이 방에는 알 수 없는 저주가 서려있다. 당신은 주어진 단서들을 모아 탈출구를 찾아야 한다. 과연 시간 안에 빠져나올 수 있을까?',
      notice: '10분 전 도착 부탁드립니다.',
      timeSlots: DEFAULT_TIME_SLOTS,
      branchInfo: {
        phone: `010-${String(1000 + i).padStart(4, '0')}-${String(2000 + i).padStart(4, '0')}`,
        hours: '10:00 – 22:00 (연중무휴)',
        address: `서울특별시 · ${branches[idx] ?? `강남 ${i}호점`}`,
      },
      reviews: [],
    });
  }
}

function DotRating({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={['w-2.5 h-2.5 rounded-full', i < level ? 'bg-[#e63946]' : 'bg-[#2a2a2a]'].join(' ')}
        />
      ))}
    </span>
  );
}

function InfoTab({ theme }: { theme: ThemeDetailData }) {
  return (
    <div>
      <p className="text-xs text-[#888] font-bold uppercase tracking-wider mb-3">테마 정보</p>
      <table className="w-full text-sm mb-6">
        <tbody>
          {[
            { label: '지역', value: theme.locationName },
            { label: '지점', value: theme.branchName },
            { label: '소요 시간', value: `${theme.duration}분` },
            { label: '인원', value: `${theme.minPlayers}~${theme.maxPlayers}명` },
          ].map(row => (
            <tr key={row.label} className="border-b border-[#1a1a1a]">
              <td className="py-2.5 text-[#888] w-24">{row.label}</td>
              <td className="py-2.5 text-[#f5f5f5] text-right">{row.value}</td>
            </tr>
          ))}
          <tr className="border-b border-[#1a1a1a]">
            <td className="py-2.5 text-[#888] w-24">난이도</td>
            <td className="py-2.5 text-right flex justify-end">
              <DotRating level={theme.difficulty} />
            </td>
          </tr>
          <tr className="border-b border-[#1a1a1a]">
            <td className="py-2.5 text-[#888] w-24">공포도</td>
            <td className="py-2.5 text-right flex justify-end">
              <DotRating level={theme.horrorLevel} />
            </td>
          </tr>
          <tr>
            <td className="py-2.5 text-[#888] w-24">평균 클리어율</td>
            <td className="py-2.5 text-[#2ecc71] font-bold text-right">{theme.clearRate}%</td>
          </tr>
        </tbody>
      </table>

      <p className="text-xs text-[#888] font-bold uppercase tracking-wider mb-3">상세 스토리</p>
      <p className="text-sm text-[#ccc] leading-relaxed">{theme.story}</p>
    </div>
  );
}

function ReviewTab({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="py-16 text-center text-[#888]">
        <p className="text-3xl mb-3">✍️</p>
        <p>아직 후기가 없습니다.</p>
        <p className="text-xs mt-1">첫 번째 후기를 남겨보세요!</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

function LocationTab({ theme }: { theme: ThemeDetailData }) {
  const { branchInfo } = theme;
  return (
    <div>
      <p className="text-xs text-[#888] font-bold uppercase tracking-wider mb-3">지점 안내</p>
      <table className="w-full text-sm mb-6">
        <tbody>
          {[
            { label: '지점명', value: theme.branchName },
            { label: '지역', value: theme.locationName },
            { label: '운영시간', value: branchInfo.hours },
            { label: '전화', value: branchInfo.phone },
          ].map(row => (
            <tr key={row.label} className="border-b border-[#1a1a1a]">
              <td className="py-2.5 text-[#888] w-24">{row.label}</td>
              <td className="py-2.5 text-[#f5f5f5] text-right">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-[#888] font-bold uppercase tracking-wider mb-2">주소</p>
      <p className="text-sm text-[#f5f5f5] leading-relaxed">{branchInfo.address}</p>
    </div>
  );
}

const createThemeDetailData = (theme: ThemeDetail): ThemeDetailData => ({
  id: theme.id,
  title: theme.title,
  description: theme.description,
  genre: theme.genre,
  difficulty: theme.difficulty,
  horrorLevel: theme.horrorLevel,
  minPlayers: theme.minPlayers,
  maxPlayers: theme.maxPlayers,
  duration: theme.duration,
  price: theme.price,
  imageUrl: theme.imageUrl,
  rating: theme.rating,
  reviewCount: theme.reviewCount,
  clearRate: theme.clearRate ?? 0,
  locationName: theme.locationName ?? '',
  branchName: theme.branchName ?? '',
  isBest: theme.isBest,
  isNew: theme.isNew,
  isHot: theme.isHot,
  story: theme.story || theme.description,
  notice: theme.notice || '예약 시간 10분 전 도착을 권장합니다.',
  timeSlots: (theme.availableTimes?.length ? theme.availableTimes : DEFAULT_TIME_SLOTS.map((slot) => slot.time)).map(
    (time) => ({ time, soldOut: false }),
  ),
  branchInfo: {
    phone: '',
    hours: '',
    address: [theme.locationName, theme.branchName].filter(Boolean).join(' · '),
  },
  reviews: [],
});

interface ReservationTabProps {
  theme: ThemeDetailData;
  selectedDate: string;
  selectedTime: string;
  onSelectDate: (d: string) => void;
  onSelectTime: (t: string) => void;
}

function ReservationTab({ theme, selectedDate, selectedTime, onSelectDate, onSelectTime }: ReservationTabProps) {
  return (
    <div>
      <ReservationCalendar selectedDate={selectedDate} onSelect={onSelectDate} />

      {selectedDate && (
        <div className="mt-4">
          <p className="text-xs text-[#888] font-bold uppercase tracking-wider mb-3">예약 가능 시간</p>
          <div className="grid grid-cols-3 gap-2">
            {theme.timeSlots.map(slot => (
              <button
                key={slot.time}
                disabled={slot.soldOut}
                onClick={() => !slot.soldOut && onSelectTime(slot.time)}
                className={[
                  'py-2.5 rounded text-sm border transition-colors',
                  slot.soldOut
                    ? 'border-[#1a1a1a] text-[#444] cursor-not-allowed line-through'
                    : selectedTime === slot.time
                      ? 'border-[#e63946] bg-[#e63946] text-white'
                      : 'border-[#2a2a2a] text-[#f5f5f5] hover:border-[#e63946]',
                ].join(' ')}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {theme.notice && (
        <div className="mt-5 flex gap-2 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded">
          <span className="text-blue-400 text-sm shrink-0">ℹ️</span>
          <div>
            <p className="text-xs font-bold text-[#f5f5f5] mb-0.5">주의사항</p>
            <p className="text-xs text-[#888]">{theme.notice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ThemeDetailPage({ params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = use(params);
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [apiTheme, setApiTheme] = useState<ThemeDetailData | null>(null);

  const fallbackTheme = MOCK_THEMES.find(t => t.id === parseInt(themeId)) ?? MOCK_THEMES[0];
  const theme = apiTheme ?? fallbackTheme;

  useEffect(() => {
    let isMounted = true;
    const id = Number(themeId);

    if (!Number.isFinite(id)) return;

    getThemeById(id)
      .then((data) => {
        if (isMounted) setApiTheme(createThemeDetailData(data));
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [themeId]);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'info', label: '상세 정보' },
    { id: 'review', label: '후기' },
    { id: 'location', label: '위치 안내' },
    { id: 'reservation', label: '예약' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="max-w-lg mx-auto relative">
        {/* Close button */}
        <Link
          href="/themes"
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/70 rounded-full flex items-center justify-center text-white text-lg hover:bg-black transition-colors"
          aria-label="닫기"
        >
          ✕
        </Link>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-[#111]">
          {theme.imageUrl ? (
            <Image
              src={theme.imageUrl}
              alt={theme.title}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 512px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />

          {/* Badge */}
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {theme.isBest && (
              <span className="bg-[#f39c12] text-white text-xs font-bold px-2.5 py-1 rounded">BEST</span>
            )}
            {theme.isHot && (
              <span className="bg-[#e63946] text-white text-xs font-bold px-2.5 py-1 rounded">HOT</span>
            )}
            {theme.isNew && (
              <span className="bg-[#2ecc71] text-white text-xs font-bold px-2.5 py-1 rounded">NEW</span>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs text-[#888] flex items-center gap-1 mb-1">
            <span>📍</span>
            <span>{theme.locationName} · {theme.branchName}</span>
          </p>
          <h1 className="text-2xl font-black text-[#f5f5f5] mb-2">{theme.title}</h1>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-0.5 text-[#888]">
              ⏱ {theme.duration}분
            </span>
            <span className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-0.5 text-[#888]">
              👥 {theme.minPlayers}~{theme.maxPlayers}명
            </span>
            <span className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-0.5 text-[#888]">
              ★ {theme.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-[#888]">{theme.description}</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 border-y border-[#2a2a2a] mt-3">
          {[
            { value: `★ ${theme.rating.toFixed(1)}`, label: '평점', color: 'text-[#f5f5f5]' },
            { value: String(theme.reviewCount), label: '리뷰', color: 'text-[#e63946]' },
            { value: `${theme.duration}분`, label: '소요', color: 'text-[#2ecc71]' },
            { value: `${theme.minPlayers}~${theme.maxPlayers}명`, label: '인원', color: 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="py-3 text-center border-r border-[#2a2a2a] last:border-r-0">
              <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-[#888] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-[#2a2a2a] sticky top-0 bg-[#0d0d0d] z-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex-1 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'text-[#e63946] border-b-2 border-[#e63946]'
                  : 'text-[#888] hover:text-[#f5f5f5]',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-4 py-4 pb-24">
          {activeTab === 'info' && <InfoTab theme={theme} />}
          {activeTab === 'review' && <ReviewTab reviews={theme.reviews} />}
          {activeTab === 'location' && <LocationTab theme={theme} />}
          {activeTab === 'reservation' && (
            <ReservationTab
              theme={theme}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={(d) => { setSelectedDate(d); setSelectedTime(''); }}
              onSelectTime={setSelectedTime}
            />
          )}
        </div>
      </div>

      {/* Bottom Action Bar — fixed, centered to content */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <div className="w-full max-w-lg bg-[#0d0d0d]/95 backdrop-blur border-t border-[#2a2a2a] px-4 py-3 flex gap-3 pointer-events-auto">
          <Link
            href="/themes"
            className="flex-1 text-center py-3 rounded border border-[#2a2a2a] text-[#f5f5f5] text-sm hover:bg-[#1a1a1a] transition-colors"
          >
            닫기
          </Link>
          <button
            onClick={() => setIsReservationOpen(true)}
            className="flex-[2] text-center py-3 rounded bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-medium transition-colors"
          >
            예약하기 →
          </button>
        </div>
      </div>

      {isReservationOpen && (
        <ReservationSlideOver
          theme={theme}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          times={theme.timeSlots}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setSelectedTime('');
          }}
          onSelectTime={setSelectedTime}
          onClose={() => setIsReservationOpen(false)}
        />
      )}
    </div>
  );
}
