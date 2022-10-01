import { createContext, ReactNode, useEffect, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';

import Router from 'next/router';

import { api } from '../services/apiClient';  

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  login: (credentials: LoginProps) => Promise<void>;
  register: (credentials: RegisterProps) => Promise<void>;
  logout: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

type LoginProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type RegisterProps = {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(() => {
    // Pegar cookie
    const { "@auth.token": token } = parseCookies();

    if (token) {
      api.get("/api/users/details").then((response) => {
        const { id, name, email, avatar } = response.data
        setUser({
          id, name, email, avatar
        })
      }).catch(() => {
        logout(); // Deslogar usuário
      })
    }
  }, []);

  async function login({email, password}: LoginProps) {
    try {
      const response = await api.post("/api/users/login", {
        email,
        password
      })

      const { id, name, token, avatar } = response.data;

      setCookie(undefined, "@auth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Tempo de expirar token
        path: "/" // Quais caminhos para ter acesso ao cookie(Todos)
      })

      setUser({
        id,
        name,
        email,
        avatar
      })

      // Passar para prox. requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success("Usuário logado com sucesso");

      Router.push("/dashboard");
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  }

  async function register({ name, email, password }: RegisterProps) {
    try {
      await api.post("/api/users/register", {
        name,
        email,
        password
      })

      toast.success("Usuário criado com success");

      Router.push("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      { children }
    </AuthContext.Provider>
  )
}

export function logout() {
  try {
    destroyCookie(undefined, "@auth.token")
    toast.success("Usuário deslogado");
    Router.push("/")
  } catch (error) {
    console.log(error)
  }
}
