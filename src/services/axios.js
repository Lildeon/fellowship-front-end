import axios from "axios";

const api = axios.create({
  baseURL: "https://fellowship-backend.onrender.com",

  withCredentials: true,
});
export default api;
