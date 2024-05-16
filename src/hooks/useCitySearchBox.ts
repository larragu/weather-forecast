import { getCities, getWeather } from "../service/weatherClient";
import useSearchBox from "./useSearchBox";
import { SelectedCity } from "@/app/utils/weather.types";
import { SearchBoxOption } from "@/types";

interface UseCitySearchBoxReturnProps {
  cityInputHandler: (_event: React.SyntheticEvent, newValue: any) => void;
  selectCityHandler: (_event: React.SyntheticEvent, newValue: any) => void;
  searchResults: SearchBoxOption[];
  searchValue: string | null;
}

interface UseCitySearchBoxProps {
  onSelectCity: (selectedCity: SelectedCity) => void;
}

const getSearchResults = async (searchTerm: string) => {
  console.log("yoyo: ", searchTerm);
  const cities = await getCities(searchTerm);
  const formattedCities = cities?.map((city) => ({
    id: `${city.lat}, ${city.lon}`,
    label: city.name,
  }));
  return formattedCities;
};

const useCitySearchBox = ({
  onSelectCity,
}: UseCitySearchBoxProps): UseCitySearchBoxReturnProps => {
  const {
    debouncedLoadData,
    setSearchValueHandler,
    searchResults,
    searchValue,
  } = useSearchBox({
    getSearchResults,
  });

  const cityInputHandler = (_event: React.SyntheticEvent, newValue: any) => {
    setSearchValueHandler(newValue);
    debouncedLoadData(newValue);
  };

  const selectCityHandler = (_event: React.SyntheticEvent, newValue: any) => {
    if (newValue?.label) {
      getWeather(newValue.label).then((city) => {
        onSelectCity(city);
      });
    }
  };

  return {
    cityInputHandler,
    selectCityHandler,
    searchResults,
    searchValue,
  };
};

export default useCitySearchBox;
