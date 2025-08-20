import axios from "axios";

const api = axios.create({
  baseURL: "https://fellowship-backend.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default api;
