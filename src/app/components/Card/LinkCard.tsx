import { CardActionArea, Card, CardContent } from "@mui/material";
import MuiLink from "next/link";

interface LinkCardProps {
  url: string;
  children: React.ReactNode;
}

const LinkCard = (city: LinkCardProps): JSX.Element => {
  const { children, url } = city;
  return (
    <MuiLink href={url}>
      <CardActionArea>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </CardActionArea>
    </MuiLink>
  );
};

export default LinkCard;
