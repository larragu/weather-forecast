import { Stack, Typography } from "@mui/material";
import FavoriteCities from "../components/FavoriteCities";

const Favorites = async () => {
  return (
    <>
      <Typography variant="h5">Favorites</Typography>
      <Stack spacing={6} paddingX={{ sm: 2 }} paddingY={{ xs: 2 }}>
        <FavoriteCities />
      </Stack>
    </>
  );
};

export default Favorites;
