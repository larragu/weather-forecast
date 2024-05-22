import { Box, List, Paper } from "@mui/material";
import CitySearchBox from "./CitySearchBox/CitySearchBox";
import MenuItems from "./MenuItems";

const HeaderNavigationBar = (): JSX.Element => {
  return (
    <Paper component="header">
      <Box
        component="nav"
        display="flex"
        justifyContent="center"
        width="100%"
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
    </Paper>
  );
};

export default HeaderNavigationBar;
