import { NextRequest, NextResponse } from "next/server";
import { Language } from "./src/types";

const languages: Language[] = ["en", "kk", "ru"];
const defaultLocale: Language = "kk";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMatch = languages.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );

  if (isMatch) return NextResponse.next();

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
