import { CardActionArea, Card, CardContent } from "@mui/material";
import MuiLink from "next/link";
import { ResponsiveStyleValue } from "@mui/system";

interface LinkCardProps {
  url: string;
  children: React.ReactNode;
  width?: ResponsiveStyleValue<number>;
}

const LinkCard = (city: LinkCardProps): JSX.Element => {
  const { children, url, width } = city;
  return (
    <Card sx={{ width }}>
      <CardActionArea>
        <MuiLink href={url}>
          <CardContent>{children}</CardContent>
        </MuiLink>
      </CardActionArea>
    </Card>
  );
};

export default LinkCard;
