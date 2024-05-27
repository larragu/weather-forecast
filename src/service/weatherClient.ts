import HttpClient from "./HttpClient";
import { CityResultDTO, DetailedWeather, BasicWeather } from "@/types";

const getCities = async (
  searchQuery: string,
  signal: AbortSignal
): Promise<CityResultDTO[]> => {
  try {
    const url = `/api/search?search_query=${searchQuery}`;
    const results = await HttpClient.get<CityResultDTO[]>(url, { signal });
    return results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return [];
};

const getWeather = async (cityName: string): Promise<BasicWeather> => {
  const url = `/api/cities?id=${cityName}`;
  const results = await HttpClient.get<BasicWeather>(url);

  return results;
};

const getDetailedWeather = async (
  cityId: string,
  currentDate: string,
  days: number = 3
): Promise<DetailedWeather> => {
  const url = `/api/details/?id=${cityId}&current_date=${currentDate}&days=${days}`;
  const result = await HttpClient.get<DetailedWeather>(url);

  return result;
};

const getFavorites = async (ids: string[]): Promise<BasicWeather[]> => {
  const url = `/api/favorites?ids=${ids}`;
  const results = await HttpClient.get<BasicWeather[]>(url);

  return results;
};

export { getCities, getWeather, getDetailedWeather, getFavorites };
