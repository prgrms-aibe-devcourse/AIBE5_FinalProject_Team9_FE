import { redirect } from "next/navigation";

export default async function ThemeDetailPage({
  params,
}: {
  params: Promise<{ themeId: string }>;
}) {
  const { themeId } = await params;

  redirect(`/themes?themeId=${encodeURIComponent(themeId)}`);
}
