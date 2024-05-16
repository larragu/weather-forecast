import NextLink from "next/link";
import { Box, List, ListItem, Link as MuiLink } from "@mui/material";
import CitySearchBox from "./CitySearchBox/CitySearchBox";

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/favorites", label: "Favorites" },
];

const HeaderNavigationBar = (): JSX.Element => {
  return (
    <header>
      <Box
        component="nav"
        display="flex"
        justifyContent="center"
        width="100%"
        bgcolor="#022d50"
        paddingTop={3}
      >
        <Box width={{ xs: "100%", sm: "50%" }}>
          <CitySearchBox />
          <List
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {menuItems.map(({ path, label }) => (
              <ListItem key={path}>
                <MuiLink underline="hover" component={NextLink} href={path}>
                  {label}
                </MuiLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </header>
  );
};

export default HeaderNavigationBar;
