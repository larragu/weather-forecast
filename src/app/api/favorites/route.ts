import { NextResponse } from "next/server";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityIds = searchParams.get("ids") || "";

  const results = await WeatherApi.getFavorites(cityIds.split(","));

  return NextResponse.json(results);
}
