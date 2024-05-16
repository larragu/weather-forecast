import WeatherApiMock from "@/mock/WeatherApiMock";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("id") || "";
  console.log("search term city id222222: ", cityId);
  //const results = await WeatherApiMock.getWeather(cityId);
  const results = await WeatherApi.getWeather(cityId);

  return Response.json(results);
}
