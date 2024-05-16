"use client";

import { useWeatherContext } from "../../../store/useWeatherContext";
import { ClickableWeatherCard } from ".";

const SelectedWeatherCard = (): JSX.Element | null => {
  const { selectedCity } = useWeatherContext();

  if (!selectedCity) {
    return null;
  }

  const { id, ...restProps } = selectedCity;

  return <ClickableWeatherCard {...restProps} url={`/details/${id}`} />;
};

export default SelectedWeatherCard;
