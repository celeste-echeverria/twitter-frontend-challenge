import axios from "axios";
import { SingInData, SingUpData } from "../types";
import { url } from '../config'

export const signUp = async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
}

export const signIn = async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
}

export const isLogged = async () => {
    const res = await axios.get(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.status === 200;
}

export const verifyAuth = async () => {
    const res = await axios.get(`${url}/auth/verify`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return true;
    } else return false
}