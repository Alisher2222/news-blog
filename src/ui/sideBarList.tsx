import { Language } from "@/src/types";
import { SideBarElementType } from "@/src/types";
import { SideBarElement } from "./sideBarElement";

type SideBarType = {
  language: Language;
  recentNews: SideBarElementType[];
  className?: string;
};

const heading: Record<Language, string> = {
  en: "Recent news",
  ru: "Последние новости",
  kk: "соңғы жаңалықтар",
};

export function SideBar({ language, recentNews, className = "" }: SideBarType) {
  return (
    <aside className={` ${className} bg-white`}>
      <div className="bg-deep-blue flex justify-between py-2 px-3">
        <div className="flex items-center gap-1">
          <h2 className="text-white uppercase text-[16px] xl:text-xl">
            {heading[language]}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="size-3 bg-red animate-pulse rounded-full"></span>
          <p className="text-white uppercase">Live</p>
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-center py-2 px-3  ">
        {recentNews.map((news) => (
          <SideBarElement
            key={`sidebar-${news.id}`}
            id={news.id}
            date={news.date.toString()}
            title={news.title}
            link={news.link}
          />
        ))}
      </div>
    </aside>
  );
}
