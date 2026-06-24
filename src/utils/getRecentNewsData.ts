import { Language, PostType } from "../types";
import { SideBarElementType } from "../types";

export function getRecentNewsData(
  postNumber: number,
  posts: PostType[],
  language: Language,
): SideBarElementType[] {
  return posts.slice(0, postNumber).map((post) => ({
    id: post.id,
    date: post.date,
    title: post.title[language],
    link: `${language}/posts/${post.id}`,
  }));
}
