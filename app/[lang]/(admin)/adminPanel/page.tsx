import { getPosts, getPostsByAuthorId } from "@/db/post";
import { getRouteLanguage } from "@/src/utils/routeParams";
import { AdminPostList } from "./components/AdminPostList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type AdminPanelProps = {
  params: Promise<{ lang: string }>;
};

export default async function AdminPanel({ params }: AdminPanelProps) {
  const { lang: routeLang } = await params;
  const lang = getRouteLanguage(routeLang);

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) throw Error("No user id!");

  const posts = await getPostsByAuthorId(userId);

  return (
    <div className="w-full px-4 py-6">
      <AdminPostList posts={posts} lang={lang} />
    </div>
  );
}
