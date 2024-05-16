"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { LinkCard } from "../components/WeatherCard";
import { getFavorites } from "@/service/weatherClient";
import { useEffect, useState } from "react";
import { BasicWeather } from "@/types";
import { Stack, Typography } from "@mui/material";
import BasicWeatherCardContent from "./WeatherCard/BasicWeatherCardContent";

const FavoriteCities = (): JSX.Element | null => {
  const { localStorageFavorites } = useLocalStorage();
  const [favorites, setFavorites] = useState<BasicWeather[]>([]);

  useEffect(() => {
    if (localStorageFavorites && localStorageFavorites.length > 0) {
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
      {favorites?.map((favorite) => {
        const { id, name, ...restFavorite } = favorite;

        const title = (
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        );
        return (
          <LinkCard key={id} url={`/details/${id}`}>
            <BasicWeatherCardContent {...restFavorite} title={title} />
          </LinkCard>
        );
      })}
    </Stack>
  );
};

export default FavoriteCities;
