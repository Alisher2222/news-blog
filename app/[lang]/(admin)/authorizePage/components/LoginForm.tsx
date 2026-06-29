"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/ui/Button";
import type { Language } from "@/src/types";

type LoginFormProps = {
  lang: Language;
};

export function LoginForm({ lang }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: `/${lang}/adminPanel`,
    });

    setIsSubmitting(false);

    if (!result?.ok) {
      setError("Неверные учетные данные. Попробуйте снова.");
      return;
    }

    router.replace(`/${lang}/adminPanel`);
    router.refresh();
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500"
        >
          Email
        </label>

        <div className="flex items-center rounded-2xl border border-gray-200 px-4">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@oskemennews.kz"
            autoComplete="email"
            required
            className="h-16 w-full text-black outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500"
        >
          Password
        </label>

        <div className="flex items-center rounded-2xl border border-gray-200 px-4">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="current-password"
            required
            className="h-16 w-full text-black outline-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-deep-blue mt-4 h-16 w-full rounded-2xl text-lg font-semibold uppercase text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign in to dashboard →"}
      </Button>
    </form>
  );
}
