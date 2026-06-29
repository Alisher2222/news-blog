import { ReactNode } from "react";
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";
import { Suspense } from "react";
import LanguageSwitcher from "@/src/ui/LanguageSwitcher";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "./components/LogoutButton";
import { getRouteLanguage } from "@/src/utils/routeParams";

export default async function AdminPanelLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: routeLang } = await params;
  const lang = getRouteLanguage(routeLang);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${lang}/authorizePage`);
  }

  return (
    <section>
      <header className="bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={`/${lang}/adminPanel`}>
            <div className="flex items-center gap-2 p-4">
              <div className=" bg-deep-blue rounded-[10px] p-3 text-white">
                <FaRegNewspaper size={25} />
              </div>
              <h1 className="text-deep-blue font-bold text-xl">
                Admin Workspace
              </h1>
            </div>
          </Link>
          <div className="flex gap-5">
            <Suspense
              fallback={<div className="w-20 h-8 bg-gray-100 animate-pulse" />}
            >
              <LanguageSwitcher />
            </Suspense>
            <LogoutButton lang={lang} />
          </div>
        </div>
      </header>
      {children}
    </section>
  );
}
