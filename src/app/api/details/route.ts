import { NextResponse } from "next/server";
import weatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  const currentDate = searchParams.get("current_date") || "";

  const days = searchParams.get("days") || "";

  let result = {};
  if (id && currentDate) {
    try {
      result = await weatherApi.getDetailedWeather(
        id,
        currentDate,
        Number(days)
      );
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          {
            message:
              error.message ||
              "An error occurred while fetching detailed weather",
          },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json(result);
}
