import { debounce } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { SearchBoxOption } from "@/types";

interface UseSearchBoxReturnProps {
  searchValue: string | null;
  debouncedLoadData: (searchValue: string) => void;
  setSearchValue: (newValue: string) => void;
  searchResults: SearchBoxOption[];
  resetSearchResults: () => void;
}

interface UseSearchBoxProps {
  getSearchResults: (searchQuery: string) => Promise<SearchBoxOption[]>;
}

const DEBOUNCE_DELAY_MS = 400;

const useSearchBox = ({
  getSearchResults,
}: UseSearchBoxProps): UseSearchBoxReturnProps => {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const [debouncedValue, setDebouncedValue] = useState<string | null>("");
  const [searchResults, setSearchResults] = useState<SearchBoxOption[]>([]);

  const debouncedLoadData = useCallback(
    debounce((newValue) => {
      setDebouncedValue(newValue);
    }, DEBOUNCE_DELAY_MS),
    []
  );

  useEffect(() => {
    if (debouncedValue) {
      const fetchData = async () => {
        const searchResults = await getSearchResults(debouncedValue);
        setSearchResults(searchResults);
      };
      fetchData();
    }
  }, [debouncedValue]);

  const setSearchValueHandler = (newValue: string) => {
    setSearchValue(newValue);
  };

  const resetSearchResultsHandler = () => {
    setSearchResults([]);
  };

  return {
    searchValue,
    debouncedLoadData,
    setSearchValue: setSearchValueHandler,
    searchResults,
    resetSearchResults: resetSearchResultsHandler,
  };
};

export default useSearchBox;
