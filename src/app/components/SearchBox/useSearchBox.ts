import { useState, useEffect, useRef } from "react";
import { SearchBoxOption } from "@/types";

interface UseSearchBoxReturnProps {
  searchValue: string | null;
  debounceLoadResults: (searchValue: string) => void;
  setSearchValue: (newValue: string) => void;
  searchResults: SearchBoxOption[];
  onSubmit: () => void;
}

interface UseSearchBoxProps {
  getSearchResults: (
    searchQuery: string,
    signal: AbortSignal
  ) => Promise<SearchBoxOption[]>;
}

const DEBOUNCE_DELAY_MS = 400;

const useSearchBox = ({
  getSearchResults,
}: UseSearchBoxProps): UseSearchBoxReturnProps => {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const [debouncedValue, setDebouncedValue] = useState<string | null>("");
  const [searchResults, setSearchResults] = useState<SearchBoxOption[]>([]);
  const timeoutIdRef = useRef<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const debounceLoadResults = (newSearchValue: string) => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(newSearchValue);
    }, DEBOUNCE_DELAY_MS);
    timeoutIdRef.current = timeoutId;
  };

  useEffect(() => {
    if (debouncedValue) {
      const fetchData = async () => {
        controllerRef.current = new AbortController();

        const searchResults = await getSearchResults(
          debouncedValue,
          controllerRef.current.signal
        );

        setSearchResults(searchResults);
      };

      fetchData();
    }
  }, [debouncedValue, getSearchResults]);

  const setSearchValueHandler = (newValue: string) => {
    setSearchValue(newValue);
  };

  const clearData = () => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setSearchValue("");
    setDebouncedValue("");
    setSearchResults([]);
  };

  const onSubmitHandler = () => {
    clearData();
    const reason = new DOMException("Fetch aborted", "AbortError");
    controllerRef.current?.abort(reason);
  };

  return {
    searchValue,
    debounceLoadResults,
    setSearchValue: setSearchValueHandler,
    searchResults,
    onSubmit: onSubmitHandler,
  };
};

export default useSearchBox;
