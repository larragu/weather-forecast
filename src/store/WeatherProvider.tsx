"use client";

import { FAVORITES_KEY } from "@/constants";
import { BasicWeather } from "@/types";
import useLocalStorage from "@/useLocalStorage";
import { useReducer, useEffect } from "react";
import { initialState, weatherReducer, ACTIONS } from "./weatherReducer";
import { WeatherContext } from "./useWeatherContext";

interface WeatherProviderProps {
  children: React.ReactNode;
}

const WeatherProvider = ({ children }: WeatherProviderProps) => {
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
  }, [getLocalStorageData]);

  const { selectedCity, favorites } = state;

  useEffect(() => {
    const newFavorites = !!favorites?.length ? favorites : null;
    setLocalStorageData(FAVORITES_KEY, newFavorites);
  }, [favorites, setLocalStorageData]);

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

export default WeatherProvider;
