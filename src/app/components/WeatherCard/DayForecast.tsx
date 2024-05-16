import { BasicWeather } from "@/types";
import { DescriptiveWeatherCard } from ".";

interface DayForecastProps extends BasicWeather {
  date: string;
}
const DayForecast = (props: DayForecastProps) => {
  return <DescriptiveWeatherCard {...props} />;
};

export default DayForecast;
