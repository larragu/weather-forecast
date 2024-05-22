import HttpClient from "./HttpClient";
import { CityResultDTO, DetailedWeather, BasicWeather } from "@/types";

const getCities = async (searchTerm: string): Promise<CityResultDTO[]> => {
  const url = `/api/search?searchTerm=${searchTerm}`;

  const results = await HttpClient.get<CityResultDTO[]>(url);
  return results;
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
