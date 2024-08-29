import { authAxios, noAuthAxios } from "../axiosConfig";
import { SignInData, SignUpData } from "../../interfaces/auth.interface";

export const isLogged = async () => {
  const res = await authAxios.get(`/user/me`);
  return res.status === 200;
}

export const verifyAuth = async () => {
  const res = await authAxios.get(`/auth/verify`);
  return res.status === 200;
}