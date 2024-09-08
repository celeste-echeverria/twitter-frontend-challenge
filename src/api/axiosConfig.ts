import axios from "axios";
import { responseInterceptor } from "./interceptors/responseInterceptor";
export const apiUrl = process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api";

const createAxios = (authHeader: boolean) => {
    const instance = axios.create({
        baseURL: apiUrl, // Sets a base URL for all requests
        timeout: 5000, // Sets a default timeout for all requests (in milliseconds)
    });
    instance.interceptors.response.use(responseInterceptor)
    return instance
}

const authAxios = createAxios(true)
const noAuthAxios = createAxios(false)

export {authAxios, noAuthAxios}


