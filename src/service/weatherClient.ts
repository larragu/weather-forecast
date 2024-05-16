import HttpClient from "./HttpClient";
import { CityResult, DescriptiveWeather, SelectedCity } from "@/types";

const BASE_PATH = process.env.BASE_PATH;

const getCities = async (searchTerm: string): Promise<CityResult[]> => {
  const url = `/search/api/?searchTerm=${searchTerm}`;

  const results = await HttpClient.get<CityResult[]>(url);
  return results;
};

const getWeather = async (cityName: string): Promise<SelectedCity> => {
  const url = `/api/cities?id=${cityName}`;
  const results = await HttpClient.get<SelectedCity>(url);

  return results;
};

const getDescriptiveWeather = async (
  cityId: string,
  days: number = 3
): Promise<DescriptiveWeather> => {
  console.log("process.env.BASE_PATH: ", process.env.BASE_PATH);
  const url = `${BASE_PATH}/details/api/?id=${cityId}&days=${days}`;
  const result = await HttpClient.get<DescriptiveWeather>(url);
  console.log("result.id foo: ", result.id);
  return result;
};

const getFavorites = async (ids: string[]): Promise<SelectedCity[]> => {
  const url = `/api/favorites?ids=${ids}`;
  const results = await HttpClient.get<SelectedCity[]>(url);

  return results;
};

export { getCities, getWeather, getDescriptiveWeather, getFavorites };
