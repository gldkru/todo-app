export const setItemStorage = (key, value) =>
  window.localStorage.setItem(key, value);

export const getItemStorage = (key, value) =>
  window.localStorage.getItem(key, value);
