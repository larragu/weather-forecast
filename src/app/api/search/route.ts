import { NextResponse } from "next/server";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("search_query") || "";

  const results = await WeatherApi.getCities(searchQuery);

  return NextResponse.json(results);
}
