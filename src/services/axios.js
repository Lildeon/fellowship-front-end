import axios from "axios";

const api = axios.create({
  baseURL: "https://fellowship-backend.up.railway.app",

  withCredentials: true,
});
export default api;
