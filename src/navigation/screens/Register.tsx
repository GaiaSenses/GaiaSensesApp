/**
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Form, Logo } from '../../components';
import useAuth from '../../hooks/useAuth';
import { SignUpRequest } from '../../services/auth';
import { RootStackScreenProps } from '../types';

type RegisterProps = RootStackScreenProps<'Register'>;

export function Register({ navigation }: RegisterProps): JSX.Element {
  const { authActions } = useAuth();

  const handleRegister = (info: SignUpRequest) => {
    authActions.signUp(info);
  };

  return (
    <View style={style.container}>
      <Logo />

      <Text variant="headlineLarge" style={style.title}>
        Register
      </Text>

      <Form onRegister={handleRegister} enabled />

      <Button icon="arrow-left" onPress={() => navigation.pop()}>
        Go Back
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
