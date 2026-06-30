"use client";

import Link from "next/link";
import { Logo } from "../ui/Logo";
import { navLinks } from "@/src/locales/dictionary";
import { Language } from "@/src/types";
import { CiMenuBurger } from "react-icons/ci";
import MobileMenu from "../ui/MobileMenu";
import { Suspense, useState } from "react";
import LanguageSwitcher from "../ui/LanguageSwitcher";

type HeaderProps = {
  cityName: string;
  language: Language;
};

export function Header({ cityName, language }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <header className="bg-white min-h-19 flex items-center px-5 sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Logo language={language} cityName={cityName} variant="dark" />
        <nav className="hidden 2xl:block">
          <ul className="flex h-full  gap-8 uppercase text-deep-blue text-xl">
            {navLinks[language].map((link) => (
              <li
                className="h-full hover:text-red"
                key={`header-navlink-${link.text}`}
              >
                <Link className="hover:text-red" href={link.href}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-5">
          <Suspense
            fallback={<div className="w-20 h-8 bg-gray-100 animate-pulse" />}
          >
            <LanguageSwitcher />
          </Suspense>
          <button
            className="block cursor-pointer 2xl:hidden"
            onClick={() => setIsVisible(true)}
          >
            <CiMenuBurger className="text-black size-8" />
          </button>
        </div>
      </div>
      <MobileMenu
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        language={language}
        cityName={cityName}
      />
    </header>
  );
}
