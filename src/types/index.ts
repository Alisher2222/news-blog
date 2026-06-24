export type Language = "ru" | "kk" | "en";

export type WeatherStatus = {
  sign: "+" | "-";
  value: number;
  description: string;
};

export type CurrencyStatus = {
  name: "USD" | "EUR";
  value: number;
  trend: "rising" | "falling";
};

export type DateType = { days: string[]; months: string[] };

export type FooterContentType = {
  description: string;
  sections: {
    rubrics: string;
    editorial: string;
    subscribe: string;
  };
  privacyPolicy: string;
  buttonText: string;
};

export type NavLinkType = {
  text: string;
  href: string;
};

export type LocalizedData<T> = Record<Language, T>;

export type CategoryType =
  | "City"
  | "Society"
  | "Incidents"
  | "Economy"
  | "Culture"
  | "Sports"
  | "Politics"
  | "Science";

export type PostType = {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  text: Record<Language, string>;
  date: string;
  thumbnail: string;
  category: CategoryType;
};

export type SideBarElementType = {
  id: string;
  date: string;
  title: string;
  link: string;
};

export type CategoryTextType = Record<Language, string>;
