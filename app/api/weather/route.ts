// Current weather for Öskemen (Ust-Kamenogorsk) shown on the TopBar.
// Source: Open-Meteo (free, no API key). The upstream call is cached for an hour.
// We return the WMO weather code and let the client localize the description.

// Öskemen coordinates.
const OSKEMEN = { latitude: 49.97, longitude: 82.61 };

const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${OSKEMEN.latitude}` +
  `&longitude=${OSKEMEN.longitude}&current=temperature_2m,weather_code`;

export async function GET() {
  try {
    const response = await fetch(WEATHER_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Upstream responded with ${response.status}`);
    }

    const data = await response.json();
    const temperature = data?.current?.temperature_2m;
    const code = data?.current?.weather_code;

    if (typeof temperature !== "number") {
      throw new Error("Missing temperature in upstream response");
    }

    const rounded = Math.round(temperature);

    return Response.json({
      sign: rounded < 0 ? "-" : "+",
      value: Math.abs(rounded),
      code: typeof code === "number" ? code : 3,
    });
  } catch (error) {
    console.error("[weather]", error);
    return Response.json({ error: "Failed to load weather" }, { status: 502 });
  }
}
