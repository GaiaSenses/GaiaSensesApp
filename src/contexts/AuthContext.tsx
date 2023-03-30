/**
 * @format
 */

import React, { createContext, useState, PropsWithChildren } from 'react';
import { SignInResponse } from '../services/auth';

type AuthContextProps = {
  userData?: SignInResponse;
  setUserData?: (data: any) => void;
};

type AuthProviderProps = PropsWithChildren<{}>;

export const AuthContext = createContext<AuthContextProps>({});

export function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<SignInResponse>();

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
