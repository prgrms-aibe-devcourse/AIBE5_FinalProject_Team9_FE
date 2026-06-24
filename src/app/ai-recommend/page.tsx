"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import {
  getAiRecommendErrorInfo,
  logAiRecommendError,
  requestAiRecommendation,
  type AiRecommendedTheme,
} from "@/services/aiRecommendService";
import { getThemes } from "@/services/themeService";
import type { Theme } from "@/types/theme";
import {
  hasRecommendationIntent,
  isRecommendationConsent,
  processPreferenceMessage,
  type PendingSlot,
  type RecommendationPreferences,
} from "@/lib/aiRecommendConversation";

const mascotSrc = "/images/령냥/령냥2_투명.png";
const avatarSrc = "/images/령냥/ghost-cat-avatar.png";
const placeholderImageSrc = "/images/theme-placeholder.png";

const promptSuggestions = [
  "무서운 거 잘 못해도 가능해?",
  "3명이서 갈 만한 테마",
  "스토리 좋은 미스터리",
  "진짜 무서운 테마",
  "초보자 가능 테마",
];

const initialMessages: ChatMessageItem[] = [
  {
    id: 1,
    speaker: "ai",
    text: "안녕하세요. 저는 GRIMGATE AI 챗봇 령냥이에요. 원하는 지역, 인원, 공포도, 분위기를 알려주시면 어울리는 방탈출 테마를 추천해드릴게요.",
  },
];

type ChatMessageItem = {
  id: number;
  speaker: "ai" | "user";
  text: string;
};

const greetingPattern = /^(안녕|안녕하세요|하이|헬로|반가워)[!?.\s]*$/;

const describePreferences = (preferences: RecommendationPreferences) => {
  const conditions = [
    preferences.people ? `인원 ${preferences.people}명` : null,
    preferences.horror === "low"
      ? "공포도 낮음"
      : preferences.horror === "high"
        ? "공포도 높음"
        : preferences.horrorLevel
          ? `공포도 ${preferences.horrorLevel}`
          : null,
    preferences.difficulty ? `난이도 ${preferences.difficulty}` : null,
    preferences.genre === "mystery"
      ? "미스터리·추리"
      : preferences.genre === "story"
        ? "스토리 중심"
        : preferences.genreAny
          ? "장르 무관"
          : null,
    preferences.region ? `지역 ${preferences.region}` : null,
  ].filter(Boolean);

  return conditions.length > 0 ? conditions.join(", ") : "별도 조건 없음";
};

const themeMatchesPeople = (theme: Theme, people?: number) => {
  if (!people) return true;
  if (!theme.minPlayers && !theme.maxPlayers) return true;
  return people >= (theme.minPlayers || 1) && people <= (theme.maxPlayers || 99);
};

const themeMatchesGenre = (theme: Theme, genre?: RecommendationPreferences["genre"]) => {
  if (!genre) return true;
  const searchableText = `${theme.genre} ${theme.title} ${theme.description}`.toLowerCase();
  return genre === "mystery"
    ? /미스터리|추리|범죄|탐정/.test(searchableText)
    : /스토리|드라마|감성|서사/.test(searchableText);
};

const toAiRecommendedTheme = (
  theme: Theme,
  preferences: RecommendationPreferences,
): AiRecommendedTheme => ({
  id: theme.id,
  title: theme.title,
  thumbnailUrl: theme.imageUrl,
  horrorLevel: theme.horrorLevel,
  difficulty: theme.difficulty,
  rating: theme.rating,
  description: theme.description,
  branchName: theme.branchName || theme.storeName,
  region: theme.locationName,
  playTime: theme.duration,
  price: theme.price,
  reason: `${describePreferences(preferences)} 조건으로 실제 등록 테마에서 찾은 후보예요.`,
});

