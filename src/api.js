import axios from "axios";
import authHeader from "./helper/authHeader";

const API_ROOT = "https://conduit.productionready.io/api";
const headers = authHeader();
const responseBody = res => res.data;

axios.defaults.baseURL = API_ROOT;

const requests = {
  get: url => axios.get(url, headers).then(responseBody),
  post: (url, body) => axios.post(url, body, headers).then(responseBody),
  delete: url => axios.delete(url, headers).then(responseBody)
};

const Articles = {
  all: () => requests.get(`/articles?limit=40`),
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
  currentUser: () => requests.get("/user")
};

const Comments = {
  get: slug => requests.get(`/articles/${slug}/comments`),
  post: (slug, comment) => requests.post(`/articles/${slug}/comments`, comment),
  delete: (slug, id) => requests.delete(`/articles/${slug}/comments/${id}`)
};

export default { Articles, Auth, Comments };
