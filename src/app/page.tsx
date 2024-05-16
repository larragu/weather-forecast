import { Typography } from "@mui/material";
import { SelectedWeatherCard } from "./components/WeatherCard";

export default function Home() {
  return (
    <>
      <Typography variant="h5" marginBottom={4}>
        Welcome!
      </Typography>
      <SelectedWeatherCard />
    </>
  );
}
