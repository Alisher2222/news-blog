import type { Language, LocalizedText } from "@/src/types";

const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

const LANG_CODES: Record<Language, string> = {
  ru: "ru",
  kk: "kk",
  en: "en",
};

async function translateOne(
  text: string,
  from: Language,
  to: Language,
): Promise<string> {
  if (from === to || !text.trim()) return text;

  const url = `${MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=${LANG_CODES[from]}|${LANG_CODES[to]}&de=alisherasanov05@gmail.com`;
  const res = await fetch(url);

  if (!res.ok) return text;

  const data = await res.json();
  return data?.responseData?.translatedText ?? text;
}

export async function toLocalized(
  value: string,
  sourceLang: Language,
): Promise<LocalizedText> {
  const langs: Language[] = ["ru", "kk", "en"];
  const others = langs.filter((l) => l !== sourceLang);

  const [first, second] = await Promise.all(
    others.map((lang) => translateOne(value, sourceLang, lang)),
  );

  return {
    [sourceLang]: value,
    [others[0]]: first,
    [others[1]]: second,
  } as LocalizedText;
}
