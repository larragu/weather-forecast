import { DetailedWeatherCard } from "@/app/components/WeatherCard/";
import DailyForecast from "@/app/components/DailyForecast";
import { Typography, Stack } from "@mui/material";
import WeatherApi from "@/service/WeatherApi";
import { FORECAST_DAYS } from "@/constants";
import { DetailedWeather } from "@/types";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("DETAILS id: ", id);

  const result = await WeatherApi.getDetailedWeather(id, FORECAST_DAYS);

  console.log("descriptive weather: ", result);

  const { forecast, ...restCurrent } = result as DetailedWeather;

  console.log("11 : ", restCurrent);
  return (
    <>
      <Typography variant="h5">Weather Today in {restCurrent.name}</Typography>
      <Stack spacing={6} paddingX={{ sm: 2 }} paddingY={{ xs: 2 }}>
        <DetailedWeatherCard showFavoriteButton={true} {...restCurrent} />
        {forecast ? <DailyForecast days={forecast} /> : null}
      </Stack>
    </>
  );
};

export default Details;
