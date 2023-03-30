/**
 * @format
 */

import * as Keychain from 'react-native-keychain';
import { appClient } from './lib/client';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  name: string;
  email: string;
  token: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignUpResponse = string;

export const authService = {
  signUp: async (data: SignUpRequest) => {
    const res = await appClient.post<SignUpResponse>('/auth/signup', data);
    return res.data;
  },
  signIn: async (data: SignInRequest) => {
    const res = await appClient.post<SignInResponse>('/auth/signin', data);
    Keychain.setGenericPassword(res.data.email, JSON.stringify(res.data));
    return res.data;
  },
  signOut: () => Keychain.resetGenericPassword(),
  localCredentials: async () => {
    const data = await Keychain.getGenericPassword();
    return data ? (JSON.parse(data.password) as SignInResponse) : null;
  },
  setAuthorization: (token?: string | null) => {
    appClient.defaults.headers.common.Authorization = token;
  },
};
