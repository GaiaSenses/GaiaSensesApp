/**
 * @format
 */

import React, { createContext, useState, PropsWithChildren } from 'react';
import { SignInResponse } from '../services/auth';

type UserContextProps = {
  userData?: SignInResponse;
  setUserData?: (data: any) => void;
};

type AuthProviderProps = PropsWithChildren<{}>;

export const UserContext = createContext<UserContextProps>({});

export function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<SignInResponse>();

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
