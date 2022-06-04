import { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  login: (credentials: LoginProps) => Promise<void>;
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

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function login() {
    alert('Clickou no login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider