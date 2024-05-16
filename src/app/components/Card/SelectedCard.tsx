"use client";

import { useWeatherContext } from "../../../store/useWeatherContext";
import { LinkCard } from "../WeatherCard";
import BasicWeatherCardContent from "../WeatherCard/BasicWeatherCardContent";

const SelectedCard = (): JSX.Element | null => {
  const { selectedCity } = useWeatherContext();
  console.log("selectedCity: ", selectedCity);

  if (!selectedCity) {
    return null;
  }

  const { id, ...restSelectedCityProps } = selectedCity;

  return (
    <LinkCard key={id} url={`/details/${id}`}>
      <BasicWeatherCardContent {...restSelectedCityProps} />
    </LinkCard>
  );
};

export default SelectedCard;
