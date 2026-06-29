import type { Language } from "@/src/types";

// Posts published within the last day are shown as relative time ("3 ч назад").
// Anything older than a day falls back to an absolute timestamp with the clock
// time, e.g. "2023-10-26 11:30".
const RELATIVE: Record<
  Language,
  {
    justNow: string;
    minutes: (n: number) => string;
    hours: (n: number) => string;
  }
> = {
  ru: {
    justNow: "только что",
    minutes: (n) => `${n} мин назад`,
    hours: (n) => `${n} ч назад`,
  },
  kk: {
    justNow: "жаңа ғана",
    minutes: (n) => `${n} мин бұрын`,
    hours: (n) => `${n} сағ бұрын`,
  },
  en: {
    justNow: "just now",
    minutes: (n) => `${n} min ago`,
    hours: (n) => `${n} h ago`,
  },
};

const pad = (n: number) => n.toString().padStart(2, "0");

export function formatRelativeDate(
  value: string | Date,
  language: Language,
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";

  const t = RELATIVE[language];
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return t.justNow;
  if (minutes < 60) return t.minutes(minutes);
  if (hours < 24) return t.hours(hours);

  // Older than a day → absolute date with the clock time.
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}
