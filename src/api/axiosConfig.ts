import axios from "axios";
import { responseErrorInterceptor, responseInterceptor } from "./interceptors/responseInterceptor";
export const apiUrl = process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api";

const createAxios = (authHeader: boolean) => {
    const instance = axios.create({
        baseURL: apiUrl, // Sets a base URL for all requests
        timeout: 5000, // Sets a default timeout for all requests (in milliseconds)
        headers: authHeader ? {
            ...axios.defaults.headers,
            Authorization: localStorage.getItem("token"),   //Sets authorization for all requests
        } : axios.defaults.headers
    });
    instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor)
    return instance
}

export const authAxios = createAxios(true)
export const noAuthAxios = createAxios(false)

