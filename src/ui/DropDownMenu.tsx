"use client";

import { IoIosArrowDown } from "react-icons/io";
import { ReactNode, useState } from "react";

type DropDownMenuProps = {
  className?: string;
  children: ReactNode;
  list: string[];
};

const base =
  "relative pointer-cursor flex items-center gap-4 rounded-[10x] px-4 py-2";

export function DropDownMenu({
  className = "",
  children,
  list,
}: DropDownMenuProps) {
  const [state, setState] = useState(false);

  return (
    <div onClick={() => setState((prev) => !prev)} className={`${className}`}>
      <ul>{children}</ul>;
      {state && (
        <div>
          {list.map((element) => (
            <li key={element}>{element}</li>
          ))}
        </div>
      )}
      <IoIosArrowDown className="absolute left-0 top-[50%]" />
    </div>
  );
}
