import { Quote } from "./components/Quote";
import { ViewTracker } from "./components/ViewTracker";
import { Category } from "@/src/ui/Category";
import { SideBar } from "@/src/ui/sideBarList";
import { getRecentNewsData } from "@/src/utils/getRecentNewsData";
import { getRouteLanguage } from "@/src/utils/routeParams";
import { formatRelativeDate } from "@/src/utils/formatDate";
import { postAuthorText } from "@/src/locales/dictionary";
import { getPostById, getPosts } from "@/db/post";
import { getPostContentsByPostId } from "@/db/postContent";
import { getUserById } from "@/db/user";
import { notFound } from "next/navigation";
import { LuUser } from "react-icons/lu";

type PostProps = {
  params: Promise<{ lang: string; id: string }>;
};

export default async function Post({ params }: PostProps) {
  const { lang: routeLang, id } = await params;
  const lang = getRouteLanguage(routeLang);
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const content = await getPostContentsByPostId(id);
  const author = await getUserById(post.authorId);
  const posts = await getPosts();
  const recentNews = await getRecentNewsData(7, posts, lang);
  return (
    <article className="grid items-start gap-x-10 grid-cols-1 [grid-template-areas:'mainContent'_'sidebar'] lg:grid-cols-4 lg:[grid-template-areas:'mainContent_mainContent_mainContent_sidebar']">
      <ViewTracker id={post.id} />
      <section className="[grid-area:mainContent] flex flex-col  gap-5">
        <div className="flex flex-wrap gap-4 items-center">
          {post?.category && <Category category={post.category} />}
          <p className="text-gray-text">
            {formatRelativeDate(post.createdAt, lang)}
          </p>
          {author && (
            <p className="flex items-center gap-1.5 text-gray-text">
              <LuUser className="size-4" />
              {postAuthorText[lang]}: {author.name} {author.surname}
            </p>
          )}
        </div>
        <h1 className="text-deep-blue text-3xl  lg:text-5xl font-extrabold font-heading">
          {post?.title[lang]}
        </h1>
        <img
          src={`${post?.thumbnail}`}
          alt=""
          className="w-[80%] mx-auto rounded-2xl"
        />
        <div className="flex flex-col gap-5 text-deep-blue">
          {content.map((c) => {
            switch (c.type) {
              case "PARAGRAPH":
                return <p key={c.id}>{c.content[lang]}</p>;
              case "QUOTE":
                return <Quote key={c.id} text={c.content[lang]} />;
              case "IMAGE":
                return (
                  <img
                    key={c.id}
                    src={c.content[lang]}
                    alt=""
                    className="w-full rounded-2xl"
                  />
                );
            }
          })}
        </div>
        <hr className="text-gray-600 mb-10" />
      </section>
      <SideBar
        language={lang}
        recentNews={recentNews}
        className="[grid-area:sidebar] sticky top-25 mt-0 lg:mt-26"
      />
    </article>
  );
}
