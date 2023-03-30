/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Form, Logo } from '../../components';
import useAuth from '../../hooks/useAuth';
import { SignInRequest } from '../../services/auth';
import { RootStackScreenProps } from '../types';

type LoginProps = RootStackScreenProps<'Login'>;

export function Login({ navigation }: LoginProps): JSX.Element {
  const { authActions } = useAuth();
  const [isFormEnabled, setIsFormEnabled] = useState(true);

  useEffect(() => {
    const restore = async () => {
      const hasCredentials = await authActions.hasLocalCredentials();
      if (hasCredentials) {
        setIsFormEnabled(false);
        await authActions.restore();
      }
    };
    restore();
  }, [authActions]);

  const handleLogin = async (info: SignInRequest) => {
    try {
      await authActions.signIn(info);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={style.container}>
      <Logo />

      <Text variant="headlineLarge" style={style.title}>
        Login
      </Text>

      <Form onLogin={handleLogin} enabled={isFormEnabled} />

      <Button onPress={() => navigation.push('Register')}>
        First time? Sign up!
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
});
