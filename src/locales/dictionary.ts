import {
  LocalizedData,
  NavLinkType,
  DateType,
  FooterContentType,
  CategoryTextType,
  CategoryType,
  Language,
} from "@/src/types";

const languages: Language[] = ["ru", "kk", "en"];

export const dateDictionary: LocalizedData<DateType> = {
  ru: {
    days: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
    months: [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ],
  },
  kk: {
    days: [
      "Жексенбі",
      "Дүйсенбі",
      "Сейсенбі",
      "Сәрсенбі",
      "Бейсенбі",
      "Жұма",
      "Сенбі",
    ],
    months: [
      "Қаңтар",
      "Ақпан",
      "Наурыз",
      "Сәуір",
      "Мамыр",
      "Маусым",
      "Шілде",
      "Тамыз",
      "Қыркүйек",
      "Қазан",
      "Қараша",
      "Желтоқсан",
    ],
  },
  en: {
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
};
export const logoText: LocalizedData<string> = {
  ru: "Город 24 · новости",
  kk: "Қала 24 · жаңалықтары",
  en: "City 24 · news",
};

export const footerText: LocalizedData<FooterContentType> = {
  ru: {
    description:
      "Независимое городское издание. Оперативно, проверено, о столице.",
    sections: {
      rubrics: "Рубрики",
      editorial: "Редакция",
      subscribe: "Подписывайтесь",
    },
    privacyPolicy: "Все права защищены. При перепечатке ссылка обязательна.",
    buttonText: "Написать в WhatsApp",
  },
  kk: {
    description:
      "Тәуелсіз қалалық басылым. Елорда туралы жедел әрі тексерілген ақпарат.",
    sections: {
      rubrics: "Айдарлар",
      editorial: "Редакция",
      subscribe: "Жазылыңыздар",
    },
    privacyPolicy:
      "Барлық құқықтар қорғалған. Қайта басып шығару кезінде сілтеме жасау міндетті.",
    buttonText: "WhatsApp-қа жазу",
  },
  en: {
    description:
      "Independent city publication. Prompt, verified, about the capital.",
    sections: {
      rubrics: "Rubrics",
      editorial: "Editorial Staff",
      subscribe: "Subscribe",
    },
    privacyPolicy:
      "All rights reserved. When reprinting, a hyperlink is mandatory.",
    buttonText: "Message on WhatsApp",
  },
};

interface HeroTextContent {
  title: string;
  allNewsLink: string;
}
export const heroText: LocalizedData<HeroTextContent> = {
  ru: {
    title: "Главные события дня",
    allNewsLink: "Все новости",
  },
  kk: {
    title: "Күннің басты оқиғалары",
    allNewsLink: "Барлық жаңалықтар",
  },
  en: {
    title: "Main Events of the Day",
    allNewsLink: "All news",
  },
};

export const categoryText: Record<CategoryType, CategoryTextType> = {
  City: {
    ru: "ГОРОД",
    kk: "ҚАЛА",
    en: "CITY",
  },
  Society: {
    ru: "ОБЩЕСТВО",
    kk: "ҚОҒАМ",
    en: "SOCIETY",
  },
  Incidents: {
    ru: "ПРОИСШЕСТВИЯ",
    kk: "ОҚИҒАЛАР",
    en: "INCIDENTS",
  },
  Politics: {
    ru: "ПОЛИТИКА",
    kk: "САЯСАТ",
    en: "POLITICS",
  },
  Economy: {
    ru: "ЭКОНОМИКА",
    kk: "ЭКОНОМИКА",
    en: "ECONOMY",
  },
  Culture: {
    ru: "КУЛЬТУРА",
    kk: "МӘДЕНИЕТ",
    en: "CULTURE",
  },
  Science: {
    ru: "НАУКА",
    kk: "ҒЫЛЫМ",
    en: "SCIENCE",
  },
  Sports: {
    ru: "СПОРТ",
    kk: "СПОРТ",
    en: "SPORTS",
  },
};

const categoryKeys = Object.keys(categoryText) as CategoryType[];

export const navLinks: LocalizedData<NavLinkType[]> = {
  ru: [],
  kk: [],
  en: [],
};

languages.forEach((lang) => {
  navLinks[lang] = categoryKeys.map((category) => {
    return {
      text: categoryText[category][lang],
      href: `/${lang}/posts/category/${category}`,
    };
  });
});
