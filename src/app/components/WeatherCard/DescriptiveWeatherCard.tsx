import { Box, Card, CardContent } from "@mui/material";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { DescriptiveWeather } from "../../utils/weather.types";
import FavoriteCity from "../FavoriteCity";

interface DescriptiveWeatherCardProps extends DescriptiveWeather {
  showFavoriteButton: boolean;
}
const DescriptiveWeatherCard = (props: DescriptiveWeatherCardProps) => {
  const { id, showFavoriteButton = false, ...restProps } = props;

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
