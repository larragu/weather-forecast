"use client";

import useCitySearchBox from "./useCitySearchBox";
import { useWeatherContext } from "@/store/useWeatherContext";
import SearchBox from "../SearchBox/SearchBox";

const CitySearchBox = (): JSX.Element => {
  const { setSelectedCity } = useWeatherContext();
  const { searchValue, searchResults, cityInputHandler, selectCityHandler } =
    useCitySearchBox({ onSelectCity: setSelectedCity });

  return (
    <SearchBox
      searchResults={searchResults}
      searchValue={searchValue}
      onSearchBoxInputChange={cityInputHandler}
      onSearchBoxChange={selectCityHandler}
    />
  );
};

export default CitySearchBox;
