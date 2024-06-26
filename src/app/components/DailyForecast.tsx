import { Box, Grid, Typography } from "@mui/material";
import { DayForecastCard } from "./WeatherCard";
import { ForecastWeather } from "@/types";

const DailyForecast = ({ days }: { days: ForecastWeather[] }): JSX.Element => {
  return (
    <Box justifyContent="center">
      <Typography variant="h5" textAlign="center" marginBottom={4}>
        Forecast
      </Typography>
      <Grid
        container
        rowSpacing={{ xs: 2, sm: 4 }}
        columnSpacing={{ sm: 2, md: 4 }}
      >
        {days?.map((day) => {
          const { id, ...restDay } = day;

          return (
            <Grid key={id} item xs={12} sm={6} md={3} justifyContent="center">
              <Box margin="auto" display="flex" justifyContent="center">
                <DayForecastCard {...restDay} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DailyForecast;
