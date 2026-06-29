import { notFound } from "next/navigation";
import { getRouteLanguage } from "@/src/utils/routeParams";
import { getPostById } from "@/db/post";
import { getPostContentsByPostId } from "@/db/postContent";
import { PostEditor } from "../../create/components/PostEditor";

type EditPageProps = {
  params: Promise<{ lang: string; id: string }>;
};

export default async function EditPage({ params }: EditPageProps) {
  const { lang: routeLang, id } = await params;
  const lang = getRouteLanguage(routeLang);

  const post = await getPostById(id);
  if (!post) {
    notFound();
  }

  const content = await getPostContentsByPostId(id);

  return (
    <PostEditor
      lang={lang}
      initial={{
        postId: post.id,
        title: post.title[lang],
        description: post.description[lang],
        thumbnail: post.thumbnail,
        category: post.category,
        blocks: content.map((block) => ({
          type: block.type,
          value: block.content[lang],
        })),
      }}
    />
  );
}
