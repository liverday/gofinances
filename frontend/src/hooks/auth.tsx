import React, { createContext, useContext, useState, useCallback } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: any;
}

interface SignUpCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string;
  user: any;
  signIn(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@GO_FINANCES/user');
    const token = localStorage.getItem('@GO_FINANCES/token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { user, token } = response.data;

    localStorage.setItem('@GO_FINANCES/user', JSON.stringify(user));
    localStorage.setItem('@GO_FINANCES/token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GO_FINANCES/user');
    localStorage.removeItem('@GO_FINANCES/token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, token: data.token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
