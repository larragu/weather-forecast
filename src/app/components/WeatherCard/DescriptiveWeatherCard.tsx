import { Box, Card, CardContent } from "@mui/material";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { DescriptiveWeather } from "../../utils/weather.types";
import FavoriteCity from "../FavoriteCity";

interface DescriptiveWeatherCardProps extends DescriptiveWeather {}
const DescriptiveWeatherCard = (props: DescriptiveWeatherCardProps) => {
  const { id, ...restProps } = props;

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="flex-end">
          <FavoriteCity id={id} />
        </Box>
        <BasicWeatherCardContent {...restProps} />
        Descriptive details go here
      </CardContent>
    </Card>
  );
};

export default DescriptiveWeatherCard;
