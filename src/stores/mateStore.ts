'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  MatePost,
  MateComment,
  CreateMatePostRequest,
  UpdateMatePostRequest,
  MateFilter,
} from '@/types/mate';
import { validateMatePost, canEditOrDelete } from '@/lib/mateValidation';

/**
 * 백엔드 API가 준비되기 전까지 사용하는 로컬 스토어.
 * 영구 저장이 필요한 모집글/댓글 데이터를 localStorage에 보관한다.
 * 추후 mateService 의 실제 호출로 손쉽게 전환 가능하도록 동일한 인터페이스를 노출한다.
 */

const SEED_POSTS: MatePost[] = [
  { id: 1, title: '이번 주말 강남점 체벌린 같이 가실 분?', content: '공포 방탈출을 경험 10회 이상입니다! 진지하게 공략하기보다 분위기를 즐기며 플레이하고 싶습니다. 같이 무서워해줄 분 구해요 :) 카톡으로 연락주세요', authorId: 1, authorNickname: '김공포', locationName: '강남점', themeTitle: '체벌린', playDate: '2026-05-31', reservationTime: '18:30', deadlineDate: '2026-05-29', currentMembers: 2, totalMembers: 3, experienceLevel: 'ANY', atmosphereTags: ['진지하게', '즐겁게'], contactMethod: 'KAKAO', contactLink: 'https://open.kakao.com/o/seed1', status: 'OPEN', isPinned: true, commentCount: 5, createdAt: '2026-05-25T18:30:00' },
  { id: 2, title: '건대점 악마의 제단 고수 2명 구합니다', content: '이번이 세 번째 도전입니다. 이번엔 반드시 클리어! 방탈출 20회 이상, 공포 위주로 진행해 분 분 모집합니다.\n\n입문자분들은 다른 곳 이용해 주세요. 고수만 모십니다.', authorId: 3, authorNickname: '정배관', locationName: '건대점', themeTitle: '악마의 제단', playDate: '2026-05-31', reservationTime: '19:00', deadlineDate: '2026-05-30', currentMembers: 1, totalMembers: 3, experienceLevel: 'EXPERT', atmosphereTags: ['공략 위주', '진지하게'], contactMethod: 'KAKAO', contactLink: 'https://open.kakao.com/o/seed2', status: 'OPEN', commentCount: 18, createdAt: '2026-05-24T12:00:00' },
  { id: 3, title: '강남점 체벌린 일요일 저녁 4인 모집', content: '일요일 저녁 강남에서 체벌린 같이 보실 분 2명 모집합니다. 공포 보다는 재미 위주로 편하게 즐기고 싶어요.', authorId: 4, authorNickname: '한울서울', locationName: '강남점', themeTitle: '체벌린', playDate: '2026-05-30', reservationTime: '20:00', deadlineDate: '2026-05-29', currentMembers: 2, totalMembers: 4, experienceLevel: 'INTERMEDIATE', atmosphereTags: ['즐겁게', '분위기 위주'], contactMethod: 'KAKAO', contactLink: 'https://open.kakao.com/o/seed3', status: 'OPEN', commentCount: 3, createdAt: '2026-05-24T09:00:00' },
  { id: 4, title: '홍대점 저주받은 술 주말 오전 첫 모집', content: '주말 오전 여유롭게 즐길 분 1자리 모집합니다. 사진 찍고 가볍게 넘기는 거 좋아하는 분 환영해요!', authorId: 5, authorNickname: '그로토', locationName: '홍대점', themeTitle: '저주받은 술', playDate: '2026-05-30', reservationTime: '10:30', deadlineDate: '2026-05-29', currentMembers: 3, totalMembers: 4, experienceLevel: 'BEGINNER', atmosphereTags: ['즐겁게', '분위기 위주', '사진 촬영'], contactMethod: 'KAKAO', contactLink: 'https://open.kakao.com/o/seed4', status: 'OPEN', commentCount: 7, createdAt: '2026-05-23T16:00:00' },
  { id: 5, title: '건대점 악마의 병원 첫 방탈출 도전해요', content: '방탈출을 처음 도전해보고 싶습니다! 저처럼 공포 방탈출 경험이 적은 분들 찾아요.', authorId: 6, authorNickname: '나도전서', locationName: '건대점', themeTitle: '악마의 병원', playDate: '2026-05-31', reservationTime: '14:00', deadlineDate: '2026-05-29', currentMembers: 4, totalMembers: 5, experienceLevel: 'BEGINNER', atmosphereTags: ['즐겁게', '처음 만난 팬텀'], contactMethod: 'COMMENT', status: 'OPEN', commentCount: 2, createdAt: '2026-05-23T11:00:00' },
  { id: 6, title: '강남점 살인마의 방 3인 딱 1자리 남았어요', content: '내일 강남점 살인마의 방 3인 1자리 있습니다. 난이도 최고 등급이라 공포 방탈출 어느 정도 하신분 오시면 좋겠습니다.', authorId: 7, authorNickname: '최긍박', locationName: '강남점', themeTitle: '살인마의 방', playDate: '2026-05-27', reservationTime: '21:00', deadlineDate: '2026-05-26', currentMembers: 3, totalMembers: 3, experienceLevel: 'EXPERT', atmosphereTags: ['진지하게', '공략 위주'], contactMethod: 'KAKAO', contactLink: 'https://open.kakao.com/o/seed6', status: 'FULL', commentCount: 12, createdAt: '2026-05-22T21:00:00' },
  { id: 7, title: '좀비 아포칼립스 같이 갈 사람', content: '좀비 아포칼립스 이번 달 2회 플레이하고 싶어 모집합니다. 공략 공유하며 진지하게 도전할 인원을 모십니다.', authorId: 8, authorNickname: '이할동', locationName: '강남점', themeTitle: '좀비 아포칼립스', playDate: '2026-06-01', reservationTime: '20:00', deadlineDate: '2026-05-31', currentMembers: 2, totalMembers: 4, experienceLevel: 'EXPERT', atmosphereTags: ['공략 위주', '진지하게'], contactMethod: 'KAKAO', contactLink: 'https://open.kakao.com/o/seed7', status: 'OPEN', commentCount: 4, createdAt: '2026-05-22T09:00:00' },
  { id: 8, title: '홍대점 13번째 방 주말 편하게 즐겨요', content: '주말 저녁 홍대 13번째 방 같이 도전할 분 모집합니다! 공포 좋아하고 분위기 있는 방탈출 좋아하는 분들이면 환영해요.', authorId: 9, authorNickname: '박공포', locationName: '홍대점', themeTitle: '13번째 방', playDate: '2026-06-01', reservationTime: '19:00', deadlineDate: '2026-05-30', currentMembers: 1, totalMembers: 4, experienceLevel: 'ANY', atmosphereTags: ['즐겁게', '분위기 위주'], contactMethod: 'COMMENT', status: 'OPEN', commentCount: 1, createdAt: '2026-05-21T15:00:00' },
];

