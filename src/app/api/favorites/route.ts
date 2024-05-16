import WeatherApiMock from "@/mock/WeatherApiMock";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityIds = searchParams.get("ids") || "";
  //const results = await WeatherApiMock.getFavorites(cityIds);
  const results = await WeatherApi.getFavorites(cityIds.split(","));

  return Response.json(results);
}
