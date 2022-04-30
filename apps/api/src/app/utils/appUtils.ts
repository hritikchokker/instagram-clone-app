export const changeReference = (obj = {}) => {
  return JSON.parse(JSON.stringify(obj));
};
