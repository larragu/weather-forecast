import WeatherApiMock from "@/mock/WeatherApiMock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") || "";
  console.log("searchTerm: ", searchTerm);

  const results = await WeatherApiMock.getCities(searchTerm);

  return Response.json(results);
}
