import { LuQuote } from "react-icons/lu";

export function Quote({ text }: { text: string }) {
  return (
    <section className="p-5 border-l-5 border-red w-full relative bg-white rounded-r-xl">
      <p className="font-heading italic text-deep-blue font-extrabold text-2xl">
        {text}
      </p>
      <LuQuote className="absolute left-5 -top-2.5 text-[#EEBBBC] size-7" />
    </section>
  );
}
