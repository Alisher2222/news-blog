"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { createPost } from "@/db/post";
import { createPostContents } from "@/db/postContent";
import type { CreatePostInput, LocalizedText } from "@/src/types";

// The editor captures one language at a time; mirror it into every locale so the
// stored JSON satisfies the localized-string shape the read mappers expect.
const toLocalized = (value: string): LocalizedText => ({
  ru: value,
  kk: value,
  en: value,
});

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

  // Request 1 — create the post and get its generated id.
  const post = await createPost({
    title: toLocalized(title),
    description: toLocalized(description),
    thumbnail,
    category: input.category,
    authorId: session.user.id,
  });

  // Request 2 — create the ordered content blocks for that post.
  await createPostContents(
    post.id,
    blocks.map((block) => ({
      type: block.type,
      content: toLocalized(block.value),
    })),
  );

  // Cached reads (getPosts / getRecentPosts) feed the admin list and the public
  // pages; refresh those routes so the new post shows immediately.
  revalidatePath(`/${input.lang}/adminPanel`);
  revalidatePath(`/${input.lang}`);

  redirect(`/${input.lang}/adminPanel`);
}
