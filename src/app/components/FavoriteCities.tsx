"use client";

import LinkCard from "@/app/components/LinkCard";
import { getFavorites } from "@/service/weather.api";
import { useEffect, useState } from "react";
import { BasicWeather } from "@/types";
import { Typography, Box, Grid, Container } from "@mui/material";
import { WeatherCardContent } from "@/app/components/WeatherCard";
import Loading from "../loading";
import { useWeatherContext } from "@/store";
import { useToast } from "@/app/components/Toast";

const FavoriteCities = (): JSX.Element | null => {
  const toast = useToast();
  const { favorites } = useWeatherContext();
  const [favoriteCities, setFavoriteCities] = useState<BasicWeather[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const result = await getFavorites(favorites);
          setFavoriteCities(result);
        } catch (error) {
          if (error instanceof Error) {
            toast({ message: error.message, status: "error" });
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [favorites]);

  if (isLoading) {
    return <Loading />;
  }

  return !!favorites?.length ? (
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
  ) : (
    <Container>
      <Typography variant="h6" textAlign="center">
        No Favorites Found
      </Typography>
    </Container>
  );
};

export default FavoriteCities;
