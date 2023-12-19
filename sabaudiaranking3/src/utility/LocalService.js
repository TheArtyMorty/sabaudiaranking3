export const storePlayer = (value) => {
  storeKeyValue("Player", value);
};
export const storeClub = (value) => {
  storeKeyValue("Club", value);
};
export const storeAdmin = (value) => {
  storeKeyValue("Admin", value);
};

export const getPlayer = () => {
  return getKeyValue("Player");
};
export const getClub = () => {
  return getKeyValue("Club");
};
export const getAdmin = () => {
  return getKeyValue("Admin");
};

const storeKeyValue = (key, value) => {
  window.localStorage.setItem(key, value);
};

const getKeyValue = (key) => {
  return window.localStorage.getItem(key);
};
