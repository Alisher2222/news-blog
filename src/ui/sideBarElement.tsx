"use client";
import Link from "next/link";
import { SideBarElementType } from "@/src/types";

export function SideBarElement({ date, title, link }: SideBarElementType) {
  return (
    <li className="group border-y-1 border-gray-border h-[30px] lg:h-[85px] flex items-center">
      <Link href={link} className="flex items-center gap-4">
        <p className="text-gray-text border-l-1 border-gray-border group-hover:text-red">
          {date}
        </p>
        <p className=" text-deep-blue group-hover:text-red">{title}</p>
      </Link>
    </li>
  );
}
