import { Typography } from "@mui/material";
import { BasicWeather } from "@/types";

interface BasicWeatherCardContentProps
  extends Omit<BasicWeather, "id" | "name"> {
  title?: React.ReactNode;
  children?: React.ReactNode;
}
const WeatherCardContent = (
  props: BasicWeatherCardContentProps
): JSX.Element => {
  const {
    title,
    children,
    temperature,
    weatherDescription,
    humidity,
    windVelocity,
    climateIcon,
  } = props;

  return (
    <>
      {title}
      <Typography variant="body2" color="text.secondary">
        Temperature: {temperature}
      </Typography>
      {weatherDescription ? (
        <Typography variant="body2" color="text.secondary">
          Description: {weatherDescription}
        </Typography>
      ) : null}
      <Typography variant="body2" color="text.secondary">
        Humidity: {humidity}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Wind Velocity: {windVelocity}
      </Typography>
      {children}
      <Typography variant="body2" color="text.secondary">
        <img
          src={climateIcon}
          alt={weatherDescription}
          width="50"
          height="50"
        />
      </Typography>
    </>
  );
};

export default WeatherCardContent;
