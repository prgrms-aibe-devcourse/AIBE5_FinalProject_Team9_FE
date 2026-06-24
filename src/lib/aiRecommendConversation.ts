export type PendingSlot =
  | "partySize"
  | "horrorLevel"
  | "difficulty"
  | "genre"
  | null;

export type RecommendationPreferences = {
  people?: number;
  horror?: "low" | "high";
  horrorLevel?: number;
  difficulty?: number;
  genre?: "mystery" | "story";
  genreAny?: boolean;
  region?: string;
};

export type ConversationResult = {
  preferences: RecommendationPreferences;
  pendingSlot: PendingSlot;
  reply: string;
  understood: boolean;
};

const partyWordValues: Record<string, number> = {
  한: 1,
  하나: 1,
  두: 2,
  둘: 2,
  세: 3,
  셋: 3,
  네: 4,
  넷: 4,
  다섯: 5,
  여섯: 6,
  일곱: 7,
  여덟: 8,
};

const regionPattern =
  /(서울|강남|홍대|건대|신촌|잠실|부산|대구|인천|대전|광주|수원)/;
const indifferentPattern = /상관\s*없|아무거나|무관|괜찮아/;
const numericOnlyPattern = /^\d+$/;

export const hasRecommendationIntent = (message: string) =>
  /추천/.test(message) ||
  /(테마|방탈출).*(찾아|골라)/.test(message) ||
  /(찾아|골라)\s*(줘|주세요)/.test(message) ||
  /뭐가\s*(좋을까|괜찮을까)/.test(message);

export const isRecommendationConsent = (message: string) =>
  /^(추천(?:\s*(?:해줘|해주세요|ㄱ+|ㅋ+))?|응|그래|ㅇㅇ|좋아)[!?.\s]*$/.test(
    message.trim(),
  );

const parsePartySize = (message: string) => {
  const digitMatch = message.match(/(\d+)\s*(?:명|인)/);
  if (digitMatch) return Number(digitMatch[1]);

  const wordWithUnit = message.match(
    /(한|하나|두|둘|세|셋|네|넷|다섯|여섯|일곱|여덟)\s*(?:명|인)/,
  );
  if (wordWithUnit) return partyWordValues[wordWithUnit[1]];

  const standaloneWord = message.trim().match(/^(한|하나|두|둘|세|셋|네|넷|다섯|여섯|일곱|여덟)$/);
  return standaloneWord ? partyWordValues[standaloneWord[1]] : undefined;
};

const parseScaleValue = (message: string, label: "공포도" | "난이도") => {
  const match = message.match(new RegExp(`${label}\\s*(?:는|가|를|은)?\\s*([1-5])`));
  return match ? Number(match[1]) : undefined;
};

const nextQuestion = (
  preferences: RecommendationPreferences,
): Pick<ConversationResult, "pendingSlot" | "reply"> => {
  if (!preferences.people) {
    return {
      pendingSlot: "partySize",
      reply: "몇 명이서 가시나요?",
    };
  }

  if (!preferences.horror && !preferences.horrorLevel) {
    return {
      pendingSlot: "horrorLevel",
      reply: "공포도는 1부터 5 중 어느 정도가 좋아요?",
    };
  }

  if (!preferences.genre && !preferences.genreAny) {
    return {
      pendingSlot: "genre",
      reply: `${preferences.people}인 플레이 조건을 추가했어요. 좋아하는 장르나 분위기는 어떤 쪽인가요?`,
    };
  }

  return {
    pendingSlot: null,
    reply: "조건을 모두 확인했어요. 준비되면 “추천해줘”라고 해주세요.",
  };
};

const applyPendingNumber = (
  value: number,
  preferences: RecommendationPreferences,
  pendingSlot: Exclude<PendingSlot, "genre" | null>,
): ConversationResult => {
  if (pendingSlot === "partySize") {
    if (value < 1 || value > 20) {
      return {
        preferences,
        pendingSlot,
        reply: "인원은 1명부터 20명 사이로 알려주세요.",
        understood: false,
      };
    }

    const nextPreferences = { ...preferences, people: value };
    const next = nextQuestion(nextPreferences);
    return {
      preferences: nextPreferences,
      pendingSlot: next.pendingSlot,
      reply: next.reply,
      understood: true,
    };
  }

  if (value < 1 || value > 5) {
    return {
      preferences,
      pendingSlot,
      reply: `${pendingSlot === "horrorLevel" ? "공포도" : "난이도"}는 1부터 5 사이로 알려주세요.`,
      understood: false,
    };
  }

  const nextPreferences =
    pendingSlot === "horrorLevel"
      ? {
          ...preferences,
          horrorLevel: value,
          horror: value <= 2 ? ("low" as const) : value >= 4 ? ("high" as const) : undefined,
        }
      : { ...preferences, difficulty: value };
  const next = nextQuestion(nextPreferences);

  return {
    preferences: nextPreferences,
    pendingSlot: next.pendingSlot,
    reply:
      pendingSlot === "horrorLevel"
        ? `공포도 ${value} 조건을 추가했어요. ${next.reply}`
        : `난이도 ${value} 조건을 추가했어요. ${next.reply}`,
    understood: true,
  };
};

