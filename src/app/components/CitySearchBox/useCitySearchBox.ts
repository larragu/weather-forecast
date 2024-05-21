import { getCities, getWeather } from "../../../service/weatherClient";
import useSearchBox from "../SearchBox/useSearchBox";
import { BasicWeather } from "@/types";
import { SearchBoxOption } from "@/types";

interface UseCitySearchBoxReturnProps {
  cityInputHandler: (_event: React.SyntheticEvent, newValue: any) => void;
  selectCityHandler: (_event: React.SyntheticEvent, newValue: any) => void;
  searchResults: SearchBoxOption[];
  searchValue: string | null;
}

interface UseCitySearchBoxProps {
  onSelectCity: (selectedCity: BasicWeather) => void;
}

const getSearchResults = async (searchTerm: string) => {
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

  const cityInputHandler = (_event: React.SyntheticEvent, newValue: string) => {
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
