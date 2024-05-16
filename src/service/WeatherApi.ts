import HttpClient from "./HttpClient";
import { CityResultDTO, BasicWeather, BasicWeatherDTO } from "@/types";
import { formatBasicWeather, formatDetailedWeather } from "./weatherApi.utils";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
    "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
  },
};

const baseUrl = "https://weatherapi-com.p.rapidapi.com";

class WeatherApi {
  static getCities = async (
    searchTerm: string
  ): Promise<Error | CityResultDTO[]> => {
    if (searchTerm) {
      const url = `${baseUrl}/search.json?q=${searchTerm}`;

      const results = await HttpClient.get<CityResultDTO[]>(url, options);

      return results.map((result) => ({
        ...result,
        name: `${result.name}, ${result.region}`,
      }));
    }

    return [];
  };

  static getWeather = async (cityId: string): Promise<Error | BasicWeather> => {
    const url = `${baseUrl}/current.json?q=${cityId}`;
    const result = await HttpClient.get<BasicWeatherDTO>(url, options);

    const basicWeather = formatBasicWeather(result);
    return basicWeather;
  };

  static getDetailedWeather = async (
    cityId: string,
    days: number = 3
  ): Promise<Error | BasicWeather> => {
    const url = `${baseUrl}/forecast.json?q=${cityId}&days=${days}`;

    const results = await HttpClient.get<any>(url, options);

    const detailedWeather = formatDetailedWeather(cityId, results);

    return detailedWeather;
  };

  static getFavorites = async (
    cityIds: string[]
  ): Promise<(Error | BasicWeather)[]> => {
    const promises = cityIds.map((cityId) => this.getWeather(cityId));

    const results = await Promise.all(promises);

    return results;
  };
}

export default WeatherApi;
