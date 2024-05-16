import { getDetailedWeather } from "@/service/weatherClient";
import { DetailedWeatherCard } from "@/app/components/WeatherCard/";
import DailyForecast from "@/app/components/DailyForecast";
import { Typography, Stack, Box } from "@mui/material";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("DETAILS: ", id);

  const result = await getDetailedWeather(id);
  console.log("descriptive weather: ", result);

  const { forecast, ...restCurrent } = result;

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
