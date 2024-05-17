"use client";
import { Typography } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import LinkCard from "../LinkCard";
import WeatherCardContent from "./WeatherCardContent";
import { BasicWeather } from "@/types";

interface ClickableWeatherCardProps extends Omit<BasicWeather, "id"> {
  url: string;
  width?: ResponsiveStyleValue<number>;
}
const ClickableWeatherCard = (
  props: ClickableWeatherCardProps
): JSX.Element => {
  const { name, width, url, ...weatherCard } = props;

  const title = (
    <Typography variant="h5" paddingBottom="1rem">
      {name}
    </Typography>
  );
  return (
    <LinkCard key={url} url={url} width={width}>
      <WeatherCardContent {...weatherCard} title={title} />
    </LinkCard>
  );
};

export default ClickableWeatherCard;
