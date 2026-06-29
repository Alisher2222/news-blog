"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { deletePostById, updatePost } from "@/db/post";
import { replacePostContents } from "@/db/postContent";
import type { CreatePostInput, Language, LocalizedText } from "@/src/types";

const toLocalized = (value: string): LocalizedText => ({
  ru: value,
  kk: value,
  en: value,
});

export type MutatePostResult = { error: string };

export async function updatePostAction(
  postId: string,
  input: CreatePostInput,
): Promise<MutatePostResult | void> {
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

  // Request 1 — update the post fields.
  await updatePost(postId, {
    title: toLocalized(title),
    description: toLocalized(description),
    thumbnail,
    category: input.category,
  });

  // Request 2 — replace the ordered content blocks.
  await replacePostContents(
    postId,
    blocks.map((block) => ({
      type: block.type,
      content: toLocalized(block.value),
    })),
  );

  revalidatePath(`/${input.lang}/adminPanel`);
  revalidatePath(`/${input.lang}`);
  revalidatePath(`/${input.lang}/posts/${postId}`);

  redirect(`/${input.lang}/adminPanel`);
}

export async function deletePostAction(
  postId: string,
  lang: Language,
): Promise<MutatePostResult | void> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: "UNAUTHORIZED" };
  }

  // Post content rows are removed automatically via the onDelete: Cascade relation.
  await deletePostById(postId);

  revalidatePath(`/${lang}/adminPanel`);
  revalidatePath(`/${lang}`);
}
