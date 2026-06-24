import { MOCK_POSTS } from "@/src/mocks/posts";
import { Language } from "@/src/types";
import { NewsCard } from "@/src/ui/NewsCard";
import { Hero } from "./components/hero";
import { SideBar } from "./components/sideBarList";
import { getRecentNewsData } from "@/src/utils/getRecentNewsData";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const recentNews = getRecentNewsData(7, MOCK_POSTS, lang);
  return (
    <div className="grid grid-cols-1 [grid-template-areas:'hero'_'cards'_'sidebar'] lg:grid-cols-4 lg:[grid-template-areas:'hero_hero_hero_sidebar'_'cards_cards_cards_sidebar'] gap-y-[40px] gap-x-[20px]">
      <Hero
        thumbnail={MOCK_POSTS[0].thumbnail}
        category={MOCK_POSTS[0].category}
        title={MOCK_POSTS[0].title[lang]}
        time={MOCK_POSTS[0].date}
        description={MOCK_POSTS[0].description[lang]}
        link={`${lang}/posts/${MOCK_POSTS[0].id}`}
        language={lang}
      />
      <SideBar language={lang} recentNews={recentNews} />
      <div className="[grid-area:cards] gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_POSTS.slice(1, -1).map((post) => (
          <NewsCard
            key={`newsCard-${post.id}`}
            category={post.category}
            title={post.title[lang]}
            time={post.date}
            thumbnail={post.thumbnail}
            link={`${lang}/posts/${post.id}`}
          />
        ))}
      </div>
    </div>
  );
}