const findCatalogRecommendations = async (preferences: RecommendationPreferences) => {
  const themes = await getThemes();
  const baseCandidates = themes.filter((theme) => {
    if (!themeMatchesPeople(theme, preferences.people)) return false;
    if (preferences.difficulty && theme.difficulty !== preferences.difficulty) return false;
    if (
      preferences.region &&
      !(theme.locationName ?? "").toLowerCase().includes(preferences.region.toLowerCase())
    ) {
      return false;
    }
    return themeMatchesGenre(theme, preferences.genre);
  });

  const exactCandidates = baseCandidates.filter((theme) => {
    if (preferences.horrorLevel && theme.horrorLevel !== preferences.horrorLevel) return false;
    if (preferences.horror === "low" && theme.horrorLevel > 2) return false;
    if (preferences.horror === "high" && theme.horrorLevel < 4) return false;
    return true;
  });
  const requestedLowHorror =
    preferences.horror === "low" ||
    (preferences.horrorLevel !== undefined && preferences.horrorLevel <= 2);
  const isHorrorRelaxed =
    requestedLowHorror && exactCandidates.length === 0 && baseCandidates.length > 0;
  const lowestHorrorLevel = isHorrorRelaxed
    ? Math.min(...baseCandidates.map((theme) => theme.horrorLevel))
    : undefined;
  const resolvedCandidates = isHorrorRelaxed
    ? baseCandidates.filter((theme) => theme.horrorLevel === lowestHorrorLevel)
    : exactCandidates;

  const recommendations = resolvedCandidates
    .sort((a, b) => b.rating - a.rating || a.horrorLevel - b.horrorLevel)
    .slice(0, 3)
    .map((theme) => {
      const recommendation = toAiRecommendedTheme(theme, preferences);

      if (isHorrorRelaxed) {
        recommendation.reason = `요청한 공포도보다 높지만, ${preferences.people ? `${preferences.people}인 플레이가 가능하고 ` : ""}현재 등록 테마 중 공포도가 가장 낮은 후보예요.`;
      }

      return recommendation;
    });

  return {
    recommendations,
    isHorrorRelaxed,
    lowestHorrorLevel,
  };
};

export default function AIRecommendPage() {
  return <ChatBotPage />;
}

