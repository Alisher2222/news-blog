"use client";

import { useState } from "react";
import { LuImage } from "react-icons/lu";

type ImageBlockProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function ImageBlock({ value, placeholder, onChange }: ImageBlockProps) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-gray-border bg-white px-4 py-2">
        <LuImage className="size-5 shrink-0 text-gray-text" />
        <input
          type="url"
          value={value}
          onChange={(event) => {
            setBroken(false);
            onChange(event.target.value);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-deep-blue outline-none placeholder:text-gray-text"
        />
      </div>
      {value && !broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          onError={() => setBroken(true)}
          className="max-h-80 w-full rounded-xl object-cover"
        />
      )}
    </div>
  );
}
