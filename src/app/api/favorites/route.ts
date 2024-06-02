import { getFavorites } from "@/service/weather.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const results = await getFavorites(request);
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
