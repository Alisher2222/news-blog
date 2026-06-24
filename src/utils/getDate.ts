import { Language } from "@/src/types";
import { dateDictionary } from "@/src/locales/dictionary";

export const getDate = (language: Language) => {
  const now = new Date();

  const dayOfWeekIndex = now.getDay();
  const monthNameIndex = now.getMonth();

  const dayOfWeek = dateDictionary[language].days[dayOfWeekIndex];
  const dayOfMonth = now.getDate();
  const monthName = dateDictionary[language].months[monthNameIndex];
  const year = now.getFullYear();

  return { dayOfWeek, dayOfMonth, monthName, year };
};
