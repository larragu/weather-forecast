import { BasicWeatherDTO } from "@/types";

const formatBasicWeather = (result: BasicWeatherDTO) => {
  const { location, current } = result;

  const basicWeather = {
    id: `${location.name}-${location.region}`,
    name: `${location.name}, ${location.region}`,
    temperature: current.temp_c.toString(),
    weatherDescription: current.condition.text,
    humidity: current.humidity.toString(),
    windVelocity: current.wind_kph.toString(),
    climateIcon: current.condition.icon,
  };
  return basicWeather;
};

const formatDetailedWeather = (cityId: string, results: any) => {
  const { location, current, forecast } = results;

  const detailedWeather = {
    id: cityId,
    name: cityId.replace("-", ", "),
    temperature: current.temp_c.toString(),
    weatherDescription: current.condition.text,
    humidity: current.humidity.toString(),
    windVelocity: current.wind_kph.toString(),
    climateIcon: current.condition.icon,
    pressure: `${current.pressure_mb} mb`,
    precipitation: `${current.precip_mm} mm`,
    feelsLike: `${current.feelslike_c} c`,
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
  return detailedWeather;
};

export { formatBasicWeather, formatDetailedWeather };
