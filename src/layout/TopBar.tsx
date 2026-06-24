import { CurrencyStatus, Language, WeatherStatus } from "@/src/types";
import { getDate } from "../utils/getDate";
import Link from "next/link";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

type TopBarProps = {
  language: Language;
  cityName: string;
  weather: WeatherStatus;
  currencies: CurrencyStatus[];
};

export function TopBar({
  language,
  cityName,
  weather,
  currencies,
}: TopBarProps) {
  const { dayOfWeek, monthName, dayOfMonth, year } = getDate(language);
  return (
    <section className=" bg-deep-blue py-2 px-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <p className="hidden md:block">
          {dayOfWeek}, {dayOfMonth} {monthName} {year}
        </p>
        <div className="flex gap-2.5">
          <p className="uppercase font-bold">{cityName}</p>
          <p>
            {weather.sign}
            {weather.value}°C
            <span className="max-[460px]:hidden">, {weather.description}</span>
          </p>
          <div className=" hidden lg:flex gap-4">
            {currencies.map((currency) => (
              <p
                className="flex gap-2 items-center border-l-1 border-gray-border pl-3"
                key={`currency-${currency.name}`}
              >
                <strong>{currency.name}</strong>
                {currency.value}
                {currency.trend === "rising" ? (
                  <FaArrowTrendUp className="text-green-600" />
                ) : (
                  <FaArrowTrendDown className="text-red" />
                )}
              </p>
            ))}
          </div>
        </div>
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
