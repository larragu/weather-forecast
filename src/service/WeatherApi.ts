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
};

const baseUrl = "https://weatherapi-com.p.rapidapi.com";

class WeatherApi {
  headers: { "X-RapidAPI-Key": string; "X-RapidAPI-Host": string };
  constructor(apiKey: string, apiHost: string) {
    this.headers = { "X-RapidAPI-Key": apiKey, "X-RapidAPI-Host": apiHost };
  }
  async getCities(searchQuery: string): Promise<CityResult[]> {
    if (searchQuery) {
      try {
        const url = `${baseUrl}/search.json?q=${searchQuery}`;

        const results = await HttpClient.get<CityResultDTO[]>(url, {
          ...options,
          ...this.headers,
        });

        return results.map(({ id, name, region }) => ({
          id,
          name: `${name}, ${region}`,
        }));
      } catch (error) {
        throw new Error("Failed to fetch cities");
      }
    }
    return [];
  }

  async getWeather(cityId: string): Promise<BasicWeather> {
    const url = `${baseUrl}/current.json?q=${cityId}`;
    try {
      const result = await HttpClient.get<BasicWeatherDTO>(url, {
        ...options,
        ...this.headers,
      });

      const basicWeather = formatBasicWeather(result);
      return basicWeather;
    } catch (error) {
      throw new Error("Failed to fetch current weather");
    }
  }

  async getDetailedWeather(
    cityId: string,
    currentDate: string,
    days: number = 5
  ): Promise<DetailedWeather> {
    try {
      const promises = [];

      for (let index = 1; index <= days; index += 1) {
        const futureDate = createFutureDateString(currentDate, index);

        const url = `${baseUrl}/forecast.json?q=${cityId}&dt=${futureDate}`;

        promises.push(
          HttpClient.get<DetailedWeatherDTO>(url, {
            ...options,
            ...this.headers,
          })
        );
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
  }

  async getFavorites(cityIds: string[]): Promise<BasicWeather[]> {
    try {
      const promises = cityIds.map((cityId) => this.getWeather(cityId));

      const results = await Promise.all(promises);

      return results;
    } catch (error) {
      throw new Error("Failed to retrieve favorites");
    }
  }
}

const weatherApiService = new WeatherApi(
  process.env.X_RapidAPI_Key || "",
  process.env.X_RapidAPI_Host || ""
);
export default weatherApiService;
