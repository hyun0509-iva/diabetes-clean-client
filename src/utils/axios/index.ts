import axios, { AxiosResponse } from "axios";
import { URL_LIST } from "constants/url";

const { DEV_API_URL, PROD_API_URL } = URL_LIST;
export interface ResponseErrorType {
  code: string;
  msg: string;
  response: AxiosResponse;
  status: number;
}

const api = axios.create({
  baseURL: PROD_API_URL || DEV_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
