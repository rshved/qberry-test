import axios from "axios";

export const BASE_URL = axios.create({
  baseURL:'https://www.breakingbadapi.com/api/'
})