"use client";
import { createContext, useContext, useReducer } from "react";
import { ACTIONS, initialState, weatherReducer } from "@/store/weatherReducer";
import { SelectedCity } from "@/app/utils/weather.types";

interface WeatherContextProps {
  setSelectedCity: (selectedCity: SelectedCity) => void;
  selectedCity: SelectedCity | null;
  toggleFavorite: (cityId: string) => void;
  favorites: string[];
}

const WeatherContext = createContext<WeatherContextProps | null>(null);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      "useWeatherContext has to be within WeatherContext.Provider"
    );
  }
  return context;
};

interface WeatherProviderProps {
  children: React.ReactNode;
}
export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const setSelectedCity = (selectedCity: SelectedCity) => {
    dispatch({ type: ACTIONS.SET_SELECTED_CITY, payload: selectedCity });
  };

  const toggleFavorite = (cityId: string) => {
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: cityId });
  };

  return (
    <WeatherContext.Provider
      value={{
        setSelectedCity,
        selectedCity: state.selectedCity,
        toggleFavorite,
        favorites: state.favorites,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
