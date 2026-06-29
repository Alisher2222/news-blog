import { Language, PostType } from "../types";
import { SideBarElementType } from "../types";
import { formatRelativeDate } from "./formatDate";

export async function getRecentNewsData(
  postNumber: number,
  posts: PostType[],
  language: Language,
): Promise<SideBarElementType[]> {
  return posts.slice(0, postNumber).map((post) => ({
    id: post.id,
    date: formatRelativeDate(post.createdAt, language),
    title: post.title[language],
    link: `${language}/posts/${post.id}`,
  }));
}
