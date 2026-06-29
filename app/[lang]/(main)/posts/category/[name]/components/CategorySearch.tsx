"use client";

import { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { NewsCard } from "@/src/ui/NewsCard";
import { categorySearchText } from "@/src/locales/dictionary";
import { formatRelativeDate } from "@/src/utils/formatDate";
import type { Language, PostType } from "@/src/types";

type CategorySearchProps = {
  posts: PostType[];
  lang: Language;
};

export function CategorySearch({ posts, lang }: CategorySearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts;

    return posts.filter((post) => {
      const title = post.title[lang]?.toLowerCase() ?? "";
      const description = post.description[lang]?.toLowerCase() ?? "";
      return title.includes(normalized) || description.includes(normalized);
    });
  }, [query, posts, lang]);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative max-w-md">
        <LuSearch className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-text" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={categorySearchText[lang].placeholder}
          className="w-full rounded-xl border border-gray-border bg-white py-2.5 pl-10 pr-4 text-deep-blue outline-none placeholder:text-gray-text focus:border-light-blue"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-text">{categorySearchText[lang].empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((post) => (
            <NewsCard
              key={`newsCard-${post.id}`}
              category={post.category}
              title={post.title[lang]}
              time={formatRelativeDate(post.createdAt, lang)}
              thumbnail={post.thumbnail}
              link={`/${lang}/posts/${post.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
