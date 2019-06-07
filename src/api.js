import axios from "axios";
import authHeader from "./helper/authHeader";

const API_ROOT = "https://conduit.productionready.io/api";
const responseBody = res => res.data;

axios.defaults.baseURL = API_ROOT;

const requests = {
  get: url => axios.get(url, authHeader()).then(responseBody),
  post: (url, body) => axios.post(url, body, authHeader()).then(responseBody),
  delete: url => axios.delete(url, authHeader()).then(responseBody),
  put: (url, body) => axios.put(url, body, authHeader()).then(responseBody)
};

const Articles = {
  all: () => requests.get(`/articles?limit=70`),
  get: slug => requests.get(`/articles/${slug}`)
};

const Auth = {
  register: (username, email, password) => {
    return requests.post("/users", {
      user: { username, email, password }
    });
  },
  login: (email, password) => {
    return requests.post("/users/login", {
      user: { email, password }
    });
  },
  currentUser: () => requests.get("/user"),
  updateSetting: user => requests.put("/user", { user })
};

const Comments = {
  get: slug => requests.get(`/articles/${slug}/comments`),
  post: (slug, comment) => requests.post(`/articles/${slug}/comments`, comment),
  delete: (slug, id) => requests.delete(`/articles/${slug}/comments/${id}`)
};

export default { Articles, Auth, Comments };
