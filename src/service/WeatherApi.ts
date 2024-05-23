import HttpClient from "./HttpClient";
import {
  CityResultDTO,
  BasicWeather,
  BasicWeatherDTO,
  DetailedWeather,
  DetailedWeatherDTO,
  ForecastWeather,
} from "@/types";
import {
  formatBasicWeather,
  formatDetailedWeather,
  formatForecast,
} from "./weatherApi.utils";
import { createFutureDateString } from "@/utils";

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
    searchQuery: string
  ): Promise<Error | CityResultDTO[]> => {
    if (searchQuery) {
      const url = `${baseUrl}/search.json?q=${searchQuery}`;

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
    currentDate: string,
    days: number = 5
  ): Promise<Error | DetailedWeather> => {
    const promises = [];
    for (let index = 1; index <= days; index += 1) {
      const futureDate = createFutureDateString(currentDate, index);

      const url = `${baseUrl}/forecast.json?q=${cityId}&dt=${futureDate}`;

      promises.push(HttpClient.get<DetailedWeatherDTO>(url, options));
    }

    const details = await Promise.all(promises);
    let formattedForecasts: ForecastWeather[] = [];
    let formattedDetails = formatDetailedWeather(cityId, details[0]);

    details.forEach((detail) => {
      const newForecast = formatForecast(detail.forecast);
      if (newForecast) {
        formattedForecasts.push(newForecast[0]);
      }
    });

    const detailedWeather = {
      ...formattedDetails,
      forecast: formattedForecasts,
    };

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
