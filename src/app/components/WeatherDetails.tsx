"use client";

import { Stack, Typography } from "@mui/material";
import DailyForecast from "./DailyForecast";
import { DetailedWeatherCard } from "./WeatherCard";
import { DetailedWeather } from "@/types";
import { formatDate, getCurrentLocalDate } from "@/utils";
import { useEffect, useState } from "react";
import { getDetailedWeather } from "@/service/weather.api";
import { FORECAST_DAYS } from "@/constants";
import Loader from "../loading";
import { useToast } from "./Toast";

interface WeatherDetailsProps {
  cityId: string;
}

const WeatherDetails = ({
  cityId,
}: WeatherDetailsProps): JSX.Element | null => {
  const toast = useToast();
  const [details, setDetails] = useState<DetailedWeather | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const localDateString = formatDate(getCurrentLocalDate());
    const fetchData = async () => {
      try {
        setError("");
        const result = await getDetailedWeather(
          cityId,
          localDateString,
          FORECAST_DAYS
        );
        setDetails(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [cityId]);

  useEffect(() => {
    if (error) {
      toast({ message: error, status: "error" });
    }
  }, [error, toast]);

  if (error) {
    return null;
  }

  if (!details) {
    return <Loader />;
  }

  const { forecast, ...restCurrent } = details as DetailedWeather;

  return (
    <>
      <Typography variant="h5" marginBottom={4}>
        Current Weather in {restCurrent.name}
      </Typography>
      <Stack spacing={6} alignItems="center">
        <DetailedWeatherCard showFavoriteButton={true} {...restCurrent} />
        {forecast ? <DailyForecast days={forecast} /> : null}
      </Stack>
    </>
  );
};

export default WeatherDetails;
