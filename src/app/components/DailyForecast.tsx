import { Box, Stack, Typography } from "@mui/material";
import DayForecast from "./WeatherCard/DayForecast";

const DailyForecast = ({ days }: { days: any[] }) => {
  return (
    <Box justifyContent="center">
      <Typography
        variant="h5"
        component="div"
        textAlign={{ xs: "center", sm: "left" }}
      >
        Forecast
      </Typography>
      <Stack flexDirection={{ xs: "column", sm: "row" }}>
        {days?.map((day) => (
          <Box paddingX={{ sm: 2 }} paddingY={{ xs: 2 }} key={day.date}>
            <DayForecast {...day} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default DailyForecast;
