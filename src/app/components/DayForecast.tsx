import { BasicWeather } from "@/types";
import { Card, CardContent, Typography } from "@mui/material";
import { WeatherCardContent } from "./WeatherCard";
import { formatForecastDate } from "@/utils";

interface DayForecastProps extends Omit<BasicWeather, "id"> {
  date: string;
}

const DayForecast = (props: DayForecastProps): JSX.Element => {
  const { date: dateString, ...restProps } = props;

  const formattedDate = formatForecastDate(dateString);
  return (
    <Card sx={{ width: { xs: 300, sm: 200 }, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5">{formattedDate}</Typography>
        <WeatherCardContent {...restProps} />
      </CardContent>
    </Card>
  );
};

export default DayForecast;
