import {
  CreateMatePostRequest,
  MateValidationError,
  ContactMethod,
  ExperienceLevel,
} from '@/types/mate';

export const MATE_CONSTRAINTS = {
  TITLE_MIN: 5,
  TITLE_MAX: 50,
  CONTENT_MIN: 10,
  CONTENT_MAX: 1000,
  MEMBER_MIN: 1,
  MEMBER_MAX: 6,
  TOTAL_MAX: 6,
  TAG_MAX: 5,
} as const;

const ALLOWED_LOCATIONS = ['강남점', '홍대점', '건대점', '신촌점'];
const ALLOWED_EXP: ExperienceLevel[] = ['ANY', 'BEGINNER', 'INTERMEDIATE', 'EXPERT'];
const ALLOWED_CONTACT: ContactMethod[] = ['KAKAO', 'COMMENT'];
const ALLOWED_TAGS = [
  '진지하게', '즐겁게', '공략 위주', '분위기 위주',
  '처음 만난 팬텀', '여성만', '사진 촬영',
];

const KAKAO_OPEN_URL_RE = /^https?:\/\/open\.kakao\.com\/.+/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]?\d|2[0-3]):[0-5]\d$/;

function startOfToday(): Date {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

function parseDate(value: string): Date | null {
  if (!DATE_RE.test(value)) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 모집글 등록/수정 데이터 유효성 검증.
 * 반환 배열이 비어있으면 검증 통과.
 */
export function validateMatePost(
  payload: Partial<CreateMatePostRequest>
): MateValidationError[] {
  const errors: MateValidationError[] = [];
  const push = (field: string, message: string) =>
    errors.push({ field, message });

  // ── 제목 ──
  const title = (payload.title ?? '').trim();
  if (!title) push('title', '제목을 입력해주세요.');
  else if (title.length < MATE_CONSTRAINTS.TITLE_MIN)
    push('title', `제목은 최소 ${MATE_CONSTRAINTS.TITLE_MIN}자 이상이어야 합니다.`);
  else if (title.length > MATE_CONSTRAINTS.TITLE_MAX)
    push('title', `제목은 최대 ${MATE_CONSTRAINTS.TITLE_MAX}자까지 입력 가능합니다.`);

  // ── 상세 내용 ──
  const content = (payload.content ?? '').trim();
  if (!content) push('content', '상세 내용을 입력해주세요.');
  else if (content.length < MATE_CONSTRAINTS.CONTENT_MIN)
    push('content', `상세 내용은 최소 ${MATE_CONSTRAINTS.CONTENT_MIN}자 이상이어야 합니다.`);
  else if (content.length > MATE_CONSTRAINTS.CONTENT_MAX)
    push('content', `상세 내용은 최대 ${MATE_CONSTRAINTS.CONTENT_MAX}자까지 입력 가능합니다.`);

  // ── 지점 ──
  if (!payload.locationName) push('locationName', '지점을 선택해주세요.');
  else if (!ALLOWED_LOCATIONS.includes(payload.locationName))
    push('locationName', '유효하지 않은 지점입니다.');

  // ── 테마 ──
  if (!payload.themeTitle) push('themeTitle', '테마를 선택해주세요.');

  // ── 플레이 날짜 ──
  const playDate = payload.playDate ?? '';
  const playDateObj = parseDate(playDate);
  if (!playDate) push('playDate', '플레이 날짜를 선택해주세요.');
  else if (!playDateObj)
    push('playDate', '날짜 형식이 올바르지 않습니다.');
  else if (playDateObj < startOfToday())
    push('playDate', '플레이 날짜는 오늘 이후여야 합니다.');

  // ── 예약 시간 ──
  if (!payload.reservationTime)
    push('reservationTime', '예약 시간을 선택해주세요.');
  else if (!TIME_RE.test(payload.reservationTime))
    push('reservationTime', '시간 형식이 올바르지 않습니다.');

  // ── 마감 날짜 (선택) ──
  if (payload.deadlineDate) {
    const deadlineObj = parseDate(payload.deadlineDate);
    if (!deadlineObj) push('deadlineDate', '마감일 형식이 올바르지 않습니다.');
    else {
      if (deadlineObj < startOfToday())
        push('deadlineDate', '마감일은 오늘 이후여야 합니다.');
      if (playDateObj && deadlineObj > playDateObj)
        push('deadlineDate', '마감일은 플레이 날짜보다 이전이어야 합니다.');
    }
  }

  // ── 인원 ──
  const myCount = payload.myCount ?? 0;
  const recruitCount = payload.recruitCount ?? 0;
  if (myCount < MATE_CONSTRAINTS.MEMBER_MIN)
    push('myCount', `내 인원은 최소 ${MATE_CONSTRAINTS.MEMBER_MIN}명 이상이어야 합니다.`);
  if (recruitCount < MATE_CONSTRAINTS.MEMBER_MIN)
    push('recruitCount', `모집 인원은 최소 ${MATE_CONSTRAINTS.MEMBER_MIN}명 이상이어야 합니다.`);
  if (myCount + recruitCount > MATE_CONSTRAINTS.TOTAL_MAX)
    push('recruitCount', `총 인원은 ${MATE_CONSTRAINTS.TOTAL_MAX}명을 초과할 수 없습니다.`);

  // ── 경험 레벨 ──
  if (!payload.experienceLevel)
    push('experienceLevel', '경험 레벨을 선택해주세요.');
  else if (!ALLOWED_EXP.includes(payload.experienceLevel))
    push('experienceLevel', '유효하지 않은 경험 레벨입니다.');

  // ── 태그 ──
  const tags = payload.atmosphereTags ?? [];
  if (!Array.isArray(tags))
    push('atmosphereTags', '태그 형식이 올바르지 않습니다.');
  else {
    if (tags.length > MATE_CONSTRAINTS.TAG_MAX)
      push('atmosphereTags', `태그는 최대 ${MATE_CONSTRAINTS.TAG_MAX}개까지 선택 가능합니다.`);
    const invalid = tags.filter(t => !ALLOWED_TAGS.includes(t));
    if (invalid.length > 0)
      push('atmosphereTags', `유효하지 않은 태그: ${invalid.join(', ')}`);
    if (new Set(tags).size !== tags.length)
      push('atmosphereTags', '중복된 태그가 있습니다.');
  }

  // ── 연락 방법 ──
  if (!payload.contactMethod)
    push('contactMethod', '연락 방법을 선택해주세요.');
  else if (!ALLOWED_CONTACT.includes(payload.contactMethod))
    push('contactMethod', '유효하지 않은 연락 방법입니다.');
  else if (payload.contactMethod === 'KAKAO') {
    const link = (payload.contactLink ?? '').trim();
    if (!link) push('contactLink', '카카오톡 오픈채팅 링크를 입력해주세요.');
    else if (!KAKAO_OPEN_URL_RE.test(link))
      push('contactLink', '올바른 카카오 오픈채팅 링크가 아닙니다. (https://open.kakao.com/...)');
  }

  return errors;
}

/** 필드별 첫 에러 메시지를 객체로 반환. UI 노출에 편리. */
export function toFieldErrorMap(
  errors: MateValidationError[]
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const e of errors) {
    if (!map[e.field]) map[e.field] = e.message;
  }
  return map;
}

/** 권한 체크: 작성자 본인만 수정/삭제 가능 */
export function canEditOrDelete(
  post: { authorId: number },
  currentUserId: number | null | undefined
): boolean {
  if (currentUserId == null) return false;
  return post.authorId === currentUserId;
}
