"use client";

import LinkCard from "./LinkCard";
import { getFavorites } from "@/service/weatherClient";
import { useEffect, useState } from "react";
import { BasicWeather } from "@/types";
import { Typography, Box, Grid } from "@mui/material";
import { WeatherCardContent } from "./WeatherCard";
import Loading from "../loading";
import { useWeatherContext } from "@/store/useWeatherContext";

const FavoriteCities = (): JSX.Element | null => {
  const { favorites } = useWeatherContext();
  const [favoriteCities, setFavoriteCities] = useState<BasicWeather[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const fetchData = async () => {
        const result = await getFavorites(favorites);
        setFavoriteCities(result);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [favorites]);

  if (!favorites) {
    return null;
  }
  return isLoading ? (
    <Loading />
  ) : (
    <Grid
      container
      rowSpacing={{ xs: 2, sm: 4 }}
      columnSpacing={{ sm: 2, md: 4 }}
    >
      {favoriteCities?.map((favorite) => {
        const { id, name, ...restFavorite } = favorite;

        const title = (
          <Typography
            variant="h5"
            fontSize={{ xs: "1.5rem", sm: 18 }}
            paddingBottom="1rem"
            noWrap
          >
            {name}
          </Typography>
        );
        return (
          <Grid key={id} item xs={12} sm={6} md={4} justifyContent="center">
            <Box display="flex" justifyContent="center">
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
