
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = '/api/v1'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Authorization': Cookies.get("access-token")
  }
});