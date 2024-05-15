import { SelectedCity } from "@/app/utils/weather.types";

type State = {
  selectedCity: SelectedCity | null;
};

export enum ACTIONS {
  SET_SELECTED_CITY = "setSelectedCity",
}
export type ReducerWithAction = {
  type: ACTIONS;
  payload?: SelectedCity;
};

export const initialState: State = {
  selectedCity: null,
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
    default:
      return state;
  }
};
