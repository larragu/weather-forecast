import { Box, Card, CardContent, Typography } from "@mui/material";
import WeatherCardContent from "./WeatherCardContent";
import { DetailedWeather } from "@/types";
import FavoriteCity from "../FavoriteCity";

type FavoriteProps = { id: string; showFavoriteButton: boolean };
type NoFavoriteProps = { id?: never; showFavoriteButton?: never };

type DetailedWeatherCardProps = Omit<DetailedWeather, "id"> &
  (FavoriteProps | NoFavoriteProps);
const DetailedWeatherCard = (props: DetailedWeatherCardProps): JSX.Element => {
  const {
    id,
    name,
    showFavoriteButton,
    pressure,
    precipitation,
    feelsLike,
    ...restProps
  } = props;

  return (
    <Card sx={{ width: "300px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Feels like {feelsLike}</Typography>
          {showFavoriteButton ? (
            <Box display="flex" justifyContent="flex-end">
              <FavoriteCity id={id} />
            </Box>
          ) : null}
        </Box>
        <WeatherCardContent {...restProps}>
          <>
            <Typography variant="body2" color="text.secondary">
              Pressure: {pressure}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Precipitation: {precipitation}
            </Typography>
          </>
        </WeatherCardContent>
      </CardContent>
    </Card>
  );
};

export default DetailedWeatherCard;
