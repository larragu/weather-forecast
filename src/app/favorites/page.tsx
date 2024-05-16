import { Stack, Typography } from "@mui/material";
import FavoriteCities from "../components/FavoriteCities";

const Favorites = async () => {
  return (
    <>
      <Typography variant="h5">Favorites</Typography>
      <FavoriteCities />
    </>
  );
};

export default Favorites;
