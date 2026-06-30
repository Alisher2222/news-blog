import { prisma } from "@/lib/prisma";
import type { DBCategoryType, LocalizedText } from "@/src/types";
import { unstable_cache } from "next/cache";
import { mapPostToPostType } from "./postMapper";

export async function createPost(data: {
  title: LocalizedText;
  description: LocalizedText;
  thumbnail: string;
  category: DBCategoryType;
  authorId: string;
}) {
  return prisma.post.create({ data });
}

export async function updatePost(
  id: string,
  data: {
    title: LocalizedText;
    description: LocalizedText;
    thumbnail: string;
    category: DBCategoryType;
  },
) {
  return prisma.post.update({ where: { id }, data });
}

export async function deletePostById(id: string) {
  return prisma.post.delete({ where: { id } });
}

export const getPosts = unstable_cache(
  async (num?: number) => {
    if (num) {
      const posts = await prisma.post.findMany({
        take: num,
        orderBy: { createdAt: "desc" },
      });
      return posts.map(mapPostToPostType);
    }

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return posts.map(mapPostToPostType);
  },
  ["posts"],
  { revalidate: 60 },
);

export const getRecentPosts = unstable_cache(
  async (num: number) => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: num,
    });

    return posts.map(mapPostToPostType);
  },
  ["recent-posts"],
  {
    revalidate: 60,
  },
);

export const getPostById = unstable_cache(
  async (id: string) => {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    return post ? mapPostToPostType(post) : null;
  },
  ["postById"],
  { revalidate: 60 },
);

export const getPostsByCategory = unstable_cache(
  async (category: DBCategoryType) => {
    const posts = await prisma.post.findMany({
      where: {
        category,
      },
    });

    return posts.map(mapPostToPostType);
  },
  ["posts-by-category"],
  {
    revalidate: 60,
  },
);

export async function incrementViews(id: string) {
  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
}
