import { NextResponse } from "next/server";
import WeatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityIds = searchParams.get("ids") || "";
  try {
    const results = await WeatherApi.getFavorites(cityIds.split(","));
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message:
            error.message || "An error occurred while fetching favorites",
        },
        { status: 500 }
      );
    }
  }
}
