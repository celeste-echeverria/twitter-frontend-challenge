import axios, { AxiosError } from "axios";
import { authAxios, noAuthAxios } from "../axiosConfig";
import { QueryParams } from ".";

type FetcherProps <
  TResultData = any,
  TStatus = string, 
  TError = Error //TODO: revisar tipo de errores
> = {
  endpoint: string;
  params?: QueryParams;
  data?: unknown;
  method?: string;
  returnFullResponse?: boolean
}
export interface UseFetcherProps <
  path = string,
  params = QueryParams,
  body = unknown,
  method = string,
  returnFullResponse = boolean
> extends FetcherProps {}

async function fetcher<
  TResultData= unknown, 
  TStatus = number,
  TError = Error> ({
  endpoint,
  method,
  params,
  data,
  returnFullResponse = false
}: FetcherProps<TResultData, TStatus, TError>) {
  try {

    console.log('fetching ', endpoint )
    const config = { params };
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await authAxios({
      method: method, 
      url: endpoint,
      headers: headers,
      data: data,
      ...config
    });
    console.log('RESPONSE FROM FETCHER IS ', res)
    return returnFullResponse ? res : res.data
    
  } catch (error) {
    if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Error fetching data');
    }
    throw new Error('Unexpected error');
  }
}

export default fetcher


