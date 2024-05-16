import { BasicWeather } from "@/types";
import { DescriptiveWeatherCard } from ".";

interface DayForecastProps extends Omit<BasicWeather, "id"> {
  date: string;
}
const DayForecast = (props: DayForecastProps) => {
  return <DescriptiveWeatherCard {...props} />;
};

export default DayForecast;
