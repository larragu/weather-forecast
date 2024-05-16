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
        {showFavoriteButton ? (
          <Box display="flex" justifyContent="flex-end">
            <FavoriteCity id={id} />
          </Box>
        ) : null}

        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Feels like {feelsLike}
        </Typography>
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
