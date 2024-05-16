import { FORECAST_DAYS } from "@/constants";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

  const result = await WeatherApi.getDetailedWeather(id, FORECAST_DAYS);

  return Response.json(result);
}
