"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiPlus } from "react-icons/bi";
import { CiEdit, CiSearch, CiTrash } from "react-icons/ci";
import { LuLoaderCircle } from "react-icons/lu";
import { Category } from "@/src/ui/Category";
import { formatRelativeDate } from "@/src/utils/formatDate";
import { adminPanelText, categoryText } from "@/src/locales/dictionary";
import { deletePostAction } from "../actions";
import type { Language, PostType } from "@/src/types";

type AdminPostListProps = {
  posts: PostType[];
  lang: Language;
};

export function AdminPostList({ posts, lang }: AdminPostListProps) {
  const t = adminPanelText[lang];
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts;

    return posts.filter((post) => {
      const title = post.title[lang]?.toLowerCase() ?? "";
      const category = categoryText[post.category][lang].toLowerCase();
      return (
        title.includes(normalized) ||
        post.id.toLowerCase().includes(normalized) ||
        category.includes(normalized)
      );
    });
  }, [posts, lang, query]);

  function handleDelete(id: string) {
    if (!window.confirm(t.confirmDelete)) return;
    setDeletingId(id);
    startTransition(async () => {
      await deletePostAction(id, lang);
      router.refresh();
      setDeletingId(null);
    });
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/${lang}/adminPanel/create`}
          className="flex w-fit items-center gap-2 rounded-xl bg-light-blue px-5 py-3 font-extrabold text-white transition-colors hover:bg-deep-blue"
        >
          <BiPlus size={20} /> {t.createPost}
        </Link>
        <div className="relative w-full sm:max-w-sm">
          <CiSearch className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-text" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-xl border border-gray-border bg-white py-3 pl-10 pr-4 text-deep-blue outline-none placeholder:text-gray-text focus:border-light-blue"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-white p-10 text-center text-gray-text shadow-sm">
          {t.empty}
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-border bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-wide text-gray-text">
                  <th className="w-[10%] px-6 py-4">{t.thumb}</th>
                  <th className="w-[40%] px-6 py-4">{t.title}</th>
                  <th className="w-[15%] px-6 py-4">{t.category}</th>
                  <th className="w-[20%] px-6 py-4">{t.datePublished}</th>
                  <th className="w-[15%] px-6 py-4 text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr
                    key={`row-${post.id}`}
                    className="border-b border-gray-border last:border-0 transition-colors hover:bg-[#F9FAFC]"
                  >
                    <td className="px-6 py-4">
                      <div
                        className="size-16 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.thumbnail})` }}
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-deep-blue">
                      {post.title[lang]}
                    </td>
                    <td className="px-6 py-4">
                      <Category category={post.category} />
                    </td>
                    <td className="px-6 py-4 text-gray-text">
                      {formatRelativeDate(post.createdAt, lang)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/${lang}/adminPanel/edit/${post.id}`}
                          aria-label={t.edit}
                          className="rounded-lg border border-gray-border p-2 text-gray-500 transition-colors hover:bg-deep-blue hover:text-white"
                        >
                          <CiEdit className="size-5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          disabled={isPending && deletingId === post.id}
                          aria-label={t.delete}
                          className="cursor-pointer rounded-lg border border-gray-border p-2 text-gray-500 transition-colors hover:bg-red hover:text-white disabled:opacity-50"
                        >
                          {isPending && deletingId === post.id ? (
                            <LuLoaderCircle className="size-5 animate-spin" />
                          ) : (
                            <CiTrash className="size-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-4 lg:hidden">
            {filtered.map((post) => (
              <article
                key={`card-${post.id}`}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div
                    className="size-16 shrink-0 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.thumbnail})` }}
                  />
                  <div className="flex flex-col gap-2">
                    <Category category={post.category} />
                    <h3 className="font-bold text-deep-blue">
                      {post.title[lang]}
                    </h3>
                    <p className="text-sm text-gray-text">
                      {formatRelativeDate(post.createdAt, lang)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 border-t border-gray-border pt-4">
                  <Link
                    href={`/${lang}/adminPanel/edit/${post.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-border py-2 text-gray-600 transition-colors hover:bg-deep-blue hover:text-white"
                  >
                    <CiEdit className="size-5" /> {t.edit}
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    disabled={isPending && deletingId === post.id}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-border py-2 text-gray-600 transition-colors hover:bg-red hover:text-white disabled:opacity-50"
                  >
                    {isPending && deletingId === post.id ? (
                      <LuLoaderCircle className="size-5 animate-spin" />
                    ) : (
                      <CiTrash className="size-5" />
                    )}
                    {t.delete}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
