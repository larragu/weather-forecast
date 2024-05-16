import { Box, Grid, Typography } from "@mui/material";
import DayForecast from "./WeatherCard/DayForecast";

const DailyForecast = ({ days }: { days: any[] }): JSX.Element => {
  return (
    <Box justifyContent="center">
      <Typography
        variant="h5"
        component="div"
        textAlign={{ xs: "center", sm: "left" }}
      >
        Forecast
      </Typography>
      <Grid
        container
        rowSpacing={{ xs: 2, sm: 4 }}
        columnSpacing={{ sm: 2, md: 4 }}
      >
        {days?.map((day) => (
          <Grid
            key={day.date}
            item
            xs={12}
            sm={6}
            md={3}
            justifyContent="center"
          >
            <Box width={{ sm: "200px" }}>
              <DayForecast {...day} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DailyForecast;
