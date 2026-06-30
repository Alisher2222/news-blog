import { NewsCard } from "@/src/ui/NewsCard";
import { Hero } from "./components/hero";
import { SideBar } from "../../../src/ui/sideBarList";
import { getRecentNewsData } from "@/src/utils/getRecentNewsData";
import { getRouteLanguage } from "@/src/utils/routeParams";
import { formatRelativeDate } from "@/src/utils/formatDate";
import { getPosts } from "@/db/post";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: routeLang } = await params;
  const lang = getRouteLanguage(routeLang);

  const posts = await getPosts(8);
  const recentNews = await getRecentNewsData(posts, lang);

  return (
    <div className="grid grid-cols-1 [grid-template-areas:'hero'_'cards'_'sidebar'] lg:grid-cols-4 lg:[grid-template-areas:'hero_hero_hero_sidebar'_'cards_cards_cards_sidebar'] gap-y-[40px] gap-x-[20px]">
      <Hero
        thumbnail={posts[0]?.thumbnail}
        category={posts[0]?.category}
        title={posts[0]?.title[lang]}
        time={posts[0] ? formatRelativeDate(posts[0].createdAt, lang) : ""}
        description={posts[0]?.description[lang]}
        link={`${lang}/posts/${posts[0]?.id}`}
        language={lang}
      />
      <SideBar language={lang} recentNews={recentNews} />
      <div className="[grid-area:cards] gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {posts.slice(1, -1).map((post) => (
          <NewsCard
            key={`newsCard-${post.id}`}
            category={post.category}
            title={post.title[lang]}
            time={formatRelativeDate(post.createdAt, lang)}
            thumbnail={post.thumbnail}
            link={`${lang}/posts/${post.id}`}
          />
        ))}
      </div>
    </div>
  );
}
