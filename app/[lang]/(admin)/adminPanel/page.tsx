import { getPosts } from "@/db/post";
import { getRouteLanguage } from "@/src/utils/routeParams";
import { AdminPostList } from "./components/AdminPostList";

type AdminPanelProps = {
  params: Promise<{ lang: string }>;
};

export default async function AdminPanel({ params }: AdminPanelProps) {
  const { lang: routeLang } = await params;
  const lang = getRouteLanguage(routeLang);
  const posts = await getPosts();

  return (
    <div className="w-full px-4 py-6">
      <AdminPostList posts={posts} lang={lang} />
    </div>
  );
}
