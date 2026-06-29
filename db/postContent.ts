import { prisma } from "@/lib/prisma";
import type { LocalizedText, PostContentKind } from "@/src/types";
import { unstable_cache } from "next/cache";
import { mapPostContentToPostContentType } from "./postMapper";

export async function createPostContents(
  postId: string,
  blocks: { type: PostContentKind; content: LocalizedText }[],
) {
  return prisma.postContent.createMany({
    data: blocks.map((block, index) => ({
      postId,
      type: block.type,
      content: block.content,
      order: index,
    })),
  });
}

// Swap a post's content for a fresh ordered set: drop the old rows and insert
// the new ones in a single transaction.
export async function replacePostContents(
  postId: string,
  blocks: { type: PostContentKind; content: LocalizedText }[],
) {
  return prisma.$transaction([
    prisma.postContent.deleteMany({ where: { postId } }),
    prisma.postContent.createMany({
      data: blocks.map((block, index) => ({
        postId,
        type: block.type,
        content: block.content,
        order: index,
      })),
    }),
  ]);
}

export const getPostContentsByPostId = unstable_cache(
  async (postId: string) => {
    const content = await prisma.postContent.findMany({
      where: {
        postId,
      },
      orderBy: {
        order: "asc",
      },
    });

    return content.map(mapPostContentToPostContentType);
  },
  ["post-contents-by-post-id"],
  { revalidate: 60 },
);
