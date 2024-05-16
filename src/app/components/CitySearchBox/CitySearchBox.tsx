"use client";
import { useRouter } from "next/navigation";
import useCitySearchBox from "./useCitySearchBox";
import { useWeatherContext } from "@/store/useWeatherContext";
import SearchBox from "../SearchBox/SearchBox";
import { BasicWeather } from "@/types";

const CitySearchBox = (): JSX.Element => {
  const router = useRouter();
  const { setSelectedCity } = useWeatherContext();
  const routeToHomePage = (selectedCity: BasicWeather) => {
    setSelectedCity(selectedCity);
    router.push("/");
  };
  const { searchValue, searchResults, cityInputHandler, selectCityHandler } =
    useCitySearchBox({ onSelectCity: routeToHomePage });

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