const SEED_COMMENTS: MateComment[] = [
  { id: 1, postId: 2, userId: 10, userNickname: '이달돌', content: '저 방탈출 30회 이상이에요! 경험자입니다. 카톡 링크 알려주세요!', createdAt: '2026-05-24T13:00:00' },
  { id: 2, postId: 2, userId: 11, userNickname: '나도잘해', content: '악마의 제단 두 번 도전했는데 아직 클리어 못 했습니다. 이번엔 같이 클리어 해봐요!', createdAt: '2026-05-24T14:30:00' },
  { id: 3, postId: 2, userId: 12, userNickname: '김방탈', content: '혹시 19:00 말고 다른 시간대도 가능하신가요? 20:00이면 딱인데..', createdAt: '2026-05-24T16:00:00' },
  { id: 4, postId: 2, userId: 3, userNickname: '정배관', content: '@김방탈 죄송합니다, 이미 예약이 19시로 되어있어서요. 다음에 기회가 있으면 같이해요!', createdAt: '2026-05-24T16:30:00' },
];

export class MateForbiddenError extends Error {
  constructor(message = '권한이 없습니다.') {
    super(message);
    this.name = 'MateForbiddenError';
  }
}
export class MateNotFoundError extends Error {
  constructor(message = '존재하지 않는 모집글입니다.') {
    super(message);
    this.name = 'MateNotFoundError';
  }
}
export class MateValidationException extends Error {
  errors: { field: string; message: string }[];
  constructor(errors: { field: string; message: string }[]) {
    super('유효성 검사 실패');
    this.name = 'MateValidationException';
    this.errors = errors;
  }
}

