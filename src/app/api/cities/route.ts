import WeatherApiMock from "@/mock/WeatherApiMock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("id") || "";
  console.log("search term city id: ", cityId);
  const results = await WeatherApiMock.getWeather(cityId);

  return Response.json(results);
}
