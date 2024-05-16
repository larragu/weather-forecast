import WeatherApiMock from "@/mock/WeatherApiMock";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") || "";
  console.log("searchTerm11111: ", searchTerm);

  //const results = await WeatherApiMock.getCities(searchTerm);

  const results = await WeatherApi.getCities(searchTerm);

  return Response.json(results);
}
