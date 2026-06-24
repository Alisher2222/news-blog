import { Language } from "@/src/types";
import { footerText } from "@/src/locales/dictionary";
import { Logo } from "../ui/Logo";
import { navLinks } from "@/src/locales/dictionary";
import { Button } from "../ui/Button";
import Link from "next/link";

import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { RiTelegram2Line } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";

export function Footer({
  language,
  cityName,
  address,
  telephoneNumber,
  email,
}: {
  language: Language;
  cityName: string;
  address: string;
  telephoneNumber: string;
  email: string;
}) {
  return (
    <footer className="bg-deep-blue px-4 text-gray-text">
      <div className="container mx-auto">
        <div className=" min-h-[335px] p-4 border-b-1 border-gray-border grid grid-cols-1 gap-y-5 lg:grid-cols-4 ">
          <div className="flex flex-col gap-4 max-w-[300px]">
            <Logo language={language} cityName={cityName} variant="light" />
            <p>{footerText[language].description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2 lg:contents">
            <div className="flex flex-col gap-4">
              <p className="text-white text-xl font-bold">
                {footerText[language].sections.rubrics}
              </p>
              <ul className="uppercase flex flex-col gap-4">
                {navLinks[language].map((link) => (
                  <li key={`footer-navlink-${link.text}`}>
                    <Link className="hover:text-red" href={link.href}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-white text-xl font-bold">
                {footerText[language].sections.editorial}
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-2 items-center">
                  <CiLocationOn className="size-5 shrink-0" /> {address}
                </li>
                <li className="flex gap-2 items-center max-[540px]:text-[12px]">
                  <MdOutlineEmail className="size-5 shrink-0" /> {email}
                </li>
                <li className="flex gap-2 items-center">
                  <IoCallOutline className="size-5 shrink-0" />{" "}
                  {telephoneNumber}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="text-white text-xl font-bold">
              {footerText[language].sections.subscribe}
            </p>
            <div className="flex gap-3 items-center">
              <Button variant="footerSocialMedua">
                <RiTelegram2Line />
                Telegram
              </Button>
              <Button variant="footerSocialMedua">
                <FaInstagram />
                Instagram
              </Button>
            </div>
            <Button variant="footerWhatsapp">
              {footerText[language].buttonText}
            </Button>
          </div>
        </div>
        <div className="min-h-[49px] p-4 flex justify-between">
          <p> {footerText[language].privacyPolicy}</p>
        </div>
      </div>
    </footer>
  );
}
