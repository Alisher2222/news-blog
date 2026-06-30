"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { navLinks } from "@/src/locales/dictionary";
import { Language } from "@/src/types";
import { Logo } from "./Logo";

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const menuVariants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
};

type MobileMenuProps = {
  language: Language;
  isVisible: boolean;
  onClose: () => void;
  cityName: string;
};

export default function MobileMenu({
  language,
  isVisible,
  onClose,
  cityName,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        >
          <motion.nav
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full bg-gray-50 md:w-[420px]"
          >
            <div className="container mx-auto flex h-full flex-col px-5 py-5">
              <div className="flex items-center justify-between">
                <Logo language={language} cityName={cityName} variant="dark" />

                <button
                  onClick={onClose}
                  className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-200"
                >
                  <IoIosClose className="size-10 text-black" />
                </button>
              </div>

              <hr className="my-5 border-gray-border" />

              <ul className="w-full flex-1 uppercase text-lg font-extrabold text-deep-blue">
                {navLinks[language].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex h-20 items-center justify-between border-b border-gray-border transition-colors duration-200 hover:text-red"
                    >
                      <span>{link.text}</span>

                      <MdOutlineKeyboardArrowRight className="size-8 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
