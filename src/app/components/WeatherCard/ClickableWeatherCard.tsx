"use client";
import { Typography } from "@mui/material";
import { LinkCard } from ".";
import WeatherCardContent from "./WeatherCardContent";
import { BasicWeather } from "@/types";

interface ClickableWeatherCardProps extends Omit<BasicWeather, "id"> {
  url: string;
}
const ClickableWeatherCard = (
  props: ClickableWeatherCardProps
): JSX.Element => {
  const { name, url, ...weatherCard } = props;

  const title = (
    <Typography variant="h5" component="div">
      {name}
    </Typography>
  );
  return (
    <LinkCard key={url} url={url}>
      <WeatherCardContent {...weatherCard} title={title} />
    </LinkCard>
  );
};

export default ClickableWeatherCard;
