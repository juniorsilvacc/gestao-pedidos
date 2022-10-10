import React, { ReactNode, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// API
import api from '../services/api';

type UserProps = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  isAdmin: boolean;
}

type LoginProps = {
  email: string;
  password: string;
}

type RegisterProps = {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

type TokenState = {
  user: UserProps;
  token: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextData = {
  user: UserProps;
  login: (credentials: LoginProps) => Promise <void>;
  register: (credentials: RegisterProps) => Promise <void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<TokenState>(() => {
    const token = localStorage.getItem('@auth: token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    }

    return {} as TokenState;
  });

  async function login ({ email, password }: LoginProps){
    const response = await api.post('/api/users/login', {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem('@auth: token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  async function register(){}

  async function logout () {
    localStorage.removeItem('@auth: token');
    toast.success("Seu usuário foi feito deslogado.");
    navigate("/login");
    setData({} as TokenState);
  };

  return (
    <AuthContext.Provider value= {{ user: data.user, login, register, logout }}>
      { children }
    </AuthContext.Provider>
  )
}