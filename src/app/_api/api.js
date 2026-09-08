import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:1111",
  headers: { "Content-Type": "application/json" },
});
