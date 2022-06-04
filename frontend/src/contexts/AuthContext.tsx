import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';  

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  login: (credentials: LoginProps) => Promise<void>;
  logout: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type LoginProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function logout() {
  try {
    destroyCookie(undefined, "@auth.token")
    Router.push("/")
  } catch (error) {
    console.log(error)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function login({email, password}: LoginProps) {
    try {
      const response = await api.post("/api/users/login", {
        email,
        password
      })

      const { id, name, token } = response.data;

      setCookie(undefined, "@auth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 1 Mês
        path: "/" // Quais caminhos ter acesso aos cookies
      })

      setUser({
        id,
        name,
        email,
      })

      // Passar para prox. requisições o token
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}
