import { NextResponse } from "next/server";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  const currentDate = searchParams.get("current_date") || "";

  const days = searchParams.get("days") || "";

  let result = {};
  if (id && currentDate) {
    result = await WeatherApi.getDetailedWeather(id, currentDate, Number(days));
  }

  return NextResponse.json(result);
}
