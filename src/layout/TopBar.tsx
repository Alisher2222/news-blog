import { Language } from "@/src/types";
import { getDate } from "../utils/getDate";
import Link from "next/link";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { MarketInfo } from "./MarketInfo";

type TopBarProps = {
  language: Language;
  cityName: string;
};

export function TopBar({ language, cityName }: TopBarProps) {
  const { dayOfWeek, monthName, dayOfMonth, year } = getDate(language);
  return (
    <section className=" bg-deep-blue py-2 px-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <p className="hidden md:block">
          {dayOfWeek}, {dayOfMonth} {monthName} {year}
        </p>
        <MarketInfo cityName={cityName} language={language} />
        <ul className="flex gap-2.5">
          <li className="group p-2.5 rounded-full border-white border-1 flex justify-center items-center hover:bg-white">
            <Link href="#">
              <FaTelegramPlane className="group-hover:text-deep-blue" />
            </Link>
          </li>
          <li className="group p-2.5 rounded-full border-white border-1 flex justify-center items-center hover:bg-white">
            <Link href="#">
              <FaWhatsapp className="group-hover:text-deep-blue" />
            </Link>
          </li>
          <li className="group hover:bg-white p-2.5 rounded-full border-white border-1 flex justify-center items-center">
            <Link href="#">
              <CiInstagram className="group-hover:text-deep-blue" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
