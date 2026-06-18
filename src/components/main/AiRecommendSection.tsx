"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  getAiRecommendErrorInfo,
  getRandomAiRecommendations,
  logAiRecommendError,
  type AiRecommendedTheme,
} from "@/services/aiRecommendService";

const mascotSrc = "/images/령냥/령냥2_투명.png";
const aiAvatarSrc = "/images/령냥/ghost-cat-avatar.png";
const placeholderImageSrc = "/images/theme-placeholder.png";

const quickPrompts = [
  "너무 무서운 건 싫어요",
  "3명이서 할 테마 추천해줘",
  "미스터리한 분위기 원해요",
  "폐병원 느낌 좋아해요",
];

export default function AiRecommendSection() {
  const [recommendedTheme, setRecommendedTheme] = useState<AiRecommendedTheme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRandomRecommendation = async () => {
      try {
        const themes = await getRandomAiRecommendations();
        if (!isMounted) return;

        setRecommendedTheme(themes[0] ?? null);
      } catch (error) {
        if (!isMounted) return;
        logAiRecommendError("getRandomAiRecommendations", error);
        setErrorMessage(getAiRecommendErrorInfo(error).message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadRandomRecommendation();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#0d0d0d] py-20 lg:py-24">
      <div className="gg-container">
        <div className="relative overflow-hidden rounded-[24px] border border-[#cc2222]/20 bg-[#111111] shadow-[0_26px_92px_rgba(0,0,0,0.55),0_0_68px_rgba(204,34,34,0.1)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(204,34,34,0.18),transparent_32%),radial-gradient(circle_at_42%_35%,rgba(180,240,255,0.075),transparent_22%),radial-gradient(circle_at_82%_72%,rgba(204,34,34,0.11),transparent_34%),linear-gradient(135deg,#171717_0%,#101010_50%,#151515_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12),transparent_40%,rgba(0,0,0,0.26)),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#cc2222]/65 to-transparent" />
          <div className="pointer-events-none absolute bottom-[-130px] left-[20%] h-[250px] w-[390px] rounded-full bg-[#cc2222]/10 blur-[86px]" />

          <div className="relative grid gap-10 px-6 py-9 sm:px-8 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:py-11 xl:px-14 xl:py-12">
            <div className="relative z-20 flex flex-col justify-center lg:min-h-[540px] lg:max-w-[520px] lg:pr-10">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#cc2222]">
                <span className="h-px w-8 bg-[#cc2222]/80" />
                GRIMGATE AI ASSISTANT
                <span className="h-px w-8 bg-[#cc2222]/80" />
              </p>

              <h2 className="text-[34px] font-black leading-[1.16] text-[#f5f5f5] sm:text-[44px] lg:text-[50px]">
                령냥이에게{" "}
                <span className="text-[#cc2222] drop-shadow-[0_0_18px_rgba(204,34,34,0.2)]">
                  취향
                </span>
                을
                <br />
                말해보세요
              </h2>

              <p className="mt-5 max-w-[460px] text-[14px] leading-7 text-[#a3a3a3]">
                공포도, 인원수, 선호 분위기 등을 말하면
                <br />
                어울리는 테마를 추천해드려요.
              </p>

              <div className="my-7 h-px w-full max-w-[340px] bg-gradient-to-r from-[#cc2222]/35 via-white/[0.08] to-transparent" />

              <div>
                <p className="mb-3 pl-2 text-[13px] font-black text-[#cc2222]">
                  빠른 질문하기
                </p>
                <div className="grid max-w-[500px] gap-2.5 sm:grid-cols-2">
                  {quickPrompts.map((prompt) => (
                    <Link
                      key={prompt}
                      href="/ai-recommend"
                      className="flex min-h-11 items-center rounded-full border border-white/[0.1] bg-[#1a1a1a]/78 px-4 text-left text-[12px] font-semibold text-[#d8d8d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-[#cc2222]/70 hover:bg-[#cc2222]/13 hover:text-white hover:shadow-[0_0_22px_rgba(204,34,34,0.16),inset_0_1px_0_rgba(255,255,255,0.06)]"
                    >
                      {prompt}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/ai-recommend"
                  className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#cc2222] px-7 text-[14px] font-black text-white transition-all hover:bg-[#e12a2a] hover:shadow-[0_0_28px_rgba(204,34,34,0.36)]"
                >
                  AI 추천 받기
                  <span className="ml-3">→</span>
                </Link>
                <Link
                  href="/themes"
                  className="inline-flex h-12 items-center justify-center rounded-[8px] px-6 text-[14px] font-bold text-[#d8d8d8] transition-colors hover:text-white"
                >
                  직접 테마 찾기
                  <span className="ml-3 text-[#9a9a9a]">›</span>
                </Link>
              </div>

              <p className="mt-6 max-w-[480px] text-[12px] leading-6 text-[#6f6f6f]">
                GrimGate AI는 당신의 취향을 기억하지 않으며, 대화 내용은
                저장되지 않습니다.
              </p>
            </div>

            <div className="pointer-events-none absolute left-[40.5%] top-[38.5%] z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <Image
                src={mascotSrc}
                alt="GrimGate 유령 고양이"
                width={240}
                height={240}
                className="h-auto w-[210px] select-none object-contain brightness-110 contrast-105 opacity-95 drop-shadow-[0_0_36px_rgba(180,240,255,0.42)] xl:w-[224px]"
                priority={false}
              />
            </div>

            <div className="relative z-20 flex items-center lg:pl-4">
              <div className="mx-auto w-full max-w-[620px] overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#171717]/96 shadow-[0_20px_64px_rgba(0,0,0,0.46),0_0_30px_rgba(204,34,34,0.08)] backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#111]/92 px-5 py-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-visible rounded-full border border-white/[0.1]">
                      <Image
                        src={aiAvatarSrc}
                        alt=""
                        fill
                        sizes="40px"
                        className="select-none object-contain drop-shadow-[0_0_14px_rgba(180,240,255,0.34)]"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-black text-[#f4f4f4]">
                        령냥이
                      </p>
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

                <div className="space-y-3.5 bg-[radial-gradient(circle_at_15%_28%,rgba(255,255,255,0.035),transparent_26%),linear-gradient(180deg,#141414,#111)] px-5 py-4">
                  <ChatBubble speaker="ai">
                    안녕하세요, 저는 GRIMGATE AI 챗봇 령냥이에요. 오늘의 랜덤
                    추천 테마를 가져와볼게요.
                  </ChatBubble>
                  <ChatBubble speaker="user">
                    지금 바로 해볼 만한 테마가 궁금해!
                  </ChatBubble>
                  <ChatBubble speaker="ai">
                    좋아요. GrimGate에 등록된 테마 중 하나를 골라볼게요.
                  </ChatBubble>

                  <RandomRecommendationCard
                    theme={recommendedTheme}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                  />
                </div>

                <div className="border-t border-white/[0.08] bg-[#111] p-3.5">
                  <div className="flex items-center gap-3 rounded-[12px] border border-white/[0.1] bg-[#181818] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
                    <span className="flex-1 text-[13px] text-[#777]">
                      메시지를 입력하세요...
                    </span>
                    <Link
                      href="/ai-recommend"
                      aria-label="AI 추천 페이지로 이동"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cc2222] text-[16px] font-black text-white transition-all hover:bg-[#e12a2a] hover:shadow-[0_0_18px_rgba(204,34,34,0.32)]"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none mx-auto mt-6 flex justify-center lg:hidden">
                <Image
                  src={mascotSrc}
                  alt="GrimGate 유령 고양이"
                  width={180}
                  height={180}
                  className="h-auto w-[148px] select-none object-contain opacity-[0.92] drop-shadow-[0_0_24px_rgba(180,240,255,0.36)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({
  speaker,
  children,
}: {
  speaker: "user" | "ai";
  children: ReactNode;
}) {
  const isUser = speaker === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start gap-2.5"}`}>
      {!isUser && (
        <div className="relative mt-1 h-9 w-9 shrink-0 overflow-visible rounded-full">
          <Image
            src={aiAvatarSrc}
            alt=""
            fill
            sizes="36px"
            className="select-none object-contain drop-shadow-[0_0_10px_rgba(180,240,255,0.35)]"
          />
        </div>
      )}
      <p
        className={[
          "max-w-[82%] rounded-[14px] px-4 py-2.5 text-[12px] leading-[1.65] shadow-[0_10px_26px_rgba(0,0,0,0.2)]",
          isUser
            ? "rounded-br-[6px] bg-[#cc2222] text-white"
            : "rounded-bl-[6px] border border-white/[0.08] bg-[#1b1b1b] text-[#d8d8d8]",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

function RandomRecommendationCard({
  theme,
  isLoading,
  errorMessage,
}: {
  theme: AiRecommendedTheme | null;
  isLoading: boolean;
  errorMessage: string;
}) {
  const tags = theme
    ? [
        theme.difficulty ? `난이도 ${theme.difficulty}` : null,
        theme.horrorLevel ? `공포도 ${theme.horrorLevel}` : null,
        theme.rating ? `평점 ${theme.rating.toFixed(1)}` : null,
        theme.region ?? theme.branchName ?? null,
      ].filter(Boolean)
    : [];
  const detailHref = theme?.id ? `/themes?themeId=${theme.id}` : "/themes";

  return (
    <div className="mt-4 rounded-[14px] border border-[#cc2222]/28 bg-[linear-gradient(135deg,rgba(204,34,34,0.1),rgba(27,27,27,0.97)_34%,rgba(18,18,18,0.98))] p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.3),0_0_24px_rgba(204,34,34,0.1)]">
      <p className="mb-3 text-[12px] font-black text-[#cc2222]">
        추천 테마
      </p>

      {isLoading && (
        <div className="min-h-[132px] rounded-[12px] border border-white/[0.08] bg-white/[0.035] p-4 text-[12px] font-semibold leading-6 text-[#a8a8a8]">
          랜덤 추천 테마를 불러오는 중이에요...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="min-h-[132px] rounded-[12px] border border-[#cc2222]/28 bg-[#cc2222]/10 p-4 text-[12px] font-semibold leading-6 text-[#ffb0b0]">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && !theme && (
        <div className="min-h-[132px] rounded-[12px] border border-white/[0.08] bg-white/[0.035] p-4 text-[12px] font-semibold leading-6 text-[#a8a8a8]">
          아직 추천할 테마가 없어요.
        </div>
      )}

      {!isLoading && !errorMessage && theme && (
        <div className="grid gap-3.5 sm:grid-cols-[150px_1fr]">
          <div className="relative h-[116px] overflow-hidden rounded-[11px] border border-white/[0.08] bg-[#1b1b1b] sm:h-full sm:min-h-[132px]">
            <Image
              src={theme.thumbnailUrl || placeholderImageSrc}
              alt={`${theme.title} 테마 이미지`}
              fill
              sizes="150px"
              className="object-cover brightness-110 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/6 to-transparent" />
          </div>

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[18px] font-black leading-tight text-[#f4f4f4]">
                {theme.title}
              </h3>
              <span className="shrink-0 rounded-full border border-[#cc2222]/45 bg-[#cc2222]/18 px-2.5 py-1 text-[10px] font-black text-[#ffb0b0]">
                추천
              </span>
            </div>

            {tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.055] px-2 py-1 text-[10px] font-semibold text-[#bdbdbd]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-[#a0a0a0]">
              {theme.reason || theme.description || "추천 설명이 아직 준비되지 않았어요."}
            </p>

            <Link
              href={detailHref}
              className="mt-3 inline-flex text-[12px] font-black text-[#ff4a4a] transition-colors hover:text-[#ff6a6a]"
            >
              자세히 보기 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
