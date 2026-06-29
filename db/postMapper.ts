import type {
  Post as PrismaPost,
  PostContent as PrismaPostContent,
} from "@/src/generated/prisma/client";
import type {
  Language,
  LocalizedData,
  PostContentType,
  PostType,
} from "@/src/types";

const languages = ["ru", "kk", "en"] satisfies Language[];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocalizedString(value: unknown): value is LocalizedData<string> {
  return (
    isObject(value) &&
    languages.every((lang) => typeof value[lang] === "string")
  );
}

function mapLocalizedString(
  value: unknown,
  fieldName: string,
): LocalizedData<string> {
  if (isLocalizedString(value)) {
    return value;
  }

  throw new Error(`Invalid localized JSON field: ${fieldName}`);
}

export function mapPostToPostType(post: PrismaPost): PostType {
  return {
    id: post.id,
    title: mapLocalizedString(post.title, "Post.title"),
    description: mapLocalizedString(post.description, "Post.description"),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    thumbnail: post.thumbnail,
    category: post.category,
    viewCount: post.viewCount,
    authorId: post.authorId,
  };
}

export function mapPostContentToPostContentType(
  content: PrismaPostContent,
): PostContentType {
  return {
    id: content.id,
    postId: content.postId,
    type: content.type,
    content: mapLocalizedString(content.content, "PostContent.content"),
    order: content.order,
  };
}
