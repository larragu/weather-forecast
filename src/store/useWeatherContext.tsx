"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, initialState, weatherReducer } from "@/store/weatherReducer";
import { SelectedCity } from "@/app/utils/weather.types";
import useLocalStorage from "@/hooks/useLocalStorage";

interface WeatherContextProps {
  setSelectedCity: (selectedCity: SelectedCity) => void;
  selectedCity: SelectedCity | null;
  toggleFavorite: (cityId: string) => void;
  favorites: string[] | null;
}

interface WeatherProviderProps {
  children: React.ReactNode;
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

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const { setLocalStorageFavorites, localStorageFavorites } = useLocalStorage();

  const updatedInitialState = {
    ...initialState,
    favorites: localStorageFavorites,
  };
  const [state, dispatch] = useReducer(weatherReducer, updatedInitialState);
  useEffect(() => {
    if (state.favorites) {
      setLocalStorageFavorites(state.favorites);
    }
  }, [JSON.stringify(state.favorites)]);

  useEffect(() => {
    setFavorites(localStorageFavorites);
  }, [JSON.stringify(localStorageFavorites)]);

  const setSelectedCity = (selectedCity: SelectedCity): void => {
    dispatch({ type: ACTIONS.SET_SELECTED_CITY, payload: selectedCity });
  };

  const toggleFavorite = (cityId: string): void => {
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: cityId });
  };

  const setFavorites = (favorites: string[] | null): void => {
    dispatch({ type: ACTIONS.SET_FAVORITES, payload: favorites });
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
