"use client";

import { LuQuote } from "react-icons/lu";

type QuoteBlockProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function QuoteBlock({ value, placeholder, onChange }: QuoteBlockProps) {
  return (
    <div className="relative rounded-r-xl border-l-4 border-red bg-white p-5">
      <LuQuote className="absolute -top-2.5 left-5 size-7 text-[#EEBBBC]" />
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full resize-none bg-transparent font-heading text-2xl font-extrabold italic text-deep-blue outline-none placeholder:text-gray-text/60"
      />
    </div>
  );
}
