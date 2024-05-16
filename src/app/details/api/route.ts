import WeatherApiMock from "@/mock/WeatherApiMock";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  console.log("details id: ", id);

  //const result = await WeatherApiMock.getDescriptiveWeather(id, 3);
  const result = await WeatherApi.getDescriptiveWeather(id, 3);
  console.log("result HAHA: ", result);
  return Response.json(result);
}
