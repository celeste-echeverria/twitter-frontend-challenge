import { authAxios, noAuthAxios } from "../axiosConfig";
import { SingInData, SingUpData } from "../../interfaces/auth.interface";

//TODO: JUANMA preguntar si en signup, signin mando con o sin header de Authorization
export const signUp = async (data: Partial<SingUpData>) => {
  const res = await noAuthAxios.post(`/auth/signup`, data);
  if (res.status === 201) {
    localStorage.setItem("token", `Bearer ${res.data.token}`);
    return true;
  }
}

export const signIn = async (data: SingInData) => {
  const res = await noAuthAxios.post(`/auth/login`, data);
  if (res.status === 200) {
    localStorage.setItem("token", `Bearer ${res.data.token}`);
    return true;
  }
}

export const isLogged = async () => {
  const res = await authAxios.get(`/user/me`);
  return res.status === 200;
}

export const verifyAuth = async () => {
  const res = await authAxios.get(`/auth/verify`);
  return res.status === 200;
}