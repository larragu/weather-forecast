import { SelectedCity } from "@/app/utils/weather.types";

type State = {
  selectedCity: SelectedCity | null;
  favorites: string[];
};

export enum ACTIONS {
  SET_SELECTED_CITY = "setSelectedCity",
  TOGGLE_FAVORITE = "toggleFavorite",
}
export type ReducerWithAction = {
  type: ACTIONS;
  payload?: SelectedCity | string;
};

export const initialState: State = {
  selectedCity: null,
  favorites: [],
};

export const weatherReducer = (
  state: State,
  action: ReducerWithAction
): State => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.payload as SelectedCity,
      };
    case ACTIONS.TOGGLE_FAVORITE:
      const newFavorite = action.payload as string;
      let newFavorites;

      if (state.favorites.includes(newFavorite)) {
        newFavorites = state.favorites.filter(
          (favorite) => favorite !== newFavorite
        );
      } else {
        newFavorites = [...state.favorites, newFavorite];
      }

      return {
        ...state,
        favorites: newFavorites,
      };
    default:
      return state;
  }
};
