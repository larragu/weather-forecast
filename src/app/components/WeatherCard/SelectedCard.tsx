"use client";

import { useWeatherContext } from "../../../store/useWeatherContext";
import { Card, CardActionArea, CardContent } from "@mui/material";
import MuiLink from "next/link";
import BasicWeatherCardContent from "./BasicWeatherCardContent";

const SelectedCard = () => {
  const { selectedCity } = useWeatherContext();
  console.log("selectedCity: ", selectedCity);
  return selectedCity ? (
    <MuiLink href={`/details/${selectedCity.id}`}>
      <CardActionArea>
        <Card>
          <CardContent>
            <BasicWeatherCardContent {...selectedCity} />
          </CardContent>
        </Card>
      </CardActionArea>
    </MuiLink>
  ) : null;
};

export default SelectedCard;
