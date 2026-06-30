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
  | "CITY"
  | "SOCIETY"
  | "INCIDENTS"
  | "ECONOMY"
  | "CULTURE"
  | "SPORTS"
  | "POLITICS"
  | "SCIENCE"
  | "ALL";

export type RoleType = "JOURNALIST" | "ADMIN";
export type PostContentKind = "PARAGRAPH" | "QUOTE" | "IMAGE";

export type LocalizedText = Record<Language, string>;

export type PostType = {
  id: string;

  title: LocalizedText;
  description: LocalizedText;

  createdAt: string;
  updatedAt: string;

  thumbnail: string;

  category: CategoryType;

  viewCount: number;

  authorId: string;
};

export type PostContentType = {
  id: string;

  postId: string;

  type: PostContentKind;

  content: LocalizedText;

  order: number;
};

export type EditorBlockType = {
  id: string;
  type: PostContentKind;
  value: string;
};

export type CreatePostInput = {
  lang: Language;
  title: string;
  description: string;
  thumbnail: string;
  category: CategoryType;
  blocks: { type: PostContentKind; value: string }[];
};

export type UserType = {
  id: string;

  name: string;
  surname: string;

  email: string;

  avatar: string | null;

  role: RoleType;

  createdAt: string;
  updatedAt: string;
};

export type SideBarElementType = {
  id: string;
  date: string;
  title: string;
  link: string;
};

export type CategoryTextType = Record<Language, string>;
