import { NextResponse } from "next/server";
import { getWeather } from "@/service/weather.controller";

export async function GET(request: Request) {
  try {
    const results = await getWeather(request);

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
