// src/storage.js

// Save content to local storage
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  // Load content from local storage
  export const loadFromLocalStorage = (key) => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : null;
  };
  
  // Remove content from local storage
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  