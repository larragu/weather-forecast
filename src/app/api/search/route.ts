import { getCities } from "@/service/weather.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const results = await getCities(request);

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
