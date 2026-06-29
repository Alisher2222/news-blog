import { Language } from "@/src/types";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaRegNewspaper } from "react-icons/fa";
import { getRouteLanguage } from "@/src/utils/routeParams";

export default async function AuthorizePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: routeLang } = await params;
  const lang: Language = getRouteLanguage(routeLang);
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/${lang}/adminPanel`);
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="bg-deep-blue flex flex-col items-center px-8 py-12 text-white text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10">
          <FaRegNewspaper size={48} />
        </div>
        <h1 className="text-xl font-bold uppercase">
          Oskemen News <span className="text-red-500">•</span> Admin
        </h1>
      </div>
      <div className="p-10">
        <LoginForm lang={lang} />

        <div className=" mt-10 border-t pt-6 text-center text-sm text-gray-400">
          Доступ только по приглашению. Система закрытого типа.
        </div>
      </div>
    </div>
  );
}
