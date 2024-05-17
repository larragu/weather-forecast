import { Box, Typography } from "@mui/material";
import FavoriteCities from "../components/FavoriteCities";

const Favorites = async () => {
  return (
    <Box
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      <Typography variant="h5" marginBottom={4} textAlign="center">
        Favorites
      </Typography>
      <FavoriteCities />
    </Box>
  );
};

export default Favorites;
