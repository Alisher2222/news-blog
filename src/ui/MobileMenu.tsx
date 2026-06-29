"use client";

import { IoIosClose } from "react-icons/io";
import { navLinks } from "@/src/locales/dictionary";
import { Language } from "@/src/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "./Logo";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const menuVariants = {
  hidden: {
    x: "200%",
    opacity: 0,
  },
  visible: {
    x: "0%",
    opacity: 1,
  },
};

type MobileMenuType = {
  language: Language;
  isVisible: boolean;
  onClose: () => void;
  cityName: string;
};

export default function MobileMenu({
  isVisible,
  onClose,
  language,
  cityName,
}: MobileMenuType) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="w-screen h-screen fixed right-0 top-0 bg-gray-50 z-50">
          <motion.nav
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="container mx-auto px-5 h-full flex items-center flex-col relative py-5"
          >
            <Logo language={language} cityName={cityName} variant="dark" />
            <hr className="w-full border-1 border-gray-border my-4" />
            <ul className="uppercase text-deep-blue text-lg  w-full font-extrabold">
              {navLinks[language].map((link, index) => (
                <Link
                  className="hover:text-red"
                  href={link.href}
                  key={`mobileMenu-${index}`}
                  onClick={onClose}
                >
                  <li
                    className="h-20 hover:text-red cursor-pointer flex items-center justify-between"
                    key={`header-navlink-${link.text}`}
                  >
                    {link.text}
                    <MdOutlineKeyboardArrowRight className="size-10" />
                  </li>
                </Link>
              ))}
            </ul>
            <button
              className="absolute right-4 top-4 cursor-pointer"
              onClick={onClose}
            >
              <IoIosClose className="text-black size-10" />
            </button>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
