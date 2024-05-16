"use client";

import { useEffect, useMemo, useState } from "react";
import { FAVORITES_KEY } from "@/constants";

const useLocalStorage = () => {
  const [favorites, setFavorites] = useState<string[] | null>(null);

  useEffect(() => {
    const savedFavorites = window.localStorage.getItem(FAVORITES_KEY);
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setFavorites(favorites);
  }, []);

  useEffect(() => {
    if (favorites) {
      if (favorites?.length > 0) {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } else {
        window.localStorage.removeItem(FAVORITES_KEY);
      }
    }
  }, [JSON.stringify(favorites)]);

  const setFavoritesHandler = (favorites: string[]) => {
    setFavorites(favorites);
  };

  return {
    setLocalStorageFavorites: setFavoritesHandler,
    localStorageFavorites: favorites,
  };
};

export default useLocalStorage;