export const processPreferenceMessage = (
  rawMessage: string,
  currentPreferences: RecommendationPreferences,
  pendingSlot: PendingSlot,
): ConversationResult => {
  const message = rawMessage.trim();
  const preferences = { ...currentPreferences };
  const numericOnly = numericOnlyPattern.test(message) ? Number(message) : undefined;

  if (numericOnly !== undefined) {
    if (pendingSlot === "partySize" || pendingSlot === "horrorLevel" || pendingSlot === "difficulty") {
      return applyPendingNumber(numericOnly, preferences, pendingSlot);
    }

    return {
      preferences,
      pendingSlot,
      reply: `${numericOnly}명이신가요, 아니면 공포도/난이도 ${numericOnly}를 말씀하신 걸까요?`,
      understood: false,
    };
  }

  if (pendingSlot === "genre" && indifferentPattern.test(message)) {
    const nextPreferences = {
      ...preferences,
      genre: undefined,
      genreAny: true,
    };
    return {
      preferences: nextPreferences,
      pendingSlot: null,
      reply:
        "장르는 제한하지 않고, 인원과 공포도 조건을 중심으로 찾을게요. 준비되면 “추천해줘”라고 해주세요.",
      understood: true,
    };
  }

  const partySize = parsePartySize(message);
  if (partySize !== undefined) {
    return applyPendingNumber(partySize, preferences, "partySize");
  }

  const explicitHorrorLevel = parseScaleValue(message, "공포도");
  if (explicitHorrorLevel !== undefined) {
    return applyPendingNumber(explicitHorrorLevel, preferences, "horrorLevel");
  }

  const explicitDifficulty = parseScaleValue(message, "난이도");
  if (explicitDifficulty !== undefined) {
    return applyPendingNumber(explicitDifficulty, preferences, "difficulty");
  }

  if (/무서|공포|쫄|겁/.test(message) && /(못|싫|낮|약|안\s*무서)/.test(message)) {
    const nextPreferences = { ...preferences, horror: "low" as const, horrorLevel: undefined };
    const next = nextQuestion(nextPreferences);
    return {
      preferences: nextPreferences,
      pendingSlot: next.pendingSlot,
      reply:
        next.pendingSlot === "partySize"
          ? "물론이에요. 공포도가 낮고 부담 없이 즐길 수 있는 테마로 볼게요. 몇 명이서 가시나요?"
          : `공포도가 낮은 테마를 우선으로 볼게요. ${next.reply}`,
      understood: true,
    };
  }

  if (/무서|공포|쫄|겁/.test(message) && /(좋|높|강|진짜|매우)/.test(message)) {
    const nextPreferences = { ...preferences, horror: "high" as const, horrorLevel: undefined };
    const next = nextQuestion(nextPreferences);
    return {
      preferences: nextPreferences,
      pendingSlot: next.pendingSlot,
      reply: `공포감이 강한 테마를 우선으로 볼게요. ${next.reply}`,
      understood: true,
    };
  }

  if (/스토리|서사/.test(message) && /미스터리|추리/.test(message)) {
    const nextPreferences = {
      ...preferences,
      genre: "mystery" as const,
      genreAny: false,
    };
    const next = nextQuestion(nextPreferences);
    return {
      preferences: nextPreferences,
      pendingSlot: next.pendingSlot,
      reply: `스토리가 탄탄한 미스터리·추리 테마를 우선으로 볼게요. ${next.reply}`,
      understood: true,
    };
  }

  if (/미스터리|추리/.test(message)) {
    const nextPreferences = {
      ...preferences,
      genre: "mystery" as const,
      genreAny: false,
    };
    const next = nextQuestion(nextPreferences);
    return {
      preferences: nextPreferences,
      pendingSlot: next.pendingSlot,
      reply: `미스터리·추리 분위기를 조건에 추가했어요. ${next.reply}`,
      understood: true,
    };
  }

  if (/스토리|서사/.test(message)) {
    const nextPreferences = {
      ...preferences,
      genre: "story" as const,
      genreAny: false,
    };
    const next = nextQuestion(nextPreferences);
    return {
      preferences: nextPreferences,
      pendingSlot: next.pendingSlot,
      reply: `스토리 중심 테마를 우선으로 볼게요. ${next.reply}`,
      understood: true,
    };
  }

  const regionMatch = message.match(regionPattern);
  if (regionMatch) {
    const nextPreferences = { ...preferences, region: regionMatch[1] };
    const next = nextQuestion(nextPreferences);
    return {
      preferences: nextPreferences,
      pendingSlot: next.pendingSlot,
      reply: `지역은 ${regionMatch[1]}으로 볼게요. ${next.reply}`,
      understood: true,
    };
  }

  if (pendingSlot === "partySize") {
    return {
      preferences,
      pendingSlot,
      reply: "몇 명인지 숫자나 ‘4명’, ‘4인’, ‘네 명’, ‘넷’처럼 알려주세요.",
      understood: false,
    };
  }

  if (pendingSlot === "horrorLevel") {
    return {
      preferences,
      pendingSlot,
      reply: "공포도는 1부터 5 사이 숫자로 알려주세요.",
      understood: false,
    };
  }

  if (pendingSlot === "difficulty") {
    return {
      preferences,
      pendingSlot,
      reply: "난이도는 1부터 5 사이 숫자로 알려주세요.",
      understood: false,
    };
  }

  if (pendingSlot === "genre") {
    return {
      preferences,
      pendingSlot,
      reply: "좋아하는 장르를 말하거나, 상관없다면 ‘상관없어’라고 해주세요.",
      understood: false,
    };
  }

  return {
    preferences,
    pendingSlot: null,
    reply: "어떤 조건을 말씀하신 건지 조금 더 알려주세요. 인원, 공포도, 난이도, 장르 중 하나를 말해주시면 돼요.",
    understood: false,
  };
};
