import { Box, Card, CardContent, Typography } from "@mui/material";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { DetailedWeather } from "@/types";
import FavoriteCity from "../FavoriteCity";

type FavoriteProps = { id: string; showFavoriteButton: boolean };
type NoFavoriteProps = { id?: never; showFavoriteButton?: never };

type DetailedWeatherCardProps = Omit<DetailedWeather, "id"> &
  (FavoriteProps | NoFavoriteProps);
const DetailedWeatherCard = (props: DetailedWeatherCardProps) => {
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
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Feels like {feelsLike}</Typography>
          {showFavoriteButton ? (
            <Box display="flex" justifyContent="flex-end">
              <FavoriteCity id={id} />
            </Box>
          ) : null}
        </Box>
        <BasicWeatherCardContent {...restProps} />
        <Typography variant="body2" color="text.secondary">
          Pressure: {pressure}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precipitation: {precipitation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailedWeatherCard;