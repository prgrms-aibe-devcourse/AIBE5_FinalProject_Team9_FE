#!/usr/bin/env node
/**
 * mateValidation + mateStore 동작 검증.
 * tsx를 사용해 TS 소스를 직접 실행한다.
 *   npx tsx scripts/test-mate.mjs
 */
import { validateMatePost, canEditOrDelete, toFieldErrorMap } from '../src/lib/mateValidation.ts';

let passed = 0;
let failed = 0;
const results = [];

function test(name, fn) {
  try {
    fn();
    results.push(`✅ ${name}`);
    passed++;
  } catch (e) {
    results.push(`❌ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg ?? 'assertion failed');
}
function assertEq(a, b, msg) {
  if (a !== b) throw new Error(`${msg ?? 'not equal'}: ${a} !== ${b}`);
}

// ─── 미래 날짜 (검증 통과용) ───
const future = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const validPayload = () => ({
  title: '강남점 체벌린 주말 모집',
  content: '함께 즐겁게 플레이할 메이트 찾습니다!',
  locationName: '강남점',
  themeTitle: '체벌린',
  playDate: future(7),
  reservationTime: '19:00',
  deadlineDate: future(5),
  myCount: 2,
  recruitCount: 2,
  experienceLevel: 'ANY',
  atmosphereTags: ['즐겁게', '분위기 위주'],
  contactMethod: 'KAKAO',
  contactLink: 'https://open.kakao.com/o/test123',
});

// ─── 정상 케이스 ───
test('정상 페이로드는 에러 없음', () => {
  const errs = validateMatePost(validPayload());
  assert(errs.length === 0, `errors: ${JSON.stringify(errs)}`);
});

// ─── 제목 ───
test('제목 비어있음 → 에러', () => {
  const p = { ...validPayload(), title: '' };
  const errs = validateMatePost(p);
  assert(errs.some(e => e.field === 'title'));
});
test('제목 너무 짧음 (5자 미만) → 에러', () => {
  const p = { ...validPayload(), title: 'abc' };
  assert(validateMatePost(p).some(e => e.field === 'title'));
});
test('제목 51자 → 에러', () => {
  const p = { ...validPayload(), title: 'a'.repeat(51) };
  assert(validateMatePost(p).some(e => e.field === 'title'));
});

// ─── 내용 ───
test('내용 너무 짧음 → 에러', () => {
  const p = { ...validPayload(), content: '짧음' };
  assert(validateMatePost(p).some(e => e.field === 'content'));
});
test('내용 1001자 → 에러', () => {
  const p = { ...validPayload(), content: '가'.repeat(1001) };
  assert(validateMatePost(p).some(e => e.field === 'content'));
});

// ─── 지점/테마 ───
test('지점 미선택 → 에러', () => {
  const p = { ...validPayload(), locationName: '' };
  assert(validateMatePost(p).some(e => e.field === 'locationName'));
});
test('잘못된 지점 → 에러', () => {
  const p = { ...validPayload(), locationName: '없는점' };
  assert(validateMatePost(p).some(e => e.field === 'locationName'));
});
test('테마 미선택 → 에러', () => {
  const p = { ...validPayload(), themeTitle: '' };
  assert(validateMatePost(p).some(e => e.field === 'themeTitle'));
});

// ─── 날짜 ───
test('과거 플레이 날짜 → 에러', () => {
  const p = { ...validPayload(), playDate: '2020-01-01' };
  assert(validateMatePost(p).some(e => e.field === 'playDate'));
});
test('잘못된 날짜 형식 → 에러', () => {
  const p = { ...validPayload(), playDate: '2026/01/01' };
  assert(validateMatePost(p).some(e => e.field === 'playDate'));
});
test('마감일이 플레이 날짜보다 늦음 → 에러', () => {
  const p = { ...validPayload(), playDate: future(5), deadlineDate: future(10) };
  assert(validateMatePost(p).some(e => e.field === 'deadlineDate'));
});

// ─── 시간 ───
test('잘못된 시간 형식 → 에러', () => {
  const p = { ...validPayload(), reservationTime: '25:99' };
  assert(validateMatePost(p).some(e => e.field === 'reservationTime'));
});

// ─── 인원 ───
test('총 인원 7명 → 에러', () => {
  const p = { ...validPayload(), myCount: 4, recruitCount: 3 };
  assert(validateMatePost(p).some(e => e.field === 'recruitCount'));
});
test('인원 0 → 에러', () => {
  const p = { ...validPayload(), myCount: 0 };
  assert(validateMatePost(p).some(e => e.field === 'myCount'));
});

// ─── 태그 ───
test('태그 6개 → 에러', () => {
  const p = { ...validPayload(), atmosphereTags: ['진지하게','즐겁게','공략 위주','분위기 위주','처음 만난 팬텀','여성만'] };
  assert(validateMatePost(p).some(e => e.field === 'atmosphereTags'));
});
test('잘못된 태그 → 에러', () => {
  const p = { ...validPayload(), atmosphereTags: ['없는태그'] };
  assert(validateMatePost(p).some(e => e.field === 'atmosphereTags'));
});
test('중복 태그 → 에러', () => {
  const p = { ...validPayload(), atmosphereTags: ['즐겁게','즐겁게'] };
  assert(validateMatePost(p).some(e => e.field === 'atmosphereTags'));
});

// ─── 연락 방법 ───
test('카카오인데 링크 없음 → 에러', () => {
  const p = { ...validPayload(), contactMethod: 'KAKAO', contactLink: '' };
  assert(validateMatePost(p).some(e => e.field === 'contactLink'));
});
test('잘못된 카카오 링크 → 에러', () => {
  const p = { ...validPayload(), contactLink: 'https://naver.com/x' };
  assert(validateMatePost(p).some(e => e.field === 'contactLink'));
});
test('댓글 연락이면 링크 불필요', () => {
  const p = { ...validPayload(), contactMethod: 'COMMENT', contactLink: '' };
  assert(validateMatePost(p).length === 0);
});

// ─── canEditOrDelete ───
test('작성자 본인 → 수정/삭제 가능', () => {
  assert(canEditOrDelete({ authorId: 5 }, 5));
});
test('타인 → 수정/삭제 불가', () => {
  assert(!canEditOrDelete({ authorId: 5 }, 6));
});
test('비로그인 → 수정/삭제 불가', () => {
  assert(!canEditOrDelete({ authorId: 5 }, null));
  assert(!canEditOrDelete({ authorId: 5 }, undefined));
});

// ─── toFieldErrorMap ───
test('필드 에러 맵 변환 - 첫 에러만 유지', () => {
  const errs = [
    { field: 'title', message: 'A' },
    { field: 'title', message: 'B' },
    { field: 'content', message: 'C' },
  ];
  const map = toFieldErrorMap(errs);
  assertEq(map.title, 'A');
  assertEq(map.content, 'C');
});

console.log(results.join('\n'));
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
