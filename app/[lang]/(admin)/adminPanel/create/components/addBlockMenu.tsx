"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuImage, LuPlus, LuQuote } from "react-icons/lu";
import type { IconType } from "react-icons";
import type { Language, LocalizedData, PostContentKind } from "@/src/types";

type BlockOption = {
  type: PostContentKind;
  icon: IconType | string;
  accent: string;
  heading: LocalizedData<string>;
  description: LocalizedData<string>;
};

const BLOCK_OPTIONS: BlockOption[] = [
  {
    type: "PARAGRAPH",
    icon: "T",
    accent: "bg-blue-50 text-deep-blue",
    heading: { ru: "Параграф", kk: "Параграф", en: "Paragraph" },
    description: {
      ru: "Обычный текстовый блок",
      kk: "Стандартты мәтіндік блок",
      en: "Standard text block",
    },
  },
  {
    type: "QUOTE",
    icon: LuQuote,
    accent: "bg-red-50 text-red",
    heading: { ru: "Цитата", kk: "Дәйексөз", en: "Quote" },
    description: {
      ru: "Выделенный текст с автором",
      kk: "Бөлектелген мәтін",
      en: "Highlighted text",
    },
  },
  {
    type: "IMAGE",
    icon: LuImage,
    accent: "bg-emerald-50 text-emerald-600",
    heading: { ru: "Изображение", kk: "Сурет", en: "Image" },
    description: {
      ru: "Картинка по ссылке",
      kk: "Сілтеме бойынша сурет",
      en: "Image from a URL",
    },
  },
];

type AddBlockMenuProps = {
  lang: Language;
  label: string;
  onAdd: (type: PostContentKind) => void;
};

export function AddBlockMenu({ lang, label, onAdd }: AddBlockMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-dashed border-gray-border bg-white/60 px-5 py-4 text-deep-blue transition-colors hover:border-light-blue hover:bg-white"
      >
        <span className="flex items-center gap-3 font-semibold">
          <LuPlus className="size-5" />
          {label}
        </span>
        {open ? (
          <IoIosArrowUp className="size-5" />
        ) : (
          <IoIosArrowDown className="size-5" />
        )}
      </button>

      {open && (
        <ul className="flex flex-col gap-2 rounded-xl border border-gray-border bg-white p-2 shadow-sm">
          {BLOCK_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <li key={option.type}>
                <button
                  type="button"
                  onClick={() => {
                    onAdd(option.type);
                    setOpen(false);
                  }}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-[#F1F5F9]"
                >
                  <span
                    className={`flex size-11 items-center justify-center rounded-lg text-xl font-bold ${option.accent}`}
                  >
                    {typeof Icon === "string" ? Icon : <Icon className="size-5" />}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-deep-blue">
                      {option.heading[lang]}
                    </span>
                    <span className="text-sm text-gray-text">
                      {option.description[lang]}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
