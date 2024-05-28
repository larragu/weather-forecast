"use client";

import { useWeatherContext } from "@/store";
import { ClickableWeatherCard } from ".";

const SelectedWeatherCard = (): JSX.Element | null => {
  const { selectedCity } = useWeatherContext();

  if (!selectedCity) {
    return null;
  }

  const { id, ...restProps } = selectedCity;

  return (
    <ClickableWeatherCard
      {...restProps}
      url={`/details/${id}`}
      width={{ xs: 300, md: 275 }}
    />
  );
};

export default SelectedWeatherCard;
