"use client";

import { useEffect, useMemo, useState } from "react";
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
import { getThemeById, getThemes } from "@/services/themeService";
import { getMatePosts } from "@/services/mateService";
import { getEffectiveMateStatus } from "@/lib/mateStatus";

const HOME_THEME_LIMIT = 4;
const HOME_MATE_LIMIT = 3;
const HOME_MATE_FETCH_SIZE = 12;

export default function HomePage() {
  const [popularThemes, setPopularThemes] = useState<Theme[]>([]);
  const [matePosts, setMatePosts] = useState<MatePost[]>([]);
  const [isThemesLoading, setIsThemesLoading] = useState(true);
  const [isMatePostsLoading, setIsMatePostsLoading] = useState(true);
  const [themesError, setThemesError] = useState("");
  const [matePostsError, setMatePostsError] = useState("");

  useEffect(() => {
    let isMounted = true;

    setIsThemesLoading(true);
    setThemesError("");

    getThemes({ sort: "popular", size: HOME_THEME_LIMIT })
      .then((themes) => {
        if (!isMounted) return;
        const nextThemes = [...themes]
          .sort((a, b) => {
            const reviewDiff = (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
            if (reviewDiff !== 0) return reviewDiff;
            return (b.rating ?? 0) - (a.rating ?? 0);
          })
          .slice(0, HOME_THEME_LIMIT);

        setPopularThemes(nextThemes);
      })
      .catch(() => {
        if (!isMounted) return;
        setPopularThemes([]);
        setThemesError("인기 테마를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (isMounted) setIsThemesLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    setIsMatePostsLoading(true);
    setMatePostsError("");

    const loadMatePosts = async () => {
      try {
        const response = await getMatePosts({
          status: "RECRUITING",
          sort: "latest",
          page: 0,
          size: HOME_MATE_FETCH_SIZE,
        });

        if (!isMounted) return;
        const recruitingPosts = response.items
          .filter(
            (post) => getEffectiveMateStatus(post) === "RECRUITING",
          )
          .slice(0, HOME_MATE_LIMIT);

        const themeList = await getThemes().catch(() => [] as Theme[]);
        const nextPosts = await Promise.all(
          recruitingPosts.map(async (post) => {
            if (!post.themeId) return post;

            const detail = await getThemeById(post.themeId).catch(() => null);
            const listTheme = themeList.find((theme) => theme.id === post.themeId);
            const themeImageUrl = detail?.imageUrl || listTheme?.imageUrl;

            return themeImageUrl ? { ...post, imageUrl: themeImageUrl } : post;
          }),
        );

        if (isMounted) setMatePosts(nextPosts);
      } catch {
        if (!isMounted) return;
        setMatePosts([]);
        setMatePostsError("메이트 모집 글을 불러오지 못했습니다.");
      } finally {
        if (isMounted) setIsMatePostsLoading(false);
      }
    };

    void loadMatePosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const popularThemeItems = useMemo(
    () => popularThemes.slice(0, HOME_THEME_LIMIT),
    [popularThemes],
  );
  const matePostItems = useMemo(
    () => matePosts.slice(0, HOME_MATE_LIMIT),
    [matePosts],
  );

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
              themes={popularThemeItems}
              href="/themes"
              isLoading={isThemesLoading}
              errorMessage={themesError}
            />
          </div>
        </section>

        <section
          id="mate-section"
          className="scroll-mt-20 border-t border-[#252525] bg-[#171717] pt-[96px] pb-[112px]"
        >
          <div className="gg-container">
            <MateSection
              posts={matePostItems}
              isLoading={isMatePostsLoading}
              errorMessage={matePostsError}
            />
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
