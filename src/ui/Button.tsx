import type { ButtonHTMLAttributes, ReactNode } from "react";

const VARIANTS = {
  standard: "p-3 rounded-[10px] border-1 ",
  footerSocialMedua:
    "w-[50%] px-4 py-2 text-white rounded-[10px] border-1 border-gray-border hover:bg-white hover:text-deep-blue h-fit",
  footerWhatsapp:
    "bg-[#069668] w-full text-white rounded-[10px] px-4 py-2 hover:bg-[#047857] h-fit",
};

type ButtonProps = {
  variant?: keyof typeof VARIANTS;
  children?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base = "flex justify-center items-center gap-4 cursor-pointer ";

export function Button({
  children,
  variant = "standard",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${className} ${VARIANTS[variant]} ${base}`} {...props}>
      {children}
    </button>
  );
}
