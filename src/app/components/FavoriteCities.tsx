"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { LinkCard } from "../components/WeatherCard";
import { getFavorites } from "@/service/weatherClient";
import { useEffect, useState } from "react";
import { BasicWeather } from "@/types";
import { Stack, Typography, Box, Grid } from "@mui/material";
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
    <Grid
      container
      rowSpacing={{ xs: 2, sm: 4 }}
      columnSpacing={{ sm: 2, md: 4 }}
    >
      {favorites?.map((favorite) => {
        const { id, name, ...restFavorite } = favorite;

        const title = (
          <Typography
            variant="h5"
            fontSize={{ xs: 16, sm: 18 }}
            component="div"
            noWrap
          >
            {name}
          </Typography>
        );
        return (
          <Grid key={id} item xs={12} sm={6} md={4} justifyContent="center">
            <Box width={{ md: "275px" }}>
              <LinkCard url={`/details/${id}`}>
                <BasicWeatherCardContent {...restFavorite} title={title} />
              </LinkCard>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FavoriteCities;
