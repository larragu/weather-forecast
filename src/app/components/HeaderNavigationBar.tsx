import { Box, List } from "@mui/material";
import CitySearchBox from "./CitySearchBox/CitySearchBox";
import MenuItems from "./MenuItems";

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
            <MenuItems />
          </List>
        </Box>
      </Box>
    </header>
  );
};

export default HeaderNavigationBar;
