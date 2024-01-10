export const storePlayer = (value) => {
  storeKeyValue("Player", value);
};
export const storeTheme = (value) => {
  storeKeyValue("Theme", value);
};
export const storeClub = (value) => {
  storeKeyValue("Club", value);
};
export const storeAdmin = (value) => {
  storeKeyValue("Admin", value);
};
export const storeUid = (value) => {
  storeKeyValue("uid", value);
};

export const getPlayer = () => {
  return getKeyValue("Player");
};
export const getTheme = () => {
  return getKeyValue("Theme");
};
export const getClub = () => {
  return getKeyValue("Club");
};
export const getAdmin = () => {
  return getKeyValue("Admin");
};
export const getUid = () => {
  return getKeyValue("uid");
};

const storeKeyValue = (key, value) => {
  window.localStorage.setItem(key, value);
};

const getKeyValue = (key) => {
  return window.localStorage.getItem(key);
};
