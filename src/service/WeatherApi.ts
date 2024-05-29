import HttpClient from "./HttpClient";
import {
  CityResultDTO,
  BasicWeather,
  BasicWeatherDTO,
  DetailedWeather,
  DetailedWeatherDTO,
  ForecastWeather,
  CityResult,
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
  static getCities = async (searchQuery: string): Promise<CityResult[]> => {
    if (searchQuery) {
      try {
        const url = `${baseUrl}/search.json?q=${searchQuery}`;

        const results = await HttpClient.get<CityResultDTO[]>(url, options);

        return results.map(({ id, name, region }) => ({
          id,
          name: `${name}, ${region}`,
        }));
      } catch (error) {
        throw new Error("Failed to fetch cities");
      }
    }
    return [];
  };

  static getWeather = async (cityId: string): Promise<BasicWeather> => {
    const url = `${baseUrl}/current.json?q=${cityId}`;
    try {
      const result = await HttpClient.get<BasicWeatherDTO>(url, options);

      const basicWeather = formatBasicWeather(result);
      return basicWeather;
    } catch (error) {
      throw new Error("Failed to fetch current weather");
    }
  };

  static getDetailedWeather = async (
    cityId: string,
    currentDate: string,
    days: number = 5
  ): Promise<DetailedWeather> => {
    try {
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
    } catch (error) {
      throw new Error("Failed to fetch detailed weather");
    }
  };

  static getFavorites = async (cityIds: string[]): Promise<BasicWeather[]> => {
    try {
      const promises = cityIds.map((cityId) => this.getWeather(cityId));

      const results = await Promise.all(promises);

      return results;
    } catch (error) {
      throw new Error("Failed to retrieve favorites");
    }
  };
}

export default WeatherApi;
