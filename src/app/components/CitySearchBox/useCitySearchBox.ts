import { SyntheticEvent } from "react";
import { getCities, getWeather } from "../../../service/weatherClient";
import useSearchBox from "../SearchBox/useSearchBox";
import { BasicWeather, SearchBoxOption } from "@/types";

interface UseCitySearchBoxReturnProps {
  onChange: (event: React.SyntheticEvent) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  searchResults: SearchBoxOption[];
  searchValue: string | null;
}

interface UseCitySearchBoxProps {
  onSubmitCity: (selectedCity: BasicWeather) => void;
}

const getSearchResults = async (searchQuery: string, signal: AbortSignal) => {
  try {
    const results = await getCities(searchQuery, signal);

    const formattedCities = results.map((city) => ({
      id: `${city.lat}, ${city.lon}`,
      label: city.name,
    }));
    return formattedCities;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    return [];
  }
};

const useCitySearchBox = ({
  onSubmitCity,
}: UseCitySearchBoxProps): UseCitySearchBoxReturnProps => {
  const {
    debounceLoadResults,
    setSearchValue,
    searchResults,
    onSubmit,
    searchValue,
  } = useSearchBox({
    getSearchResults,
  });

  const onChangeCity = (event: React.SyntheticEvent) => {
    const newValue = event ? (event.target as HTMLInputElement).value : "";

    setSearchValue(newValue);
    debounceLoadResults(newValue);
  };

  const submitCityHandler = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLFormElement;

    if (value) {
      getWeather(value).then((city) => {
        onSubmit();
        onSubmitCity(city);
      });
    }
  };

  return {
    onChange: onChangeCity,
    onSubmit: submitCityHandler,
    searchResults,
    searchValue,
  };
};

export default useCitySearchBox;
