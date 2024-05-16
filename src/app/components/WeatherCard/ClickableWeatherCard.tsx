"use client";
import { LinkCard } from ".";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { BasicWeather } from "@/types";

interface ClickableWeatherCardProps extends Omit<BasicWeather, "id"> {
  url: string;
}
const ClickableWeatherCard = (
  props: ClickableWeatherCardProps
): JSX.Element => {
  const { url, ...weatherCard } = props;

  return (
    <LinkCard key={url} url={url}>
      <BasicWeatherCardContent {...weatherCard} />
    </LinkCard>
  );
};

export default ClickableWeatherCard;
