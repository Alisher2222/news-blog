import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { TopBar } from "@/src/layout/TopBar";
import { Header } from "@/src/layout/Header";
import { Footer } from "@/src/layout/Footer";
import { MarqueeComponent } from "@/src/layout/Marquee";
import { getRouteLanguage } from "@/src/utils/routeParams";
import { getRecentPosts } from "@/db/post";
import { PostType } from "@/src/types";
import { constantValue } from "@/src/locales/dictionary";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["cyrillic-ext", "latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Городской Новостной Портал",
  description: "Все новости города в одном месте",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: routeLang } = await params;
  const lang = getRouteLanguage(routeLang);
  const newsData = (await getRecentPosts(5)) as unknown as PostType[];

  return (
    <html lang={lang} className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TopBar language={lang} cityName={constantValue.cityName} />
        <Header cityName={constantValue.cityName} language={lang} />
        <MarqueeComponent
          data={newsData.map((news) => news.title?.[lang])}
          time="13:32"
          language={lang}
        />
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <Footer
          language={lang}
          cityName={constantValue.cityName}
          telephoneNumber={constantValue.telephoneNumber}
          email={constantValue.email}
          address={constantValue.address}
        />
        <Analytics />
      </body>
    </html>
  );
}
