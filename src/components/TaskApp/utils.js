export const setItemStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const getItemStorage = (key, value) =>
  JSON.parse(window.localStorage.getItem(key, value));
