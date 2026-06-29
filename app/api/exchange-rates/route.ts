// KZT exchange rates for the TopBar ticker.
// Source: open.er-api.com (free, no API key). We request rates with KZT as the
// base, then invert to show how many tenge are in 1 USD / 1 EUR (e.g. "USD 505").
// The upstream call is cached for an hour so the rate is refreshed hourly.

const RATES_URL = "https://open.er-api.com/v6/latest/KZT";

const round = (value: number) => Math.round(value * 100) / 100;

export async function GET() {
  try {
    const response = await fetch(RATES_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Upstream responded with ${response.status}`);
    }

    const data = await response.json();
    const rates = data?.rates ?? {};

    const usdPerKzt = rates.USD;
    const eurPerKzt = rates.EUR;

    if (typeof usdPerKzt !== "number" || typeof eurPerKzt !== "number") {
      throw new Error("Missing USD/EUR rates in upstream response");
    }

    return Response.json({
      base: "KZT",
      updatedAt: data?.time_last_update_utc ?? null,
      currencies: [
        { name: "USD", value: round(1 / usdPerKzt) },
        { name: "EUR", value: round(1 / eurPerKzt) },
      ],
    });
  } catch (error) {
    console.error("[exchange-rates]", error);
    return Response.json(
      { error: "Failed to load exchange rates" },
      { status: 502 },
    );
  }
}
