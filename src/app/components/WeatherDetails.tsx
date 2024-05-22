"use client";

import { Stack, Typography } from "@mui/material";
import DailyForecast from "./DailyForecast";
import { DetailedWeatherCard } from "./WeatherCard";
import { DetailedWeather } from "@/types";
import { formatDate, getCurrentLocalDate } from "@/utils";
import { useEffect, useState } from "react";
import { getDetailedWeather } from "@/service/weatherClient";
import { FORECAST_DAYS } from "@/constants";
import Loader from "../loading";

interface WeatherDetailsProps {
  cityId: string;
}

const WeatherDetails = ({ cityId }: WeatherDetailsProps) => {
  const [details, setDetails] = useState<DetailedWeather | null>(null);

  useEffect(() => {
    const localDateString = formatDate(getCurrentLocalDate());
    const fetchData = async () => {
      const result = await getDetailedWeather(
        cityId,
        localDateString,
        FORECAST_DAYS
      );
      setDetails(result);
    };

    fetchData();
  }, [cityId]);

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
