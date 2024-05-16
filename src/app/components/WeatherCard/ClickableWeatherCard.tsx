"use client";
import { Typography } from "@mui/material";
import { LinkCard } from ".";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { BasicWeather } from "@/types";

interface ClickableWeatherCardProps extends Omit<BasicWeather, "id"> {
  url: string;
}
const ClickableWeatherCard = (
  props: ClickableWeatherCardProps
): JSX.Element => {
  const { name, url, ...weatherCard } = props;

  const title = (
    <Typography gutterBottom variant="h5" component="div">
      {name}
    </Typography>
  );
  return (
    <LinkCard key={url} url={url}>
      <BasicWeatherCardContent {...weatherCard} title={title} />
    </LinkCard>
  );
};

export default ClickableWeatherCard;
