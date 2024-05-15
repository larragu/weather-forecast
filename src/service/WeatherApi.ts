import HttpClient from "../app/utils/HttpClient";
import { CityResult, SelectedCity } from "../app/utils/weather.types";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
    "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
  },
};

class WeatherApi {
  static getCities = async (
    searchTerm: string
  ): Promise<Error | CityResult[]> => {
    if (searchTerm) {
      const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${searchTerm}`;
      const results = await HttpClient.get<CityResult[]>(url, options);
      return results;
    }

    return [];
  };

  static getWeather = async (cityId: string): Promise<Error | SelectedCity> => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityId}`;
    const results = await HttpClient.get<SelectedCity>(url, options);
    return results;
  };

  static getDescriptiveWeather = async (
    cityId: string,
    days: number = 3
  ): Promise<Error | SelectedCity> => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityId}&days=${days}`;

    const results = await HttpClient.get<SelectedCity>(url, options);
    return results;
  };
}

export default WeatherApi;
