import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/src/layout/TopBar";
import { Header } from "@/src/layout/Header";
import { Footer } from "@/src/layout/Footer";
import { MarqueeComponent } from "@/src/layout/Marquee";
import { Language } from "@/src/types";

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
  params: Promise<{ lang: Language }>;
}>) {
  const { lang } = await params;
  const newsData = [
    "В столице запустили 5 новых автобусных маршрутов в развивающиеся микрорайоны",
    "Казахстанские спортсмены завоевали две золотые медали на международном турнире",
    "Завтра в городе ожидается усиление ветра до 20 м/с, МЧС просит жителей быть осторожными",
    "В эти выходные в центральном парке пройдет благотворительный этно-фестиваль",
    "Национальный музей открывает уникальную выставку редких исторических артефактов",
  ];
  const email = "alisherasanov@gmail.com";
  const telephoneNumber = "8 (775) 767 36-83";
  const address = "пр. Мәңгілік Ел, 8, Астана, Казахстан";
  return (
    <html lang="ru" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TopBar
          language={lang}
          cityName="Astana"
          weather={{ sign: "+", value: 18, description: "норм короче" }}
          currencies={[
            { name: "EUR", value: 465, trend: "rising" },
            { name: "USD", value: 465.05, trend: "falling" },
          ]}
        />
        <Header cityName="Astana" language={lang} />
        <MarqueeComponent data={newsData} time="13:32" language={lang} />
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <Footer
          language={lang}
          cityName="Astana"
          telephoneNumber={telephoneNumber}
          email={email}
          address={address}
        />
      </body>
    </html>
  );
}
