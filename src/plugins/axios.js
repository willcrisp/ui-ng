import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://localhost:8080"
      : "http://nanodlp.com:8080",
  // Other axios configurations
});

export default instance;
