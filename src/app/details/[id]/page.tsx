import { DetailedWeatherCard } from "@/app/components/WeatherCard/";
import DailyForecast from "@/app/components/DailyForecast";
import { Typography, Stack } from "@mui/material";
import WeatherApi from "@/service/WeatherApi";
import { FORECAST_DAYS } from "@/constants";
import { DetailedWeather } from "@/types";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const decodedId = decodeURI(id);

  const result = await WeatherApi.getDetailedWeather(decodedId, FORECAST_DAYS);

  const { forecast, ...restCurrent } = result as DetailedWeather;

  console.log("DETAILS decodedId, name: ", decodedId, restCurrent.name);
  return (
    <>
      <Typography variant="h5">Weather Today in {restCurrent.name}</Typography>
      <Stack spacing={6} alignItems="center">
        <DetailedWeatherCard showFavoriteButton={true} {...restCurrent} />
        {forecast ? <DailyForecast days={forecast} /> : null}
      </Stack>
    </>
  );
};

export default Details;