interface MateStoreState {
  posts: MatePost[];
  comments: MateComment[];
  nextPostId: number;
  nextCommentId: number;

  // ─── 조회 ───
  listPosts: (filter?: MateFilter) => {
    items: MatePost[];
    total: number;
    totalPages: number;
    page: number;
    size: number;
  };
  getPost: (id: number) => MatePost | undefined;
  getMyPosts: (userId: number) => MatePost[];
  listComments: (postId: number) => MateComment[];

  // ─── 변형 ───
  createPost: (payload: CreateMatePostRequest, author: { id: number; nickname: string; profileImageUrl?: string }) => MatePost;
  updatePost: (id: number, payload: UpdateMatePostRequest, userId: number) => MatePost;
  deletePost: (id: number, userId: number) => void;

  addComment: (postId: number, content: string, user: { id: number; nickname: string; profileImageUrl?: string }) => MateComment;
  removeComment: (commentId: number, userId: number) => void;

  // 디버그/리셋
  reset: () => void;
}

export const useMateStore = create<MateStoreState>()(
  persist(
    (set, get) => ({
      posts: SEED_POSTS,
      comments: SEED_COMMENTS,
      nextPostId: SEED_POSTS.length + 1,
      nextCommentId: SEED_COMMENTS.length + 1,

      listPosts: (filter = {}) => {
        const {
          search, status, locations, experienceLevel, tags, authorId,
          page = 1, size = 6,
        } = filter;
        let list = [...get().posts];

        if (authorId != null) list = list.filter(p => p.authorId === authorId);
        if (search) {
          const q = search.toLowerCase();
          list = list.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.locationName.toLowerCase().includes(q) ||
            p.themeTitle.toLowerCase().includes(q)
          );
        }
        if (status && status !== 'ALL') list = list.filter(p => p.status === status);
        if (locations && locations.length) list = list.filter(p => locations.includes(p.locationName));
        if (experienceLevel) list = list.filter(p => p.experienceLevel === experienceLevel);
        if (tags && tags.length) list = list.filter(p => tags.every(t => p.atmosphereTags.includes(t)));

        list.sort((a, b) => {
          const pinDiff = (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
          if (pinDiff !== 0) return pinDiff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        const total = list.length;
        const totalPages = Math.max(1, Math.ceil(total / size));
        const safePage = Math.min(Math.max(1, page), totalPages);
        const items = list.slice((safePage - 1) * size, safePage * size);

        return { items, total, totalPages, page: safePage, size };
      },

      getPost: (id) => get().posts.find(p => p.id === id),

      getMyPosts: (userId) =>
        get().posts.filter(p => p.authorId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),

      listComments: (postId) =>
        get().comments
          .filter(c => c.postId === postId)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),

      createPost: (payload, author) => {
        const errors = validateMatePost(payload);
        if (errors.length) throw new MateValidationException(errors);

        const id = get().nextPostId;
        const now = new Date().toISOString();
        const newPost: MatePost = {
          id,
          title: payload.title.trim(),
          content: payload.content.trim(),
          authorId: author.id,
          authorNickname: author.nickname,
          authorProfileImageUrl: author.profileImageUrl,
          locationName: payload.locationName,
          themeTitle: payload.themeTitle,
          playDate: payload.playDate,
          reservationTime: payload.reservationTime,
          deadlineDate: payload.deadlineDate ?? payload.playDate,
          currentMembers: payload.myCount,
          totalMembers: payload.myCount + payload.recruitCount,
          experienceLevel: payload.experienceLevel,
          atmosphereTags: payload.atmosphereTags,
          contactMethod: payload.contactMethod,
          contactLink: payload.contactLink,
          status: 'OPEN',
          isPinned: false,
          commentCount: 0,
          createdAt: now,
          updatedAt: now,
        };

        set(state => ({
          posts: [newPost, ...state.posts],
          nextPostId: state.nextPostId + 1,
        }));
        return newPost;
      },

      updatePost: (id, payload, userId) => {
        const existing = get().posts.find(p => p.id === id);
        if (!existing) throw new MateNotFoundError();
        if (!canEditOrDelete(existing, userId)) throw new MateForbiddenError('본인의 글만 수정할 수 있습니다.');

        // 부분 업데이트 검증을 위해 merge 후 검사
        const merged: Partial<CreateMatePostRequest> = {
          title: payload.title ?? existing.title,
          content: payload.content ?? existing.content,
          locationName: payload.locationName ?? existing.locationName,
          themeTitle: payload.themeTitle ?? existing.themeTitle,
          playDate: payload.playDate ?? existing.playDate,
          reservationTime: payload.reservationTime ?? existing.reservationTime,
          deadlineDate: payload.deadlineDate ?? existing.deadlineDate,
          myCount: payload.myCount ?? existing.currentMembers,
          recruitCount:
            payload.recruitCount ??
            Math.max(0, existing.totalMembers - existing.currentMembers),
          experienceLevel: payload.experienceLevel ?? existing.experienceLevel,
          atmosphereTags: payload.atmosphereTags ?? existing.atmosphereTags,
          contactMethod: payload.contactMethod ?? existing.contactMethod,
          contactLink: payload.contactLink ?? existing.contactLink,
        };
        const errors = validateMatePost(merged);
        if (errors.length) throw new MateValidationException(errors);

        const updated: MatePost = {
          ...existing,
          title: merged.title!.trim(),
          content: merged.content!.trim(),
          locationName: merged.locationName!,
          themeTitle: merged.themeTitle!,
          playDate: merged.playDate!,
          reservationTime: merged.reservationTime!,
          deadlineDate: merged.deadlineDate!,
          currentMembers: merged.myCount!,
          totalMembers: merged.myCount! + merged.recruitCount!,
          experienceLevel: merged.experienceLevel!,
          atmosphereTags: merged.atmosphereTags!,
          contactMethod: merged.contactMethod!,
          contactLink: merged.contactLink,
          status: payload.status ?? existing.status,
          updatedAt: new Date().toISOString(),
        };

        set(state => ({
          posts: state.posts.map(p => (p.id === id ? updated : p)),
        }));
        return updated;
      },

      deletePost: (id, userId) => {
        const existing = get().posts.find(p => p.id === id);
        if (!existing) throw new MateNotFoundError();
        if (!canEditOrDelete(existing, userId)) throw new MateForbiddenError('본인의 글만 삭제할 수 있습니다.');

        set(state => ({
          posts: state.posts.filter(p => p.id !== id),
          comments: state.comments.filter(c => c.postId !== id),
        }));
      },

      addComment: (postId, content, user) => {
        const trimmed = content.trim();
        if (!trimmed) throw new MateValidationException([{ field: 'content', message: '댓글 내용을 입력해주세요.' }]);
        if (trimmed.length > 300) throw new MateValidationException([{ field: 'content', message: '댓글은 300자까지 입력 가능합니다.' }]);
        const post = get().posts.find(p => p.id === postId);
        if (!post) throw new MateNotFoundError();

        const id = get().nextCommentId;
        const newComment: MateComment = {
          id,
          postId,
          userId: user.id,
          userNickname: user.nickname,
          userProfileImageUrl: user.profileImageUrl,
          content: trimmed,
          createdAt: new Date().toISOString(),
        };
        set(state => ({
          comments: [...state.comments, newComment],
          nextCommentId: state.nextCommentId + 1,
          posts: state.posts.map(p =>
            p.id === postId ? { ...p, commentCount: (p.commentCount ?? 0) + 1 } : p
          ),
        }));
        return newComment;
      },

      removeComment: (commentId, userId) => {
        const c = get().comments.find(x => x.id === commentId);
        if (!c) throw new MateNotFoundError('존재하지 않는 댓글입니다.');
        if (c.userId !== userId) throw new MateForbiddenError('본인 댓글만 삭제할 수 있습니다.');
        set(state => ({
          comments: state.comments.filter(x => x.id !== commentId),
          posts: state.posts.map(p =>
            p.id === c.postId ? { ...p, commentCount: Math.max(0, (p.commentCount ?? 1) - 1) } : p
          ),
        }));
      },

      reset: () => set({
        posts: SEED_POSTS,
        comments: SEED_COMMENTS,
        nextPostId: SEED_POSTS.length + 1,
        nextCommentId: SEED_COMMENTS.length + 1,
      }),
    }),
    {
      name: 'grimgate-mate',
      partialize: (state) => ({
        posts: state.posts,
        comments: state.comments,
        nextPostId: state.nextPostId,
        nextCommentId: state.nextCommentId,
      }),
    }
  )
);
