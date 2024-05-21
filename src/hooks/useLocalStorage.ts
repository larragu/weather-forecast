"use client";

interface UseLocalStorageReturnProps {
  getLocalStorageData: <T>(key: string) => T | null;
  setLocalStorageData: <T>(key: string, data: T) => void;
}

const localStorage = typeof window !== "undefined" ? window.localStorage : null;

const useLocalStorage = (): UseLocalStorageReturnProps => {
  const getData = <T>(key: string): T | null => {
    let data = null;
    if (localStorage) {
      const savedData = localStorage.getItem(key);
      data = savedData ? (JSON.parse(savedData) as T) : null;
    }

    return data;
  };

  const setData = <T>(key: string, data: T): void => {
    if (localStorage) {
      if (data) {
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        localStorage.removeItem(key);
      }
    }
  };

  return {
    getLocalStorageData: getData,
    setLocalStorageData: setData,
  };
};

export default useLocalStorage;
