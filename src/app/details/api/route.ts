import WeatherApi from "@/mock/WeatherApiMock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  console.log("details id: ", id);

  const result = await WeatherApi.getDescriptiveWeather(id, 3);
  console.log("result: ", result);
  return Response.json(result);
}
