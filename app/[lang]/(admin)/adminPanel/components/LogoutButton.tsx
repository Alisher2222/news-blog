"use client";

import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { Button } from "@/src/ui/Button";
import type { Language } from "@/src/types";

type LogoutButtonProps = {
  lang: Language;
};

export function LogoutButton({ lang }: LogoutButtonProps) {
  return (
    <Button
      type="button"
      onClick={() => signOut({ callbackUrl: `/${lang}/authorizePage` })}
      className="h-fit p-3 border-1 rounded-[10px] border-gray-border text-deep-blue flex gap-2 items-center hover:bg-red-100 hover:text-red hover:border-red transition-all duration-200"
    >
      <CiLogout />
      Log out
    </Button>
  );
}
