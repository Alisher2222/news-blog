import type { Language } from "@/src/types";

const RELATIVE: Record<
  Language,
  {
    justNow: string;
    minutes: (n: number) => string;
    hours: (n: number) => string;
    days: (n: number) => string;
    months: (n: number) => string;
    years: (n: number) => string;
  }
> = {
  ru: {
    justNow: "только что",
    minutes: (n) => `${n} мин назад`,
    hours: (n) => `${n} ч назад`,
    days: (n) => `${n} ${n === 1 ? "день" : "дней"} назад`,
    months: (n) => `${n} ${n === 1 ? "месяц" : "месяцев"} назад`,
    years: (n) => `${n} ${n === 1 ? "год" : "лет"} назад`,
  },

  kk: {
    justNow: "жаңа ғана",
    minutes: (n) => `${n} мин бұрын`,
    hours: (n) => `${n} сағ бұрын`,
    days: (n) => `${n} күн бұрын`,
    months: (n) => `${n} ай бұрын`,
    years: (n) => `${n} жыл бұрын`,
  },

  en: {
    justNow: "just now",
    minutes: (n) => `${n} min ago`,
    hours: (n) => `${n} h ago`,
    days: (n) => `${n} ${n === 1 ? "day" : "days"} ago`,
    months: (n) => `${n} ${n === 1 ? "month" : "months"} ago`,
    years: (n) => `${n} ${n === 1 ? "year" : "years"} ago`,
  },
};

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
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) return t.justNow;
  if (minutes < 60) return t.minutes(minutes);
  if (hours < 24) return t.hours(hours);
  if (days < 30) return t.days(days);
  if (months < 12) return t.months(months);

  return t.years(years);
}
