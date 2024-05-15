"use client";

import { Card } from "@mui/material";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { BasicWeather } from "../../utils/weather.types";

interface DescriptiveWeatherCard extends BasicWeather {}
const DescriptiveWeatherCard = (props: DescriptiveWeatherCard) => {
  return props ? (
    <Card>
      <BasicWeatherCardContent {...props} />
      Descriptive details go here
    </Card>
  ) : null;
};

export default DescriptiveWeatherCard;
