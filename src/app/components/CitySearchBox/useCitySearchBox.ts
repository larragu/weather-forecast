import { getCities, getWeather } from "../../../service/weatherClient";
import useSearchBox from "../SearchBox/useSearchBox";
import { BasicWeather, SearchBoxOption } from "@/types";

interface UseCitySearchBoxReturnProps {
  cityInputHandler: (_event: React.SyntheticEvent, newValue: string) => void;
  selectCityHandler: (
    _event: React.SyntheticEvent,
    newValue: SearchBoxOption
  ) => void;
  searchResults: SearchBoxOption[];
  searchValue: string | null;
}

interface UseCitySearchBoxProps {
  onSelectCity: (selectedCity: BasicWeather) => void;
}

const getSearchResults = async (searchQuery: string) => {
  const cities = await getCities(searchQuery);
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
    setSearchValue,
    searchResults,
    resetSearchResults,
    searchValue,
  } = useSearchBox({
    getSearchResults,
  });

  const cityInputHandler = (_event: React.SyntheticEvent, newValue: string) => {
    setSearchValue(newValue);
    debouncedLoadData(newValue);
  };

  const selectCityHandler = (
    _event: React.SyntheticEvent,
    newValue: SearchBoxOption
  ) => {
    if (newValue?.label) {
      getWeather(newValue.label).then((city) => {
        setSearchValue("");
        resetSearchResults();
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
