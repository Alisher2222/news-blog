"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { createPost } from "@/db/post";
import { createPostContents } from "@/db/postContent";
import { toLocalized } from "@/lib/translate";
import type { CreatePostInput } from "@/src/types";

export type CreatePostResult = { error: string };

export async function createPostAction(
  input: CreatePostInput,
): Promise<CreatePostResult | void> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: "UNAUTHORIZED" };
  }

  const title = input.title.trim();
  const description = input.description.trim();
  const thumbnail = input.thumbnail.trim();

  if (!title) return { error: "TITLE_REQUIRED" };
  if (!thumbnail) return { error: "THUMBNAIL_REQUIRED" };

  const blocks = input.blocks
    .map((block) => ({ type: block.type, value: block.value.trim() }))
    .filter((block) => block.value.length > 0);

  if (blocks.length === 0) return { error: "CONTENT_REQUIRED" };

  // Translate all text fields in parallel before saving.
  const [titleLocalized, descriptionLocalized, ...blocksLocalized] =
    await Promise.all([
      toLocalized(title, input.lang),
      toLocalized(description, input.lang),
      ...blocks.map((block) => toLocalized(block.value, input.lang)),
    ]);

  // Request 1 — create the post and get its generated id.
  const post = await createPost({
    title: titleLocalized,
    description: descriptionLocalized,
    thumbnail,
    category: input.category,
    authorId: session.user.id,
  });

  // Request 2 — create the ordered content blocks for that post.
  await createPostContents(
    post.id,
    blocks.map((block, i) => ({
      type: block.type,
      content: blocksLocalized[i],
    })),
  );

  // Cached reads (getPosts / getRecentPosts) feed the admin list and the public
  // pages; refresh those routes so the new post shows immediately.
  revalidatePath(`/${input.lang}/adminPanel`);
  revalidatePath(`/${input.lang}`);

  redirect(`/${input.lang}/adminPanel`);
}
