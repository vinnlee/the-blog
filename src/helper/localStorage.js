export const saveToken = (token) => {
  try {
    localStorage.setItem('jwt', JSON.stringify(token));
  } catch (error) {
    //
  }
};
export const getToken = () => {
  try {
    const token = localStorage.getItem('jwt');
    if (token === null) {
      return undefined;
    }
    return JSON.parse(token);
  } catch (error) {
    return undefined;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('jwt');
  } catch (error) {
    //
  }
};
