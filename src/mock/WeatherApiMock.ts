import { CityResult, SelectedCity } from "@/app/utils/weather.types";
import { cityResults, exampleSelectedCity } from "./weatherResponse";

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
    const results = await new Promise<SelectedCity>((resolve) => {
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

  static getDescriptiveWeather = async (cityId: string, _days: number) => {
    const results = await new Promise<SelectedCity>((resolve) => {
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

  static getFavorites = async (cityId: string) => {
    const results = await new Promise<SelectedCity[]>((resolve) => {
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
