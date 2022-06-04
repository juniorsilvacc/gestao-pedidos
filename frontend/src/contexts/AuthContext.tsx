import { createContext, ReactNode, useState } from 'react';
import { destroyCookie } from 'nookies';
import Router from 'next/router'

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
    console.log('Dados para logar', email, password)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}
