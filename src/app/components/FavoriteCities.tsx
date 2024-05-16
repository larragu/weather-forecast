"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { LinkCard } from "../components/WeatherCard";
import { getFavorites } from "@/service/weatherClient";
import { useEffect, useState } from "react";
import { SelectedCity } from "../utils/weather.types";
import { Stack } from "@mui/material";

const FavoriteCities = (): JSX.Element | null => {
  const { localStorageFavorites } = useLocalStorage();
  const [favorites, setFavorites] = useState<SelectedCity[]>([]);

  useEffect(() => {
    if (localStorageFavorites) {
      const fetchData = async () => {
        const result = await getFavorites(localStorageFavorites);
        setFavorites(result);
      };

      fetchData();
    }
  }, [localStorageFavorites]);

  if (!localStorageFavorites) {
    return null;
  }
  return (
    <Stack spacing={4}>
      {favorites?.map((favorite) => (
        <LinkCard key={favorite.id} {...favorite} />
      ))}
    </Stack>
  );
};

export default FavoriteCities;
