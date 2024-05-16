import { DescriptiveWeatherCard } from ".";

interface DayForecastProps {
  date: string;
}
const DayForecast = (props: DayForecastProps) => {
  const { date } = props;
  return <DescriptiveWeatherCard {...props} />;
};

export default DayForecast;
