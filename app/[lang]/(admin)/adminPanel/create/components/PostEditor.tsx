"use client";

import { useMemo, useState, useTransition } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuLoaderCircle,
  LuTrash2,
} from "react-icons/lu";
import { ParagraphBlock } from "./paragraph";
import { QuoteBlock } from "./quote";
import { ImageBlock } from "./image";
import { AddBlockMenu } from "./addBlockMenu";
import { createPostAction } from "../actions";
import { updatePostAction } from "../../actions";
import { categoryText } from "@/src/locales/dictionary";
import type {
  CategoryType,
  EditorBlockType,
  Language,
  LocalizedData,
  PostContentKind,
} from "@/src/types";

export type PostEditorInitial = {
  postId: string;
  title: string;
  description: string;
  thumbnail: string;
  category: CategoryType;
  blocks: { type: PostContentKind; value: string }[];
};

type PostEditorProps = {
  lang: Language;
  initial?: PostEditorInitial;
};

const CATEGORIES = Object.keys(categoryText) as CategoryType[];

const UI: LocalizedData<{
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  thumbnailLabel: string;
  thumbnailPlaceholder: string;
  categoryLabel: string;
  paragraphPlaceholder: string;
  quotePlaceholder: string;
  imagePlaceholder: string;
  addBlock: string;
  save: string;
  update: string;
  saving: string;
  hintsTitle: string;
  hints: string[];
  statsTitle: string;
  statBlocks: string;
  statParagraphs: string;
  statQuotes: string;
  statImages: string;
  errors: Record<string, string>;
}> = {
  ru: {
    titlePlaceholder: "Заголовок статьи...",
    descriptionPlaceholder: "Краткое описание статьи...",
    thumbnailLabel: "Обложка (ссылка)",
    thumbnailPlaceholder: "https://...",
    categoryLabel: "Рубрика",
    paragraphPlaceholder: "Введите текст параграфа...",
    quotePlaceholder: "Введите текст цитаты...",
    imagePlaceholder: "Вставьте ссылку на изображение...",
    addBlock: "Добавить блок",
    save: "Создать пост",
    update: "Сохранить изменения",
    saving: "Сохранение...",
    hintsTitle: "Подсказки",
    hints: [
      'Используйте кнопку "Добавить блок" чтобы выбрать тип блока',
      "Стрелками можно изменить порядок блоков",
      "Пустые блоки не сохраняются",
      "Заголовок и обложка обязательны",
    ],
    statsTitle: "Статистика",
    statBlocks: "Блоков",
    statParagraphs: "Параграфов",
    statQuotes: "Цитат",
    statImages: "Изображений",
    errors: {
      UNAUTHORIZED: "Сессия истекла. Войдите снова.",
      TITLE_REQUIRED: "Введите заголовок статьи.",
      THUMBNAIL_REQUIRED: "Добавьте ссылку на обложку.",
      CONTENT_REQUIRED: "Добавьте хотя бы один заполненный блок.",
    },
  },
  kk: {
    titlePlaceholder: "Мақала тақырыбы...",
    descriptionPlaceholder: "Мақаланың қысқаша сипаттамасы...",
    thumbnailLabel: "Мұқаба (сілтеме)",
    thumbnailPlaceholder: "https://...",
    categoryLabel: "Айдар",
    paragraphPlaceholder: "Параграф мәтінін енгізіңіз...",
    quotePlaceholder: "Дәйексөз мәтінін енгізіңіз...",
    imagePlaceholder: "Сурет сілтемесін қойыңыз...",
    addBlock: "Блок қосу",
    save: "Постты жасау",
    update: "Өзгерістерді сақтау",
    saving: "Сақталуда...",
    hintsTitle: "Кеңестер",
    hints: [
      '"Блок қосу" батырмасымен блок түрін таңдаңыз',
      "Блок ретін көрсеткілермен өзгертуге болады",
      "Бос блоктар сақталмайды",
      "Тақырып пен мұқаба міндетті",
    ],
    statsTitle: "Статистика",
    statBlocks: "Блоктар",
    statParagraphs: "Параграфтар",
    statQuotes: "Дәйексөздер",
    statImages: "Суреттер",
    errors: {
      UNAUTHORIZED: "Сессия аяқталды. Қайта кіріңіз.",
      TITLE_REQUIRED: "Мақала тақырыбын енгізіңіз.",
      THUMBNAIL_REQUIRED: "Мұқаба сілтемесін қосыңыз.",
      CONTENT_REQUIRED: "Кемінде бір толтырылған блок қосыңыз.",
    },
  },
  en: {
    titlePlaceholder: "Article title...",
    descriptionPlaceholder: "Short article description...",
    thumbnailLabel: "Thumbnail (URL)",
    thumbnailPlaceholder: "https://...",
    categoryLabel: "Category",
    paragraphPlaceholder: "Enter paragraph text...",
    quotePlaceholder: "Enter quote text...",
    imagePlaceholder: "Paste an image URL...",
    addBlock: "Add block",
    save: "Create post",
    update: "Save changes",
    saving: "Saving...",
    hintsTitle: "Tips",
    hints: [
      'Use the "Add block" button to pick a block type',
      "Reorder blocks with the arrow buttons",
      "Empty blocks are not saved",
      "Title and thumbnail are required",
    ],
    statsTitle: "Statistics",
    statBlocks: "Blocks",
    statParagraphs: "Paragraphs",
    statQuotes: "Quotes",
    statImages: "Images",
    errors: {
      UNAUTHORIZED: "Your session expired. Sign in again.",
      TITLE_REQUIRED: "Enter the article title.",
      THUMBNAIL_REQUIRED: "Add a thumbnail URL.",
      CONTENT_REQUIRED: "Add at least one filled block.",
    },
  },
};

