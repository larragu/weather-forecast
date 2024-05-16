import WeatherApiMock from "@/mock/WeatherApiMock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityIds = searchParams.get("ids") || "";
  console.log("favorite cityIds: ", cityIds);
  const results = await WeatherApiMock.getFavorites(cityIds);

  return Response.json(results);
}
