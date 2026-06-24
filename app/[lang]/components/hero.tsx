import { CategoryType, Language } from "@/src/types";
import { Category } from "@/src/ui/Category";
import { IoTimeOutline } from "react-icons/io5";
import Link from "next/link";
import { heroText } from "@/src/locales/dictionary";
import { FaArrowRight } from "react-icons/fa";

type HeroProps = {
  thumbnail: string;
  category: CategoryType;
  title: string;
  time: string;
  link: string;
  description: string;
  language: Language;
};

export function Hero({
  thumbnail,
  category,
  title,
  time,
  link,
  description,
  language,
}: HeroProps) {
  return (
    <div className="[grid-area:hero]  flex flex-col gap-2">
      <div className="flex justify-between pb-1 border-b-2 border-deep-blue">
        <h1 className="text-deep-blue font-extrabold text-3xl font-heading">
          {heroText[language].title}
        </h1>
        <Link
          href={`${language}/posts`}
          className="text-red font-bold flex gap-1 items-center"
        >
          {heroText[language].allNewsLink}
          <FaArrowRight />
        </Link>
      </div>
      <Link href={link}>
        <section
          style={{ backgroundImage: `url(${thumbnail})` }}
          className=" transition-all duration-300 hover:-translate-2 flex flex-col justify-end gap-3 rounded-xl h-[700px] bg-cover  p-10"
        >
          <div className="flex gap-4">
            <Category category={category} />
            <p className="text-white flex items-center gap-1">
              <IoTimeOutline />
              {time}
            </p>
          </div>
          <h2 className="font-extrabold text-white text-[60px] font-heading">
            {title}
          </h2>
          <p>{description}</p>
        </section>
      </Link>
    </div>
  );
}
