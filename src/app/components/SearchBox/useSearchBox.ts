import { useState, useEffect, useRef } from "react";
import { SearchBoxOption } from "@/types";

interface UseSearchBoxReturnProps {
  searchValue: string;
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
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchBoxOption[]>([]);
  const timeoutIdRef = useRef<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const debounceLoadResults = (newSearchValue: string): void => {
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

      return () => {
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
      };
    }
  }, [debouncedValue, getSearchResults]);

  const setSearchValueHandler = (newValue: string): void => {
    setSearchValue(newValue);
  };

  const clearData = (): void => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setSearchValue("");
    setDebouncedValue("");
    setSearchResults([]);
  };

  const onSubmitHandler = (): void => {
    clearData();
    const reason = new DOMException();
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
