import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_APIBase_Url,
  headers: {
    ["Content-Type"]: "application/json",
  },
});
