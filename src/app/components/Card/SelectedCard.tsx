"use client";

import { useWeatherContext } from "../../../store/useWeatherContext";
import { LinkCard } from "../WeatherCard";

const SelectedCard = () => {
  const { selectedCity } = useWeatherContext();
  console.log("selectedCity: ", selectedCity);
  return selectedCity ? <LinkCard {...selectedCity} /> : null;
};

export default SelectedCard;
