import { CategoryType } from "../types";
import Link from "next/link";
import { IoTimeOutline } from "react-icons/io5";
import { Category } from "./Category";

type NewsCardProps = {
  thumbnail: string;
  category: CategoryType;
  title: string;
  time: string;
  link: string;
};

export function NewsCard({
  thumbnail,
  category,
  title,
  time,
  link,
}: NewsCardProps) {
  return (
    <article className="group rounded-xl bg-white cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link href={link}>
        <div
          style={{ backgroundImage: `url(${thumbnail})` }}
          className="h-48 w-full bg-cover bg-center rounded-t-xl"
        ></div>
        <div className="p-4 flex flex-col gap-2">
          <Category category={category} />
          <h3 className="text-black font-bold text-xl group-hover:text-red font-heading">
            {title}
          </h3>
          <p className="text-gray-400  flex items-center gap-1">
            <IoTimeOutline />
            {time}
          </p>
        </div>
      </Link>
    </article>
  );
}