function ChatBotPage() {
  const [messages, setMessages] = useState<ChatMessageItem[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [recommendations, setRecommendations] = useState<AiRecommendedTheme[]>([]);
  const [hasRecommendation, setHasRecommendation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [preferences, setPreferences] = useState<RecommendationPreferences>({});
  const [pendingSlot, setPendingSlot] = useState<PendingSlot>(null);

  const sendMessage = async (message: string) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    const nextId = Date.now();
    const userMessage: ChatMessageItem = {
      id: nextId,
      speaker: "user",
      text: trimmedMessage,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInputValue("");
    setErrorMessage("");

    const lastAiMessage = [...messages].reverse().find((item) => item.speaker === "ai")?.text ?? "";
    const conversationResult = processPreferenceMessage(
      trimmedMessage,
      preferences,
      pendingSlot,
    );
    const isRetryConfirmation =
      isRecommendationConsent(trimmedMessage) &&
      /다시 찾아볼까요|넓혀서/.test(lastAiMessage);
    const isReadyConsent =
      isRecommendationConsent(trimmedMessage) &&
      pendingSlot === null &&
      Object.keys(preferences).length > 0;
    const shouldRecommend =
      hasRecommendationIntent(trimmedMessage) || isRetryConfirmation || isReadyConsent;

    if (!shouldRecommend) {
      if (greetingPattern.test(trimmedMessage)) {
        setPendingSlot("partySize");
        setMessages([
          ...nextMessages,
          {
            id: nextId + 1,
            speaker: "ai",
            text: "안녕하세요! 몇 명이서 가시나요?",
          },
        ]);
        return;
      }

      setPreferences(conversationResult.preferences);
      setPendingSlot(conversationResult.pendingSlot);
      setHasRecommendation(false);
      setRecommendations([]);
      setMessages([
        ...nextMessages,
        {
          id: nextId + 1,
          speaker: "ai",
          text: conversationResult.reply,
        },
      ]);
      return;
    }

    const recommendationPreferences = conversationResult.understood
      ? conversationResult.preferences
      : preferences;
    setPreferences(recommendationPreferences);
    setPendingSlot(null);
    setHasRecommendation(false);
    setRecommendations([]);
    setIsLoading(true);

    try {
      const preferenceSummary = describePreferences(recommendationPreferences);
      let aiRecommendations: AiRecommendedTheme[] = [];
      let aiMessage = "";

      try {
        const response = await requestAiRecommendation({
          messages: [
            {
              role: "user",
              content: `다음 조건을 모두 반영해서 실제 등록된 방탈출 테마를 추천해주세요: ${preferenceSummary}`,
            },
          ],
        });
        aiRecommendations = response.themes;
        aiMessage = response.message;
      } catch (error) {
        logAiRecommendError("requestAiRecommendation", error);
      }

      const catalogResult = await findCatalogRecommendations(recommendationPreferences);
      const resolvedRecommendations =
        catalogResult.recommendations.length > 0
          ? catalogResult.recommendations
          : aiRecommendations;
      const responseText =
        resolvedRecommendations.length > 0
          ? catalogResult.isHorrorRelaxed
            ? `현재 등록된 테마에는 공포도 1~2가 없어요. 대신 ${recommendationPreferences.people ? `${recommendationPreferences.people}명이 플레이할 수 있는 ` : ""}테마 중 가장 낮은 공포도 ${catalogResult.lowestHorrorLevel} 후보를 보여드릴게요.`
            : catalogResult.recommendations.length > 0
              ? `${preferenceSummary} 조건으로 실제 등록 테마를 찾았어요.`
              : aiMessage || `${preferenceSummary} 조건으로 테마를 찾아봤어요.`
          : `${preferenceSummary} 조건을 만족하는 등록 테마를 찾지 못했어요. 인원이나 공포도 조건을 조금 넓혀서 다시 찾아볼까요?`;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: nextId + 1,
          speaker: "ai",
          text: responseText,
        },
      ]);
      const isRecommendationResponse = resolvedRecommendations.length > 0;

      setHasRecommendation(isRecommendationResponse);
      setRecommendations(isRecommendationResponse ? resolvedRecommendations : []);
    } catch (error) {
      logAiRecommendError("requestAiRecommendation", error);
      const fallbackMessage = getAiRecommendErrorInfo(error).message;

      setErrorMessage(fallbackMessage);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: nextId + 1,
          speaker: "ai",
          text: fallbackMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(inputValue);
  };

  const hasUserContext = messages.some((message) => message.speaker === "user");

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d0d0d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(204,34,34,0.16),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(180,240,255,0.055),transparent_24%),linear-gradient(180deg,#0d0d0d_0%,#111_48%,#0b0b0b_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#cc2222]/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="grid items-stretch gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-12">
          <div className="relative flex flex-col justify-center">
            <div className="pointer-events-none absolute -left-20 top-12 h-80 w-80 rounded-full bg-[#cc2222]/10 blur-[96px]" />
            <div className="relative z-10 max-w-[500px]">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#cc2222]">
                <span className="h-px w-8 bg-[#cc2222]/80" />
                GRIMGATE AI ASSISTANT
              </p>

              <h1 className="break-keep text-[36px] font-black leading-[1.14] text-[#f5f5f5] sm:text-[46px] lg:text-[51px]">
                령냥이에게
                <br />
                <span className="text-[#cc2222] drop-shadow-[0_0_20px_rgba(204,34,34,0.22)]">
                  공포의 조건
                </span>
                을
                <br />
                말해주세요.
              </h1>

              <p className="mt-5 max-w-[440px] break-keep text-[15px] leading-8 text-[#a8a8a8]">
                지역, 인원, 분위기만 알려주면 령냥이가 오늘 들어갈 만한
                문을 조용히 찾아드릴게요.
              </p>
            </div>

            <div className="relative mt-3 max-w-[470px] lg:mx-auto">
              <div className="pointer-events-none absolute left-1/2 top-[43%] h-[330px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,240,255,0.13)_0%,rgba(204,34,34,0.075)_40%,transparent_72%)] blur-2xl" />
              <div className="pointer-events-none absolute inset-x-6 bottom-8 h-px bg-gradient-to-r from-transparent via-[#cc2222]/45 to-transparent" />

              <div className="relative mx-auto h-[318px] w-[318px] sm:h-[352px] sm:w-[352px] lg:h-[370px] lg:w-[370px] lg:-translate-y-5">
                <Image
                  src={mascotSrc}
                  alt="GrimGate AI 캐릭터 령냥이"
                  fill
                  sizes="(min-width: 1024px) 370px, 352px"
                  className="select-none object-contain brightness-110 contrast-105 drop-shadow-[0_0_42px_rgba(180,240,255,0.42)]"
                  priority
                />
              </div>

              <div className="relative -mt-10 grid max-w-[430px] grid-cols-3 gap-2 rounded-[16px] border border-white/[0.08] bg-[#111]/74 p-2.5 shadow-[0_18px_46px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-sm">
                {["위치", "인원", "취향"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[11px] border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-center"
                  >
                    <p className="text-[10px] font-black tracking-[0.18em] text-[#cc2222]">
                      INPUT
                    </p>
                    <p className="mt-1 text-[13px] font-black text-[#ededed]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ChatWindow
            messages={messages}
            inputValue={inputValue}
            hasRecommendation={hasRecommendation}
            recommendations={recommendations}
            isLoading={isLoading}
            errorMessage={errorMessage}
            suggestions={promptSuggestions}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
            onSuggestionSelect={sendMessage}
            hasUserContext={hasUserContext}
          />
        </section>
      </div>
    </main>
  );
}

function PromptSuggestionButtons({
  suggestions,
  disabled,
  onSelect,
}: {
  suggestions: string[];
  disabled: boolean;
  onSelect: (message: string) => void;
}) {
  return (
    <section className="rounded-[14px] border border-white/[0.08] bg-[#151515]/72 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <p className="mb-2 text-[11px] font-black text-[#cc2222]">
        무엇을 물어볼까요?
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(suggestion)}
            className="min-h-8 rounded-full border border-white/[0.1] bg-[#1a1a1a]/78 px-3 text-left text-[11px] font-semibold text-[#d8d8d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-[#cc2222]/70 hover:bg-[#cc2222]/13 hover:text-white hover:shadow-[0_0_18px_rgba(204,34,34,0.14),inset_0_1px_0_rgba(255,255,255,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}

function ChatWindow({
  messages,
  inputValue,
  hasRecommendation,
  recommendations,
  isLoading,
  errorMessage,
  suggestions,
  onInputChange,
  onSubmit,
  onSuggestionSelect,
  hasUserContext,
}: {
  messages: ChatMessageItem[];
  inputValue: string;
  hasRecommendation: boolean;
  recommendations: AiRecommendedTheme[];
  isLoading: boolean;
  errorMessage: string;
  suggestions: string[];
  onInputChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSuggestionSelect: (message: string) => void;
  hasUserContext: boolean;
}) {
  return (
    <section className="relative flex min-h-[680px] lg:min-h-[760px]">
      <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[#cc2222]/10 blur-[48px]" />
      <div className="relative flex w-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#151515]/96 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_38px_rgba(204,34,34,0.1)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#111]/94 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-visible rounded-full border border-white/[0.1]">
              <Image
                src={avatarSrc}
                alt="령냥이 아이콘"
                fill
                sizes="44px"
                className="select-none object-contain drop-shadow-[0_0_14px_rgba(180,240,255,0.36)]"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-[#f4f4f4]">령냥이</p>
              <p className="mt-0.5 truncate text-[12px] text-[#8d8d8d]">
                GrimGate AI 령냥이가 당신만의 공포를 찾아드려요.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-bold text-[#d7d7d7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#cc2222] shadow-[0_0_10px_rgba(204,34,34,0.8)]" />
            온라인
          </span>
        </div>

        <div className="flex-1 space-y-3.5 overflow-y-auto bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.035),transparent_26%),linear-gradient(180deg,#141414,#111)] px-5 py-5 sm:px-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} speaker={message.speaker}>
              {message.text}
            </ChatMessage>
          ))}

          {!hasUserContext && (
            <div className="space-y-3">
              <PromptSuggestionButtons
                suggestions={suggestions}
                disabled={isLoading}
                onSelect={onSuggestionSelect}
              />
              <div className="flex min-h-[190px] items-center justify-center px-4">
                <p className="max-w-[360px] text-center text-[12px] leading-6 text-[#777] opacity-70">
                  아직 문이 열리지 않았어요. 원하는 공포의 조건을 알려주면
                  령냥이가 어울리는 테마를 찾아드려요.
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <StatusPanel>령냥이가 어울리는 테마를 찾고 있어요...</StatusPanel>
          )}

          {!isLoading && !errorMessage && hasRecommendation && recommendations.length === 0 && (
            <StatusPanel>아직 표시할 추천 테마가 없어요.</StatusPanel>
          )}

          {errorMessage && <StatusPanel tone="error">{errorMessage}</StatusPanel>}

          {recommendations.map((theme) => (
            <RecommendedThemeCard key={theme.id} theme={theme} />
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="border-t border-white/[0.08] bg-[#111] p-3.5"
        >
          <div className="flex items-center gap-3 rounded-[14px] border border-white/[0.1] bg-[#181818] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors focus-within:border-[#cc2222]/55">
            <input
              value={inputValue}
              disabled={isLoading}
              onChange={(event) => onInputChange(event.target.value)}
              placeholder="메시지를 입력하세요..."
              className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-[#f0f0f0] outline-none placeholder:text-[#777] disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading}
              aria-label="메시지 보내기"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#cc2222] text-[18px] font-black text-white transition-all hover:bg-[#e12a2a] hover:shadow-[0_0_18px_rgba(204,34,34,0.32)] disabled:cursor-not-allowed disabled:bg-[#662222] disabled:shadow-none"
            >
              {"\u2192"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ChatMessage({
  speaker,
  children,
}: {
  speaker: "user" | "ai";
  children: ReactNode;
}) {
  const isUser = speaker === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start gap-3"}`}>
      {!isUser && (
        <div className="relative mt-1 h-9 w-9 shrink-0 overflow-visible rounded-full">
          <Image
            src={avatarSrc}
            alt=""
            fill
            sizes="36px"
            className="select-none object-contain drop-shadow-[0_0_10px_rgba(180,240,255,0.35)]"
          />
        </div>
      )}
      <p
        className={[
          "max-w-[84%] rounded-[15px] px-4 py-3 text-[13px] leading-[1.7] shadow-[0_10px_26px_rgba(0,0,0,0.2)]",
          isUser
            ? "rounded-br-[6px] bg-[#cc2222] text-white shadow-[0_12px_30px_rgba(204,34,34,0.16)]"
            : "rounded-bl-[6px] border border-white/[0.08] bg-[#1b1b1b] text-[#d8d8d8]",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

function StatusPanel({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "error";
}) {
  return (
    <div
      className={[
        "mt-5 rounded-[16px] border p-4 text-[13px] font-semibold leading-6",
        tone === "error"
          ? "border-[#cc2222]/32 bg-[#cc2222]/10 text-[#ffb0b0]"
          : "border-white/[0.08] bg-white/[0.035] text-[#a8a8a8]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function RecommendedThemeCard({ theme }: { theme: AiRecommendedTheme }) {
  const tags = [
    theme.difficulty ? `난이도 ${theme.difficulty}` : null,
    theme.horrorLevel ? `공포도 ${theme.horrorLevel}` : null,
    theme.rating ? `평점 ${theme.rating.toFixed(1)}` : null,
    theme.region ?? theme.branchName ?? null,
    theme.playTime ? `${theme.playTime}분` : null,
    theme.price ? `${theme.price.toLocaleString()}원` : null,
  ].filter(Boolean);
  const detailHref = theme.id ? `/themes?themeId=${theme.id}` : "/themes";

  return (
    <article className="mt-5 rounded-[16px] border border-[#cc2222]/28 bg-[linear-gradient(135deg,rgba(204,34,34,0.1),rgba(27,27,27,0.97)_34%,rgba(18,18,18,0.98))] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.3),0_0_24px_rgba(204,34,34,0.1)]">
      <p className="mb-3 text-[12px] font-black text-[#cc2222]">
        추천 테마
      </p>

      <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
        <div className="relative h-[134px] overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#1b1b1b] sm:h-full sm:min-h-[150px]">
          <Image
            src={theme.thumbnailUrl || placeholderImageSrc}
            alt={`${theme.title} 테마 이미지`}
            fill
            sizes="160px"
            className="object-cover brightness-110 contrast-110 saturate-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-black/8 to-transparent" />
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[21px] font-black leading-tight text-[#f4f4f4]">
              {theme.title}
            </h2>
            <span className="shrink-0 rounded-full border border-[#cc2222]/45 bg-[#cc2222]/18 px-2.5 py-1 text-[10px] font-black text-[#ffb0b0]">
              추천
            </span>
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.055] px-2.5 py-1 text-[11px] font-semibold text-[#bdbdbd]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="mt-4 text-[13px] leading-6 text-[#a0a0a0]">
            {theme.reason || theme.description || "추천 설명이 아직 준비되지 않았어요."}
          </p>

          <Link
            href={detailHref}
            className="mt-4 inline-flex text-[13px] font-black text-[#ff4a4a] transition-colors hover:text-[#ff6a6a]"
          >
            자세히 보기 {"\u2192"}
          </Link>
        </div>
      </div>
    </article>
  );
}
