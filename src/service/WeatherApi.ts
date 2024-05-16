import HttpClient from "./HttpClient";
import { CityResult, SelectedCity, SelectedCityDTO } from "@/types";

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
  ): Promise<Error | CityResult[]> => {
    if (searchTerm) {
      const url = `${baseUrl}/search.json?q=${searchTerm}`;

      const results = await HttpClient.get<CityResult[]>(url, options);

      return results.map((result) => ({
        ...result,
        name: `${result.name}, ${result.region}`,
      }));
    }

    return [];
  };

  static getWeather = async (cityId: string): Promise<Error | SelectedCity> => {
    const url = `${baseUrl}/current.json?q=${cityId}`;
    const result = await HttpClient.get<SelectedCityDTO>(url, options);

    const { location, current } = result;

    const selectedCity = {
      //id: cityId,
      id: `${location.name}-${location.region}`,
      name: `${location.name}, ${location.region}`,
      temperature: current.temp_c.toString(),
      weatherDescription: current.condition.text,
      humidity: current.humidity.toString(),
      windVelocity: current.wind_kph.toString(),
      climateIcon: current.condition.icon,
    };
    return selectedCity;
  };

  static getDescriptiveWeather = async (
    cityId: string,
    days: number = 3
  ): Promise<Error | SelectedCity> => {
    const url = `${baseUrl}/forecast.json?q=${cityId}&days=${days}`;

    const results = await HttpClient.get<any>(url, options);

    const { location, current, forecast } = results;
    const cityName = cityId.replace("-", ", ");
    console.log("hmm:", cityName);
    const detailedCity = {
      id: cityId,
      name: cityId.replace("-", ", "),
      temperature: current.temp_c.toString(),
      weatherDescription: current.condition.text,
      humidity: current.humidity.toString(),
      windVelocity: current.wind_kph.toString(),
      climateIcon: current.condition.icon,
      forecast: forecast.forecastday.map((forecastday, index: number) => {
        const { date, day } = forecastday;
        const { avgtemp_c, avghumidity, maxwind_mph, condition } = day;

        return {
          id: index.toString(),
          date: date,
          name: location.name,
          temperature: avgtemp_c.toString(),
          weatherDescription: "",
          humidity: avghumidity.toString(),
          windVelocity: maxwind_mph.toString(),
          climateIcon: condition.icon,
        };
      }),
    };

    return detailedCity;
  };

  static getFavorites = async (cityIds: string[]) => {
    const promises = cityIds.map((cityId) =>
      this.getDescriptiveWeather(cityId)
    );

    const results = await Promise.all(promises);

    return results;
  };
}

export default WeatherApi;
