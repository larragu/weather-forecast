import { getDescriptiveWeather } from "@/service/weatherClient";
import { DescriptiveWeatherCard } from "@/app/components/WeatherCard/";
import DailyForecast from "@/app/components/DailyForecast";
import { Typography, Stack } from "@mui/material";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("DETAILS: ", id);

  const result = await getDescriptiveWeather(id);
  console.log("descriptive weather: ", result);

  const { forecast, ...restCurrent } = result;

  console.log("restCurrent : ", restCurrent);
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Weather Today in {restCurrent.name}
      </Typography>
      <Stack spacing={6} paddingX={{ sm: 2 }} paddingY={{ xs: 2 }}>
        <DescriptiveWeatherCard showFavoriteButton={true} {...restCurrent} />
        {forecast ? <DailyForecast days={forecast} /> : null}
      </Stack>
    </>
  );
};

export default Details;
