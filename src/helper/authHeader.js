import { getToken } from "./localStorage";

const authHeader = () => {
  let user = getToken();
  if (!!user) {
    return {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Token ${user}`
      }
    };
  } else {
    return {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };
  }
};

export default authHeader;
