import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { getCities, getWeather } from "../../../service/weather.api";
import { useSearchBox } from "../SearchBox";
import { BasicWeather, SearchBoxOption } from "@/types";
import { useToast } from "@/app/components/Toast";
import { getOptionLabel } from "@/utils";

interface UseCitySearchBoxReturnProps {
  onChange: (event: SyntheticEvent, value: string) => void;
  onSubmit: (
    event: SyntheticEvent,
    value: SearchBoxOption | string | null
  ) => void;
  searchResults: SearchBoxOption[];
  searchValue: string;
}

interface UseCitySearchBoxProps {
  onSubmitCity: (selectedCity: BasicWeather) => void;
}

const useCitySearchBox = ({
  onSubmitCity,
}: UseCitySearchBoxProps): UseCitySearchBoxReturnProps => {
  const [error, setError] = useState<string>("");
  const toast = useToast();

  const getSearchResults = useCallback(
    async (
      searchQuery: string,
      signal: AbortSignal
    ): Promise<SearchBoxOption[]> => {
      setError("");
      try {
        const results = await getCities(searchQuery, signal);

        const formattedCities = results.map(({ id, name }) => ({
          value: String(id),
          label: name,
        }));

        return formattedCities;
      } catch (error) {
        if (error instanceof DOMException) {
        } else if (error instanceof Error) {
          setError(error.message);
        }
        return [];
      }
    },
    []
  );

  const {
    debounceLoadResults,
    setSearchValue,
    searchResults,
    onSubmit,
    searchValue,
  } = useSearchBox({
    getSearchResults,
  });

  useEffect(() => {
    if (error) {
      toast({ message: error, status: "error" });
    }
  }, [error, toast]);

  const changeCityHandler = (_event: SyntheticEvent, value: string) => {
    setSearchValue(value);
    debounceLoadResults(value);
  };

  const submitCityHandler = async (
    _event: SyntheticEvent,
    value: SearchBoxOption | string | null
  ) => {
    setError("");
    if (value) {
      const label = getOptionLabel(value);
      try {
        const weather = await getWeather(label);
        if (weather) {
          onSubmit();
          onSubmitCity(weather);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  };

  return {
    onChange: changeCityHandler,
    onSubmit: submitCityHandler,
    searchResults,
    searchValue,
  };
};

export default useCitySearchBox;
