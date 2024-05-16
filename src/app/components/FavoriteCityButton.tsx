"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useWeatherContext } from "@/store/useWeatherContext";
import { IconButton } from "@mui/material";

interface FavoriteCityProps {
  id: string;
}

const FavoriteCityButton = ({ id }: FavoriteCityProps): JSX.Element => {
  const { favorites, toggleFavorite } = useWeatherContext();

  const toggleFavoriteHandler = () => {
    toggleFavorite(id);
  };

  const isFavorite = favorites?.find((favorite) => favorite === id);

  return (
    <IconButton onClick={toggleFavoriteHandler} aria-label="favorite">
      {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteCityButton;
