function IsJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const _storeData = (key: string, value: string | object) => {
  let data: string = typeof value == "object" ? JSON.stringify(value) : value;
  localStorage.setItem(key, data);
};

export const _retrieveData = (key: string) => {
  const value: any = localStorage.getItem(key);
  if (value !== null) {
    if (IsJsonString(value)) return JSON.parse(value);
    else return value;
  }
  return null;
};

export const _clearData = async (key: string) => {
  localStorage.removeItem(key);
};
