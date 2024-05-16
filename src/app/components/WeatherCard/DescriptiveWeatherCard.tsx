import { Box, Card, CardContent } from "@mui/material";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { DescriptiveWeather } from "../../utils/weather.types";
import FavoriteCity from "../FavoriteCity";

type FavoriteProps = { id: string; showFavoriteButton: boolean };
type NoFavoriteProps = { id?: never; showFavoriteButton?: never };

type DescriptiveWeatherCardProps = Omit<DescriptiveWeather, "id"> &
  (FavoriteProps | NoFavoriteProps);
const DescriptiveWeatherCard = (props: DescriptiveWeatherCardProps) => {
  const { id, showFavoriteButton, ...restProps } = props;

  return (
    <Card>
      <CardContent>
        {showFavoriteButton ? (
          <Box display="flex" justifyContent="flex-end">
            <FavoriteCity id={id} />
          </Box>
        ) : null}
        <BasicWeatherCardContent {...restProps} />
        Descriptive details go here
      </CardContent>
    </Card>
  );
};

export default DescriptiveWeatherCard;