function newBlock(type: PostContentKind): EditorBlockType {
  return { id: crypto.randomUUID(), type, value: "" };
}

function initialBlocks(
  blocks: PostEditorInitial["blocks"] | undefined,
): EditorBlockType[] {
  if (!blocks || blocks.length === 0) {
    return [{ id: "block-1", type: "PARAGRAPH", value: "" }];
  }
  return blocks.map((block, index) => ({
    id: `block-${index + 1}`,
    type: block.type,
    value: block.value,
  }));
}

export function PostEditor({ lang, initial }: PostEditorProps) {
  const t = UI[lang];
  const isEditing = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? "");
  const [category, setCategory] = useState<CategoryType>(
    initial?.category ?? "CITY",
  );
  const [blocks, setBlocks] = useState<EditorBlockType[]>(
    initialBlocks(initial?.blocks),
  );
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const stats = useMemo(
    () => ({
      total: blocks.length,
      paragraphs: blocks.filter((b) => b.type === "PARAGRAPH").length,
      quotes: blocks.filter((b) => b.type === "QUOTE").length,
      images: blocks.filter((b) => b.type === "IMAGE").length,
    }),
    [blocks],
  );

  const placeholderFor = (type: PostContentKind) =>
    type === "PARAGRAPH"
      ? t.paragraphPlaceholder
      : type === "QUOTE"
        ? t.quotePlaceholder
        : t.imagePlaceholder;

  function addBlock(type: PostContentKind) {
    setBlocks((prev) => [...prev, newBlock(type)]);
  }

  function updateBlock(id: string, value: string) {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, value } : block)),
    );
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setBlocks((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handleSave() {
    setError("");
    startTransition(async () => {
      const input = {
        lang,
        title,
        description,
        thumbnail,
        category,
        blocks: blocks.map((block) => ({
          type: block.type,
          value: block.value,
        })),
      };

      const result = initial
        ? await updatePostAction(initial.postId, input)
        : await createPostAction(input);

      // On success the action redirects; we only reach here on validation errors.
      if (result?.error) {
        setError(t.errors[result.error] ?? result.error);
      }
    });
  }

  return (
    <div className="grid w-full grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-[1fr_320px]">
      {/* Editor column */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-text">
              {t.categoryLabel}
            </span>
            <div className="relative w-fit">
              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as CategoryType)
                }
                className="cursor-pointer appearance-none rounded-lg bg-deep-blue py-2 pl-4 pr-10 font-bold text-white outline-none"
              >
                {CATEGORIES.map((value) => (
                  <option key={value} value={value} className="text-black">
                    {categoryText[value][lang]}
                  </option>
                ))}
              </select>
              <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-light-blue px-6 py-3 font-extrabold text-white transition-colors hover:bg-deep-blue disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <LuLoaderCircle className="size-5 animate-spin" />
            ) : null}
            {isPending ? t.saving : isEditing ? t.update : t.save}
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
            {error}
          </div>
        )}

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={t.titlePlaceholder}
          className="w-full bg-transparent font-heading text-4xl font-extrabold text-deep-blue outline-none placeholder:text-gray-text/40 lg:text-5xl"
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t.descriptionPlaceholder}
          rows={2}
          className="w-full resize-none bg-transparent text-lg text-gray-500 outline-none placeholder:text-gray-text/60"
        />

        <ImageBlock
          value={thumbnail}
          placeholder={t.thumbnailPlaceholder}
          onChange={setThumbnail}
        />

        <hr className="border-gray-border" />

        {/* Blocks */}
        <div className="flex flex-col gap-4">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="group flex gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-gray-border hover:bg-white"
            >
              <div className="flex flex-col items-center gap-1 pt-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => moveBlock(index, -1)}
                  disabled={index === 0}
                  className="cursor-pointer text-gray-text hover:text-deep-blue disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Move up"
                >
                  <LuChevronUp className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 1)}
                  disabled={index === blocks.length - 1}
                  className="cursor-pointer text-gray-text hover:text-deep-blue disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Move down"
                >
                  <LuChevronDown className="size-4" />
                </button>
              </div>

              <div className="flex-1">
                {block.type === "PARAGRAPH" && (
                  <ParagraphBlock
                    value={block.value}
                    placeholder={placeholderFor(block.type)}
                    onChange={(value) => updateBlock(block.id, value)}
                  />
                )}
                {block.type === "QUOTE" && (
                  <QuoteBlock
                    value={block.value}
                    placeholder={placeholderFor(block.type)}
                    onChange={(value) => updateBlock(block.id, value)}
                  />
                )}
                {block.type === "IMAGE" && (
                  <ImageBlock
                    value={block.value}
                    placeholder={placeholderFor(block.type)}
                    onChange={(value) => updateBlock(block.id, value)}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() => removeBlock(block.id)}
                className="cursor-pointer self-start pt-1 text-gray-text opacity-0 transition-opacity hover:text-red group-hover:opacity-100"
                aria-label="Delete block"
              >
                <LuTrash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        <AddBlockMenu lang={lang} label={t.addBlock} onAdd={addBlock} />
      </div>

      {/* Sidebar */}
      <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
        <h2 className="text-lg font-bold uppercase text-deep-blue">
          {t.hintsTitle}
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {t.hints.map((hint) => (
            <li key={hint} className="flex gap-2 text-sm text-gray-500">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red" />
              {hint}
            </li>
          ))}
        </ul>

        <hr className="my-6 border-gray-border" />

        <h2 className="text-lg font-bold uppercase text-deep-blue">
          {t.statsTitle}
        </h2>
        <dl className="mt-4 flex flex-col gap-2 text-deep-blue">
          {[
            [t.statBlocks, stats.total],
            [t.statParagraphs, stats.paragraphs],
            [t.statQuotes, stats.quotes],
            [t.statImages, stats.images],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <dt className="text-gray-500">{label}</dt>
              <dd className="font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
