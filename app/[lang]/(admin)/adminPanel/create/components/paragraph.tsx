"use client";

type ParagraphBlockProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function ParagraphBlock({
  value,
  placeholder,
  onChange,
}: ParagraphBlockProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full resize-none bg-transparent text-lg leading-relaxed text-deep-blue outline-none placeholder:text-gray-text"
    />
  );
}
