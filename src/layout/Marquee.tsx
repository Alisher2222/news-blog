import { Language } from "@/src/types";
import Marquee from "react-fast-marquee";

export function MarqueeComponent({
  data,
  time,
  language,
}: {
  data: string[];
  time: string;
  language: Language;
}) {
  return (
    <div className="bg-white border-y-1 border-gray-border py-1.5 px-4">
      <div className="container mx-auto flex items-center gap-4">
        <div className=" bg-red uppercase text-white flex items-center h-fit rounded-[5px] px-3 py-1">
          {language === "ru"
            ? "Срочно"
            : language === "kk"
              ? "Шұғыл"
              : "Urgent"}
        </div>
        <Marquee speed={120} pauseOnHover>
          {data.map((line, index) => (
            <p
              key={`Marquee-${index}`}
              className="text-deep-blue px-8 font-medium flex items-center gap-5"
            >
              <span>{line}</span>
            </p>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
