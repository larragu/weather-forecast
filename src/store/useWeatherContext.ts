"use client";

import { createContext, useContext } from "react";
import { BasicWeather } from "@/types";

interface WeatherContextProps {
  setSelectedCity: (selectedCity: BasicWeather) => void;
  selectedCity: BasicWeather | null;
  toggleFavorite: (cityId: string) => void;
  favorites: string[] | null;
  setFavorites: (favorites: string[]) => void;
}

export const WeatherContext = createContext<WeatherContextProps | null>(null);

const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      "useWeatherContext has to be within WeatherContext.Provider"
    );
  }
  return context;
};

export default useWeatherContext;
