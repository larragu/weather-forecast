"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import LinkCard from "./LinkCard";
import { getFavorites } from "@/service/weatherClient";
import { useEffect, useState } from "react";
import { BasicWeather } from "@/types";
import { Typography, Box, Grid } from "@mui/material";
import { WeatherCardContent } from "./WeatherCard";

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
          <Typography variant="h5" fontSize={{ xs: "1.5rem", sm: 18 }} noWrap>
            {name}
          </Typography>
        );
        return (
          <Grid key={id} item xs={12} sm={6} md={4} justifyContent="center">
            <Box margin="auto" display="flex" justifyContent="center">
              <LinkCard url={`/details/${id}`} width={{ xs: 300, md: 275 }}>
                <WeatherCardContent {...restFavorite} title={title} />
              </LinkCard>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FavoriteCities;
