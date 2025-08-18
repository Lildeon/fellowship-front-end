import axios from "axios";

const api = axios.create({
  baseURL: "https://fellowship-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default api;
