import { NextResponse } from "next/server";
import weatherApi from "@/service/WeatherApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("search_query") || "";

  try {
    const results = await weatherApi.getCities(searchQuery);

    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "An error occurred while fetching cities" },
        { status: 500 }
      );
    }
  }
}
