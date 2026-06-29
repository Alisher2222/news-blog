import { getRouteLanguage } from "@/src/utils/routeParams";
import { ReactNode } from "react";
import "@/app/[lang]/globals.css";

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: routeLang } = await params;
  const lang = getRouteLanguage(routeLang);

  return (
    <html lang={lang}>
      <body>
        <main className="bg-[#F1F5F9] container mx-auto mt-1 my-5 flex justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
