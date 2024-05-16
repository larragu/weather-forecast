import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") || "";

  const results = await WeatherApi.getCities(searchTerm);

  return Response.json(results);
}
