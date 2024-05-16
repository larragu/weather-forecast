import { CityResult, DetailedWeather, BasicWeather } from "@/types";
import {
  cityResults,
  exampleDetailedCity,
  exampleSelectedCity,
} from "./weatherResponse";

const LATENCY_MS = 300;

let getCitiesDebounceTimer: ReturnType<typeof setTimeout> | null = null;

class WeatherApiMock {
  static getCities = async (searchTerm: string): Promise<CityResult[]> => {
    if (getCitiesDebounceTimer !== null) {
      clearTimeout(getCitiesDebounceTimer);
    }

    const results = await new Promise<CityResult[]>((resolve) => {
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
        const selectedCity = {
          id: cityId,
          name: exampleSelectedCity.location.name,
          temperature: exampleSelectedCity.current.temp_c.toString(),
          weatherDescription: exampleSelectedCity.current.condition.text,
          humidity: exampleSelectedCity.current.humidity.toString(),
          windVelocity: exampleSelectedCity.current.wind_kph.toString(),
          climateIcon: exampleSelectedCity.current.condition.icon,
        };

        resolve(selectedCity);
      }, LATENCY_MS);
    });

    return results;
  };

  static getDetailedWeather = async (cityId: string, _days: number) => {
    console.log("exampleDetailedCity.forecast: ", exampleDetailedCity.forecast);
    const results = await new Promise<DetailedWeather>((resolve) => {
      const forecast = exampleDetailedCity.forecast;
      setTimeout(() => {
        const detailedCity = {
          id: cityId,
          name: exampleDetailedCity.location.name,
          temperature: exampleDetailedCity.current.temp_c.toString(),
          weatherDescription: exampleDetailedCity.current.condition.text,
          humidity: exampleDetailedCity.current.humidity.toString(),
          windVelocity: exampleDetailedCity.current.wind_kph.toString(),
          climateIcon: exampleDetailedCity.current.condition.icon,
          forecast: forecast.forecastday.map((forecastday, index) => {
            const { date, day } = forecastday;
            const { avgtemp_c, avghumidity, maxwind_mph, condition } = day;

            return {
              id: index.toString(),
              date: date,
              name: exampleDetailedCity.location.name,
              temperature: avgtemp_c.toString(),
              weatherDescription: "",
              humidity: avghumidity.toString(),
              windVelocity: maxwind_mph.toString(),
              climateIcon: condition.icon,
            };
          }),
        };
        resolve(detailedCity);
      }, LATENCY_MS);
    });

    return results;
  };

  static getFavorites = async (cityId: string) => {
    const results = await new Promise<BasicWeather[]>((resolve) => {
      setTimeout(() => {
        const selectedCities = [
          {
            id: cityId,
            name: exampleSelectedCity.location.name,
            temperature: exampleSelectedCity.current.temp_c.toString(),
            weatherDescription: exampleSelectedCity.current.condition.text,
            humidity: exampleSelectedCity.current.humidity.toString(),
            windVelocity: exampleSelectedCity.current.wind_kph.toString(),
            climateIcon: exampleSelectedCity.current.condition.icon,
          },
          {
            id: cityId + 1,
            name: exampleSelectedCity.location.name,
            temperature: exampleSelectedCity.current.temp_c.toString(),
            weatherDescription: exampleSelectedCity.current.condition.text,
            humidity: exampleSelectedCity.current.humidity.toString(),
            windVelocity: exampleSelectedCity.current.wind_kph.toString(),
            climateIcon: exampleSelectedCity.current.condition.icon,
          },
        ];

        resolve(selectedCities);
      }, LATENCY_MS);
    });

    return results;
  };
}

export default WeatherApiMock;
