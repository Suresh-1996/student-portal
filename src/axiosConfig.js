// src/axiosConfig.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"; // Replace with backend URL

axios.interceptors.request.use(
  (config) => {
    // Dynamically import the store here to avoid circular dependency
    const { studentAuth } = require("./redux/store").default.getState();
    if (studentAuth.token) {
      config.headers.Authorization = `Bearer ${studentAuth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
