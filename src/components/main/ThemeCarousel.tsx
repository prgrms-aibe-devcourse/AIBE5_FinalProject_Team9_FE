import ThemeCard from "@/components/card/ThemeCard";
import { Theme } from "@/types/theme";

interface ThemeCarouselProps {
  themes: Theme[];
}

export default function ThemeCarousel({ themes }: ThemeCarouselProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
      {themes.map((theme) => (
        <ThemeCard key={theme.id} theme={theme} />
      ))}
    </div>
  );
}
