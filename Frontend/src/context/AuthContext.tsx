

import { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';


interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//  Create a custom hook to use auth
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
