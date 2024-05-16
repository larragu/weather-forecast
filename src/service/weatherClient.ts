import HttpClient from "./HttpClient";
import { CityResultDTO, DetailedWeather, BasicWeather } from "@/types";

const BASE_PATH = process.env.BASE_PATH;

const getCities = async (searchTerm: string): Promise<CityResultDTO[]> => {
  const url = `/search/api/?searchTerm=${searchTerm}`;

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
  days: number = 3
): Promise<DetailedWeather> => {
  console.log("process.env.BASE_PATH: ", process.env.BASE_PATH);
  const url = `${BASE_PATH}/details/api/?id=${cityId}&days=${days}`;
  const result = await HttpClient.get<DetailedWeather>(url);
  console.log("result.id foo: ", result.id);
  return result;
};

const getFavorites = async (ids: string[]): Promise<BasicWeather[]> => {
  const url = `/api/favorites?ids=${ids}`;
  const results = await HttpClient.get<BasicWeather[]>(url);

  return results;
};

export { getCities, getWeather, getDetailedWeather, getFavorites };
