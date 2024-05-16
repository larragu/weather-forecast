import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("id") || "";

  const results = await WeatherApi.getWeather(cityId);

  return Response.json(results);
}
