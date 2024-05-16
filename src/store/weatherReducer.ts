import { SelectedCity } from "@/app/utils/weather.types";

type State = {
  selectedCity: SelectedCity | null;
  favorites: string[] | null;
};

export enum ACTIONS {
  SET_SELECTED_CITY = "setSelectedCity",
  TOGGLE_FAVORITE = "toggleFavorite",
  SET_FAVORITES = "setFavorites",
}
export type ReducerWithAction = {
  type: ACTIONS;
  payload?: SelectedCity | string | string[] | null;
};

export const initialState: State = {
  selectedCity: null,
  favorites: null,
};

export const weatherReducer = (
  state: State,
  action: ReducerWithAction
): State => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_CITY: {
      return {
        ...state,
        selectedCity: action.payload as SelectedCity,
      };
    }
    case ACTIONS.TOGGLE_FAVORITE: {
      const favorites = state.favorites || [];
      const newFavorite = action.payload as string;
      let newFavorites;

      if (favorites.includes(newFavorite)) {
        newFavorites = favorites.filter((favorite) => favorite !== newFavorite);
      } else {
        newFavorites = [...favorites, newFavorite];
      }

      return {
        ...state,
        favorites: newFavorites,
      };
    }
    case ACTIONS.SET_FAVORITES: {
      const newFavorites = action.payload as string[];
      return {
        ...state,
        favorites: newFavorites,
      };
    }
    default:
      return state;
  }
};
