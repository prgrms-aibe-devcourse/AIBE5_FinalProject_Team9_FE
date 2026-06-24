import assert from "node:assert/strict";
import {
  hasRecommendationIntent,
  isRecommendationConsent,
  processPreferenceMessage,
} from "../src/lib/aiRecommendConversation.ts";

const lowHorror = processPreferenceMessage(
  "무서운 거 잘 못해도 가능해?",
  {},
  null,
);
assert.equal(lowHorror.preferences.horror, "low");
assert.equal(lowHorror.pendingSlot, "partySize");
assert.match(lowHorror.reply, /몇 명/);

const partySize = processPreferenceMessage(
  "4",
  lowHorror.preferences,
  lowHorror.pendingSlot,
);
assert.equal(partySize.preferences.people, 4);
assert.equal(partySize.pendingSlot, "genre");
assert.match(partySize.reply, /4인 플레이 조건/);

const genreAny = processPreferenceMessage(
  "상관없어",
  partySize.preferences,
  partySize.pendingSlot,
);
assert.equal(genreAny.preferences.genreAny, true);
assert.equal(genreAny.pendingSlot, null);
assert.match(genreAny.reply, /장르는 제한하지 않고/);

for (const expression of [
  "추천",
  "추천해줘",
  "추천 ㄱㄱ",
  "추천 ㅋ",
  "응",
  "그래",
  "ㅇㅇ",
  "좋아",
]) {
  assert.equal(
    hasRecommendationIntent(expression) || isRecommendationConsent(expression),
    true,
    `${expression} should trigger recommendation`,
  );
}

for (const expression of ["4명", "4인", "네명", "넷"]) {
  const result = processPreferenceMessage(expression, { horror: "low" }, null);
  assert.equal(result.preferences.people, 4, `${expression} should mean four people`);
}

const horrorLevel = processPreferenceMessage("4", { people: 4 }, "horrorLevel");
assert.equal(horrorLevel.preferences.horrorLevel, 4);
assert.equal(horrorLevel.preferences.horror, "high");

const difficulty = processPreferenceMessage("4", { people: 4 }, "difficulty");
assert.equal(difficulty.preferences.difficulty, 4);

const ambiguousNumber = processPreferenceMessage("4", {}, null);
assert.equal(ambiguousNumber.understood, false);
assert.match(ambiguousNumber.reply, /4명이신가요.*공포도\/난이도 4/);

console.log("AI 추천 대화 상태 테스트 통과");
