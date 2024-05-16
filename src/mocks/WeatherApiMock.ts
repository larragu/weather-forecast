import { CityResultDTO, DetailedWeather, BasicWeather } from "@/types";
import {
  cityResults,
  exampleDetailedCity,
  exampleSelectedCity,
} from "./weatherResponse";
import {
  formatBasicWeather,
  formatDetailedWeather,
} from "@/service/weatherApi.utils";

const LATENCY_MS = 300;

let getCitiesDebounceTimer: ReturnType<typeof setTimeout> | null = null;

class WeatherApiMock {
  static getCities = async (searchTerm: string): Promise<CityResultDTO[]> => {
    if (getCitiesDebounceTimer !== null) {
      clearTimeout(getCitiesDebounceTimer);
    }

    const results = await new Promise<CityResultDTO[]>((resolve) => {
      getCitiesDebounceTimer = setTimeout(() => {
        const cityList = cityResults.filter((city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

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
    console.log("exampleDetailedCity.forecast: ", exampleDetailedCity.forecast);
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
