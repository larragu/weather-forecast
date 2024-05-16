import { Typography } from "@mui/material";
import { BasicWeather } from "@/types";

interface BasicWeatherCardContentProps
  extends Omit<BasicWeather, "id" | "name"> {
  title?: React.ReactNode;
}
const BasicWeatherCardContent = (props: BasicWeatherCardContentProps) => {
  const {
    title,
    temperature,
    weatherDescription,
    humidity,
    windVelocity,
    climateIcon,
  } = props;

  return (
    <>
      {title ? title : null}
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

export default BasicWeatherCardContent;
