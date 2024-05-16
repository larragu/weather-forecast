import { BasicWeather } from "@/types";
import { Card, CardContent, Typography } from "@mui/material";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { formatForecastDate } from "@/utils";

interface DayForecastProps extends Omit<BasicWeather, "id"> {
  date: string;
}

const DayForecast = (props: DayForecastProps) => {
  const { date: dateString, ...restProps } = props;

  const formattedDate = formatForecastDate(dateString);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {formattedDate}
        </Typography>
        <BasicWeatherCardContent {...restProps} />
      </CardContent>
    </Card>
  );
};

export default DayForecast;
