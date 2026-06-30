"use client";
import Link from "next/link";
import { SideBarElementType } from "@/src/types";
import { useEffect, useState } from "react";

export function SideBarElement({ date, title, link }: SideBarElementType) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncate = (str: string, limit: number) => {
    if (width >= 1024) {
      return str.length > limit ? str.slice(0, limit) + "..." : str;
    }

    return str;
  };

  return (
    <li className="group flex w-full items-center border-y border-gray-border">
      <Link href={link} className="flex w-full items-center gap-4">
        <p className="w-[30%] lg:w-[55%] border-l border-gray-border text-gray-text group-hover:text-red lg:max-xl:hidden">
          {date}
        </p>

        <p className="flex-1 min-w-0 text-deep-blue group-hover:text-red">
          {truncate(title, 25)}
        </p>
      </Link>
    </li>
  );
}
