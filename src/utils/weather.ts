import type { Language } from "@/src/types";

// Maps WMO weather interpretation codes (returned by Open-Meteo) to a small set
// of human-readable, localized descriptions.
type WeatherKey =
  | "clear"
  | "partlyCloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "showers"
  | "snow"
  | "thunderstorm";

const DESCRIPTIONS: Record<WeatherKey, Record<Language, string>> = {
  clear: { ru: "ясно", kk: "ашық", en: "clear" },
  partlyCloudy: {
    ru: "переменная облачность",
    kk: "ауыспалы бұлтты",
    en: "partly cloudy",
  },
  cloudy: { ru: "облачно", kk: "бұлтты", en: "cloudy" },
  fog: { ru: "туман", kk: "тұман", en: "fog" },
  drizzle: { ru: "морось", kk: "себелеген жаңбыр", en: "drizzle" },
  rain: { ru: "дождь", kk: "жаңбыр", en: "rain" },
  showers: { ru: "ливень", kk: "нөсер", en: "showers" },
  snow: { ru: "снег", kk: "қар", en: "snow" },
  thunderstorm: { ru: "гроза", kk: "найзағай", en: "thunderstorm" },
};

function codeToKey(code: number): WeatherKey {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partlyCloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "showers";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95) return "thunderstorm";
  return "cloudy";
}

export function getWeatherDescription(code: number, language: Language): string {
  return DESCRIPTIONS[codeToKey(code)][language];
}
