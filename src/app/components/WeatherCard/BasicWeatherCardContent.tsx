import { Typography } from "@mui/material";
import { BasicWeather } from "@/types";

interface BasicWeatherCardContentProps extends BasicWeather {}
const BasicWeatherCardContent = (props: BasicWeatherCardContentProps) => {
  const {
    name,
    temperature,
    weatherDescription,
    humidity,
    windVelocity,
    climateIcon,
  } = props;
  console.log("name foo: ", name);
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Temperature: {temperature}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Climate Description: {weatherDescription}
      </Typography>
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
