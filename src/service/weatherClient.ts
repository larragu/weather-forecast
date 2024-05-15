import HttpClient from "../app/utils/HttpClient";
import { CityResult, SelectedCity } from "../app/utils/weather.types";

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

const getDescriptiveWeather = async (cityId: string, days: number = 3) => {
  console.log("process.env.BASE_PATH: ", process.env.BASE_PATH);
  const url = `${BASE_PATH}/details/api/?id=${cityId}&days=${days}`;
  const results = await HttpClient.get(url);

  return results;
};

export { getCities, getWeather, getDescriptiveWeather };
