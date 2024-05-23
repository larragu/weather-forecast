"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, initialState, weatherReducer } from "@/store/weatherReducer";
import { BasicWeather } from "@/types";
import useLocalStorage from "@/useLocalStorage";
import { FAVORITES_KEY } from "@/constants";

interface WeatherContextProps {
  setSelectedCity: (selectedCity: BasicWeather) => void;
  selectedCity: BasicWeather | null;
  toggleFavorite: (cityId: string) => void;
  favorites: string[] | null;
  setFavorites: (favorites: string[]) => void;
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
  const { getLocalStorageData, setLocalStorageData } = useLocalStorage();
  const updatedInitialState = {
    ...initialState,
    favorites: null,
  };

  const [state, dispatch] = useReducer(weatherReducer, updatedInitialState);

  useEffect(() => {
    const storedFavorites = getLocalStorageData<string[]>(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const { selectedCity, favorites } = state;

  useEffect(() => {
    const newFavorites = !!favorites?.length ? favorites : null;
    setLocalStorageData(FAVORITES_KEY, newFavorites);
  }, [favorites]);

  const setSelectedCity = (selectedCity: BasicWeather): void => {
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
        selectedCity,
        toggleFavorite,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
