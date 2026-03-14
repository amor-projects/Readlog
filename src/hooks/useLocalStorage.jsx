import { useState, useEffect } from 'react';

function useLocalStorage (key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return defaultValue;
      return JSON.parse(stored);
    } catch (err) {
      console.warn('Corrupted LocalStorage, resetting...');
      localStorage.removeItem(key);
      return defaultValue;
    }
  });
  useEffect (() =>{
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value]);
  return [value, setValue];
}

export default useLocalStorage;