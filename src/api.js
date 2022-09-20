import axios from "axios";

const api = axios.create({
  baseURL: `https://localhost:4000/`,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default api;