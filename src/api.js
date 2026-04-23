import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-app-1e2m.onrender.com", // your Render backend
});

export default api;
