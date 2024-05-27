import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { getCities, getWeather } from "../../../service/weatherClient";
import useSearchBox from "../SearchBox/useSearchBox";
import { BasicWeather, SearchBoxOption } from "@/types";
import { useToast } from "@/app/Toast/ToastProvider";
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
  const [error, setError] = useState<string>();
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

  const submitCityHandler = (
    _event: SyntheticEvent,
    value: SearchBoxOption | string | null
  ) => {
    if (value) {
      const label = getOptionLabel(value);

      getWeather(label).then((city) => {
        onSubmit();
        onSubmitCity(city);
      });
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
