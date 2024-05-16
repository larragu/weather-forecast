import {
  BasicWeather,
  BasicWeatherDTO,
  DetailedWeather,
  DetailedWeatherDTO,
} from "@/types";

const formatBasicWeather = (result: BasicWeatherDTO): BasicWeather => {
  const { location, current } = result;

  const basicWeather = {
    id: `${location.name}-${location.region}`,
    name: `${location.name}, ${location.region}`,
    temperature: `${current.temp_c}° c`,
    weatherDescription: current.condition.text,
    humidity: `${current.humidity}%`,
    windVelocity: `${current.wind_kph} kph`,
    climateIcon: current.condition.icon,
  };
  return basicWeather;
};

const formatDetailedWeather = (
  cityId: string,
  results: DetailedWeatherDTO
): DetailedWeather => {
  const { current } = results;

  const detailedWeather = {
    id: cityId,
    name: cityId.replace("-", ", "),
    temperature: `${current.temp_c}° c`,
    weatherDescription: current.condition.text,
    humidity: `${current.humidity}%`,
    windVelocity: `${current.wind_kph} kph`,
    climateIcon: current.condition.icon,
    pressure: `${current.pressure_mb} mb`,
    precipitation: `${current.precip_mm} mm`,
    feelsLike: `${current.feelslike_c}° c`,
  };

  return detailedWeather;
};
const formatForecast = (
  forecast: DetailedWeatherDTO["forecast"]
): DetailedWeather["forecast"] => {
  return forecast.forecastday.map((forecastday, index: number) => {
    const { date, day } = forecastday;
    const { avgtemp_c, avghumidity, maxwind_kph, condition } = day;

    return {
      id: index.toString(),
      name: "",
      date: date,
      temperature: `${avgtemp_c}° c`,
      weatherDescription: "",
      humidity: `${avghumidity}%`,
      windVelocity: `${maxwind_kph} kph`,
      climateIcon: condition.icon,
    };
  });
};
export { formatBasicWeather, formatDetailedWeather, formatForecast };
