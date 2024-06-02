import { weatherApiBasePath } from "@/config";
import HttpClient from "./http.client";

const options = {
  method: "GET",
};

class WeatherApiClient {
  headers: { "X-RapidAPI-Key": string; "X-RapidAPI-Host": string };
  basePath: string;

  constructor(basePath: string, apiKey: string, apiHost: string) {
    this.basePath = basePath;
    this.headers = { "X-RapidAPI-Key": apiKey, "X-RapidAPI-Host": apiHost };
  }

  async getCities<T>(searchQuery: string): Promise<T> {
    const url = `${this.basePath}/search.json?q=${searchQuery}`;

    const response = await HttpClient.get<T>(url, {
      ...options,
      headers: this.headers,
    });

    return response;
  }

  async getWeather<T>(cityId: string): Promise<T> {
    const url = `${this.basePath}/current.json?q=${cityId}`;

    const result = await HttpClient.get<T>(url, {
      ...options,
      headers: this.headers,
    });

    return result;
  }

  async getDetailedWeather<T>(cityId: string, futureDate: string): Promise<T> {
    const url = `${this.basePath}/forecast.json?q=${cityId}&dt=${futureDate}`;

    const result = HttpClient.get<T>(url, {
      ...options,
      headers: this.headers,
    });

    return result;
  }
}

const weatherApiClient = new WeatherApiClient(
  weatherApiBasePath,
  process.env.X_RapidAPI_Key || "",
  process.env.X_RapidAPI_Host || ""
);
export default weatherApiClient;
