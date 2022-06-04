import axios, { AxiosError, HeadersDefaults } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokensError";

import { logout } from "../contexts/AuthContext";

export function ApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@auth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Qualquer error 401 não autorizado, devemos deslogar o usuário
        if (typeof window !== undefined) {
          // Chamar a função para deslogar o usuário
          logout();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
