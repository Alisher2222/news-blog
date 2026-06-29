import { getRouteLanguage } from "@/src/utils/routeParams";
import { PostEditor } from "./components/PostEditor";

type CreatePageProps = {
  params: Promise<{ lang: string }>;
};

export default async function CreatePage({ params }: CreatePageProps) {
  const { lang: routeLang } = await params;
  const lang = getRouteLanguage(routeLang);

  return <PostEditor lang={lang} />;
}
