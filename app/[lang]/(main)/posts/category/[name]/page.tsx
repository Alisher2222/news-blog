import { categoryText } from "@/src/locales/dictionary";
import { categoryPageText } from "@/src/locales/dictionary";
import { getRouteCategory, getRouteLanguage } from "@/src/utils/routeParams";
import { getPosts, getPostsByCategory } from "@/db/post";
import { CategorySearch } from "./components/CategorySearch";

type CategoryPageProps = {
  params: Promise<{ lang: string; name: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang: routeLang, name: routeName } = await params;
  const lang = getRouteLanguage(routeLang);
  const name = getRouteCategory(routeName);

  let posts;

  if (name === "ALL") {
    posts = await getPosts();
  } else {
    posts = await getPostsByCategory(name);
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-deep-blue text-2xl">{categoryText[name][lang]}</h2>
      <p className="text-gray-text">
        {categoryPageText[lang].replace("CATEGORY", categoryText[name][lang])}
      </p>
      <hr className="text-gray-300 " />
      <CategorySearch posts={posts} lang={lang} />
    </div>
  );
}
