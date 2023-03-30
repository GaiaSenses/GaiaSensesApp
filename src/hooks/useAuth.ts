/**
 * @format
 */

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { authService, SignInRequest, SignUpRequest } from '../services/auth';

export default function useAuth() {
  const { userData, setUserData } = useContext(AuthContext);

  const authActions = {
    signUp: (userInfo: SignUpRequest) => authService.signUp(userInfo),
    signIn: async (userInfo: SignInRequest) => {
      const user = await authService.signIn(userInfo);
      authService.setAuthorization(user.token);

      if (setUserData) {
        setUserData(user);
      }

      return user;
    },
    signOut: async () => {
      const res = await authService.signOut();
      authService.setAuthorization(null);

      if (setUserData) {
        setUserData(null);
      }

      return res;
    },
    restore: async () => {
      const user = await authService.localCredentials();
      authService.setAuthorization(user?.token);

      if (setUserData) {
        setUserData(user);
      }
    },
    hasLocalCredentials: async () => {
      return (await authService.localCredentials()) !== null;
    },
  };
  return { userData, authActions };
}
