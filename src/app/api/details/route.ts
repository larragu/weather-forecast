import { getDetailedWeather } from "@/service/weather.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await getDetailedWeather(request);

    return NextResponse.json(result);
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
