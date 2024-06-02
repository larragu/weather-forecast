import { NextResponse } from "next/server";
import weatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("id") || "";

  try {
    const results = await weatherApi.getWeather(cityId);

    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message:
            error.message ||
            "An error occurred while fetching the current weather",
        },
        { status: 500 }
      );
    }
  }
}
