import axios from "axios";

const api = axios.create({
  baseURL: "https://fellowships.netlify.app",
  withCredentials: true,
});
export default api;
