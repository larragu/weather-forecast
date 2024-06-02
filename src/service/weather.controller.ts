import { BasicWeather, CityResult, DetailedWeather } from "@/types";
import weatherService from "./weather.service";

const getCities = async (request: Request): Promise<CityResult[]> => {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("search_query") || "";

  if (searchQuery) {
    try {
      const results = await weatherService.getCities(searchQuery);
      return results;
    } catch (error) {
      throw new Error("Failed to fetch cities");
    }
  }
  return [];
};

const getWeather = async (request: Request): Promise<BasicWeather> => {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("id") || "";

  try {
    const result = await weatherService.getWeather(cityId);

    return result;
  } catch (error) {
    throw new Error("Failed to fetch current weather");
  }
};

const getDetailedWeather = async (
  request: Request
): Promise<DetailedWeather | {}> => {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("id") || "";
  const currentDate = searchParams.get("current_date") || "";
  const days = searchParams.get("days") || "";

  let result = {};

  if (cityId && currentDate) {
    try {
      const result = await weatherService.getDetailedWeather(
        cityId,
        currentDate,
        Number(days)
      );

      return result;
    } catch (error) {
      throw new Error("Failed to fetch detailed weather");
    }
  }
  return result;
};

const getFavorites = async (request: Request): Promise<BasicWeather[]> => {
  const { searchParams } = new URL(request.url);
  const cityIds = searchParams.get("ids") || "";

  try {
    const results = await weatherService.getFavorites(cityIds.split(","));

    return results;
  } catch (error) {
    throw new Error("Failed to retrieve favorites");
  }
};

export { getCities, getWeather, getDetailedWeather, getFavorites };
