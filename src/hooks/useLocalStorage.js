import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storage, setStorage] = useState(() => {
    const storageStr = window.localStorage.getItem(key);

    if (storageStr) {
      return JSON.parse(storageStr);
    } else {
      return initialValue;
    }
  });

  const setValue = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));

    setStorage(value);
  };

  return [storage, setValue];
};
