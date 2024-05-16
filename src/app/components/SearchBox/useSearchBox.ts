import { debounce } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { SearchBoxOption } from "@/types";

interface UseSearchBoxReturnProps {
  searchValue: string | null;
  debouncedLoadData: (searchValue: string) => void;
  setSearchValueHandler: (newValue: string) => void;
  searchResults: SearchBoxOption[];
}

interface UseSearchBoxProps {
  getSearchResults: (searchTerm: string) => Promise<SearchBoxOption[]>;
}

const DEBOUNCE_DELAY_MS = 500;

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

  return {
    searchValue,
    debouncedLoadData,
    setSearchValueHandler,
    searchResults,
  };
};

export default useSearchBox;
