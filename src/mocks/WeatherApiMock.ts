import { DetailedWeather, BasicWeather, CityResult } from "@/types";
import {
  cityResults,
  exampleDetailedCity,
  exampleSelectedCity,
} from "./weatherResponse";
import {
  formatBasicWeather,
  formatDetailedWeather,
} from "@/service/weather.utils";

const LATENCY_MS = 300;

let getCitiesDebounceTimer: ReturnType<typeof setTimeout> | null = null;

class WeatherApiMock {
  static getCities = async (searchQuery: string): Promise<CityResult[]> => {
    if (getCitiesDebounceTimer !== null) {
      clearTimeout(getCitiesDebounceTimer);
    }

    const results = await new Promise<CityResult[]>((resolve) => {
      getCitiesDebounceTimer = setTimeout(() => {
        const cityList = cityResults
          .filter((city) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(({ id, name, region }) => ({
            id,
            name: `${name}, ${region}`,
          }));

        resolve(cityList);
      }, LATENCY_MS);
    });
    return results;
  };

  static getWeather = async (cityId: string) => {
    const results = await new Promise<BasicWeather>((resolve) => {
      setTimeout(() => {
        const basicWeather = formatBasicWeather(exampleSelectedCity);

        resolve(basicWeather);
      }, LATENCY_MS);
    });

    return results;
  };

  static getDetailedWeather = async (cityId: string, _days: number) => {
    const results = await new Promise<DetailedWeather>((resolve) => {
      setTimeout(() => {
        const detailedCity = formatDetailedWeather(cityId, exampleDetailedCity);
        resolve(detailedCity);
      }, LATENCY_MS);
    });

    return results;
  };

  static getFavorites = async (cityIds: string[]) => {
    const results = await new Promise<BasicWeather[]>((resolve) => {
      setTimeout(() => {
        const selectedCities = cityIds.map((cityId) => this.getWeather(cityId));

        resolve(Promise.all(selectedCities));
      }, LATENCY_MS);
    });

    return results;
  };
}

export default WeatherApiMock;
