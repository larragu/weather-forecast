import { BasicWeather } from "@/types";

type State = {
  selectedCity: BasicWeather | null;
  favorites: string[] | null;
};

export enum ACTIONS {
  SET_SELECTED_CITY = "setSelectedCity",
  TOGGLE_FAVORITE = "toggleFavorite",
  SET_FAVORITES = "setFavorites",
}
export type ReducerWithAction = {
  type: ACTIONS;
  payload?: BasicWeather | string | string[] | null;
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
        selectedCity: action.payload as BasicWeather,
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
        favorites: !!newFavorites.length ? newFavorites : null,
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
