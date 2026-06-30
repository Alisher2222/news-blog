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
  ALL: {
    ru: "ВСЕ",
    kk: "БАРЛЫҒЫ",
    en: "ALL",
  },
  CITY: {
    ru: "ГОРОД",
    kk: "ҚАЛА",
    en: "CITY",
  },
  SOCIETY: {
    ru: "ОБЩЕСТВО",
    kk: "ҚОҒАМ",
    en: "SOCIETY",
  },
  INCIDENTS: {
    ru: "ПРОИСШЕСТВИЯ",
    kk: "ОҚИҒАЛАР",
    en: "INCIDENTS",
  },
  POLITICS: {
    ru: "ПОЛИТИКА",
    kk: "САЯСАТ",
    en: "POLITICS",
  },
  ECONOMY: {
    ru: "ЭКОНОМИКА",
    kk: "ЭКОНОМИКА",
    en: "ECONOMY",
  },
  CULTURE: {
    ru: "КУЛЬТУРА",
    kk: "МӘДЕНИЕТ",
    en: "CULTURE",
  },
  SCIENCE: {
    ru: "НАУКА",
    kk: "ҒЫЛЫМ",
    en: "SCIENCE",
  },
  SPORTS: {
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

export const categoryPageText: Record<Language, string> = {
  ru: "Все материалы рубрики «CATEGORY» — оперативно и проверено.",
  kk: "«CATEGORY» айдарының барлық материалдары — жедел және тексерілген.",
  en: "All materials in the 'CATEGORY' section — prompt and verified.",
};

export const constantValue = {
  email: "alisherasanov@gmail.com",
  telephoneNumber: "8 (775) 767 36-83",
  address: "пр. Независимости, 8, Өскемен, Казахстан",
  cityName: "Oskemen",
};

export const postAuthorText: Record<Language, string> = {
  ru: "Автор",
  kk: "Автор",
  en: "Author",
};

export const adminPanelText: Record<
  Language,
  {
    createPost: string;
    searchPlaceholder: string;
    thumb: string;
    title: string;
    category: string;
    datePublished: string;
    actions: string;
    edit: string;
    delete: string;
    confirmDelete: string;
    empty: string;
  }
> = {
  ru: {
    createPost: "Создать пост",
    searchPlaceholder: "Поиск по заголовку, рубрике или ID...",
    thumb: "Фото",
    title: "Заголовок",
    category: "Рубрика",
    datePublished: "Дата публикации",
    actions: "Действия",
    edit: "Изменить",
    delete: "Удалить",
    confirmDelete: "Удалить этот пост? Действие необратимо.",
    empty: "Посты не найдены.",
  },
  kk: {
    createPost: "Пост жасау",
    searchPlaceholder: "Тақырып, айдар немесе ID бойынша іздеу...",
    thumb: "Сурет",
    title: "Тақырып",
    category: "Айдар",
    datePublished: "Жарияланған күні",
    actions: "Әрекеттер",
    edit: "Өзгерту",
    delete: "Жою",
    confirmDelete: "Бұл постты жою керек пе? Әрекет қайтарылмайды.",
    empty: "Посттар табылмады.",
  },
  en: {
    createPost: "Create New Post",
    searchPlaceholder: "Search posts by title, category, or ID...",
    thumb: "Thumb",
    title: "Title",
    category: "Category",
    datePublished: "Date Published",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this post? This cannot be undone.",
    empty: "No posts found.",
  },
};

export const categorySearchText: Record<
  Language,
  { placeholder: string; empty: string }
> = {
  ru: {
    placeholder: "Поиск по заголовку или описанию...",
    empty: "По вашему запросу ничего не найдено.",
  },
  kk: {
    placeholder: "Тақырып немесе сипаттама бойынша іздеу...",
    empty: "Сұрауыңыз бойынша ештеңе табылмады.",
  },
  en: {
    placeholder: "Search by title or description...",
    empty: "Nothing matches your search.",
  },
};
