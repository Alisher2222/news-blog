"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import type { CurrencyStatus, Language } from "@/src/types";
import { getWeatherDescription } from "@/src/utils/weather";

const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour

type WeatherData = {
  sign: "+" | "-";
  value: number;
  code: number;
};

type MarketInfoProps = {
  cityName: string;
  language: Language;
};

// Re-derive each currency's trend by comparing the fresh value to the one we
// were already displaying. The first load has nothing to compare against, so we
// default to "rising".
function withTrend(
  next: { name: CurrencyStatus["name"]; value: number }[],
  previous: CurrencyStatus[],
): CurrencyStatus[] {
  return next.map((currency) => {
    const prior = previous.find((item) => item.name === currency.name);
    const trend: CurrencyStatus["trend"] =
      !prior || currency.value >= prior.value ? "rising" : "falling";
    return { name: currency.name, value: currency.value, trend };
  });
}

export function MarketInfo({ cityName, language }: MarketInfoProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyStatus[]>([]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [weatherRes, ratesRes] = await Promise.all([
          fetch("/api/weather"),
          fetch("/api/exchange-rates"),
        ]);

        if (active && weatherRes.ok) {
          const data = await weatherRes.json();
          if (typeof data?.value === "number") {
            setWeather({
              sign: data.sign === "-" ? "-" : "+",
              value: data.value,
              code: typeof data.code === "number" ? data.code : 3,
            });
          }
        }

        if (active && ratesRes.ok) {
          const data = await ratesRes.json();
          if (Array.isArray(data?.currencies)) {
            setCurrencies((prev) => withTrend(data.currencies, prev));
          }
        }
      } catch (error) {
        console.error("[MarketInfo] failed to refresh", error);
      }
    }

    load();
    const id = setInterval(load, REFRESH_INTERVAL);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex gap-2.5">
      <p className="uppercase font-bold">{cityName}</p>
      <p>
        {weather ? (
          <>
            {weather.sign}
            {weather.value}°C
            <span className="max-[460px]:hidden">
              , {getWeatherDescription(weather.code, language)}
            </span>
          </>
        ) : (
          "…"
        )}
      </p>
      <div className="hidden lg:flex gap-4">
        {currencies.map((currency) => (
          <p
            className="flex gap-2 items-center border-l-1 border-gray-border pl-3"
            key={`currency-${currency.name}`}
          >
            <strong>{currency.name}</strong>
            {currency.value}
            {currency.trend === "rising" ? (
              <FaArrowTrendUp className="text-green-600" />
            ) : (
              <FaArrowTrendDown className="text-red" />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
