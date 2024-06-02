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
} from "./weather.utils";
import { createFutureDateString } from "@/utils";
import weatherApiClient from "./weather.client";

class WeatherService {
  async getCities(searchQuery: string): Promise<CityResult[]> {
    const results = await weatherApiClient.getCities<CityResultDTO[]>(
      searchQuery
    );

    return results.map(({ id, name, region }) => ({
      id,
      name: `${name}, ${region}`,
    }));
  }

  async getWeather(cityId: string): Promise<BasicWeather> {
    const result = await weatherApiClient.getWeather<BasicWeatherDTO>(cityId);

    const basicWeather = formatBasicWeather(result);
    return basicWeather;
  }

  async getDetailedWeather(
    cityId: string,
    currentDate: string,
    days: number = 5
  ): Promise<DetailedWeather> {
    const promises = [];

    for (let index = 1; index <= days; index += 1) {
      const futureDate = createFutureDateString(currentDate, index);

      promises.push(
        weatherApiClient.getDetailedWeather<DetailedWeatherDTO>(
          cityId,
          futureDate
        )
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
  }

  async getFavorites(cityIds: string[]): Promise<BasicWeather[]> {
    const promises = cityIds.map((cityId) => this.getWeather(cityId));

    const results = await Promise.all(promises);

    return results;
  }
}

const weatherService = new WeatherService();
export default weatherService;
