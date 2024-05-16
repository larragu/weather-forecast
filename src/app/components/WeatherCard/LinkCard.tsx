import { CardActionArea, Card, CardContent } from "@mui/material";
import MuiLink from "next/link";
import BasicWeatherCardContent from "./BasicWeatherCardContent";
import { SelectedCity } from "@/app/utils/weather.types";

interface LinkCardProps extends SelectedCity {}
const LinkCard = (city: LinkCardProps): JSX.Element => {
  return (
    <MuiLink href={`/details/${city.id}`}>
      <CardActionArea>
        <Card>
          <CardContent>
            <BasicWeatherCardContent {...city} />
          </CardContent>
        </Card>
      </CardActionArea>
    </MuiLink>
  );
};

export default LinkCard;
