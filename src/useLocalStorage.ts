"use client";

import { useCallback } from "react";

interface UseLocalStorageReturnProps {
  getLocalStorageData: <T>(key: string) => T | null;
  setLocalStorageData: <T>(key: string, data: T) => void;
}

const localStorage = typeof window !== "undefined" ? window.localStorage : null;

const useLocalStorage = (): UseLocalStorageReturnProps => {
  const getData = useCallback(<T>(key: string): T | null => {
    let data = null;
    if (localStorage) {
      const savedData = localStorage.getItem(key);
      data = savedData ? (JSON.parse(savedData) as T) : null;
    }

    return data;
  }, []);

  const setData = useCallback(<T>(key: string, data: T): void => {
    if (localStorage) {
      if (data) {
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        localStorage.removeItem(key);
      }
    }
  }, []);

  return {
    getLocalStorageData: getData,
    setLocalStorageData: setData,
  };
};

export default useLocalStorage;
