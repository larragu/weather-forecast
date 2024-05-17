import { BasicWeather } from "@/types";
import { Card, CardContent, Typography } from "@mui/material";
import { WeatherCardContent } from ".";
import { formatForecastDate } from "@/utils";

interface DayForecastCardProps extends Omit<BasicWeather, "id"> {
  date: string;
}

const DayForecastCard = (props: DayForecastCardProps): JSX.Element => {
  const { date: dateString, ...restProps } = props;

  const formattedDate = formatForecastDate(dateString);
  return (
    <Card sx={{ width: { xs: 300, sm: 200 }, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" paddingBottom="1rem">
          {formattedDate}
        </Typography>
        <WeatherCardContent {...restProps} />
      </CardContent>
    </Card>
  );
};

export default DayForecastCard;
