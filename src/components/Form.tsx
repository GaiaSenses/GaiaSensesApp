/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SignInRequest, SignUpRequest } from '../services/auth';

type FormProps = {
  enabled?: boolean;
  onLogin?: (info: SignInRequest) => void;
  onRegister?: (info: SignUpRequest) => void;
};

export function Form({ enabled, onLogin, onRegister }: FormProps): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [showMissingInput, setShowMissingInput] = useState(false);
  const [hasConfirmError, setHasConfirmError] = useState(false);

  const togglePasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisible = () => setIsConfirmVisible(!isConfirmVisible);

  const isMissing = (input: string) => input.trim() === '';

  const hasMissingInput = () => {
    const inputs = onRegister
      ? [name, email, password, confirmPassword]
      : [email, password];

    return inputs
      .map((input) => isMissing(input))
      .reduce((previous, current) => previous || current);
  };

  const handleLogin = () => {
    if (hasMissingInput()) {
      setShowMissingInput(true);
    } else {
      onLogin && onLogin({ email, password });
    }
  };

  const handleRegister = () => {
    if (hasMissingInput()) {
      setShowMissingInput(true);
    } else if (password !== confirmPassword) {
      setHasConfirmError(true);
    } else {
      onRegister && onRegister({ name, email, password });
    }
  };

  return (
    <View style={style.form}>
      {onRegister && (
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          inputMode="text"
          autoComplete="name"
          disabled={!enabled}
          error={showMissingInput && isMissing(name)}
          style={style.formItem}
        />
      )}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        disabled={!enabled}
        error={showMissingInput && isMissing(email)}
        style={style.formItem}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        autoComplete="password"
        autoCapitalize="none"
        disabled={!enabled}
        error={showMissingInput && isMissing(password)}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye-off' : 'eye'}
            onPress={togglePasswordVisible}
          />
        }
        style={style.formItem}
      />
      {onRegister && (
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmVisible}
          autoComplete="password"
          autoCapitalize="none"
          disabled={!enabled}
          error={
            showMissingInput && (isMissing(confirmPassword) || hasConfirmError)
          }
          right={
            <TextInput.Icon
              icon={isConfirmVisible ? 'eye-off' : 'eye'}
              onPress={toggleConfirmVisible}
            />
          }
          style={style.formItem}
        />
      )}
      {onLogin && (
        <Button
          mode="contained"
          onPress={handleLogin}
          disabled={!enabled}
          style={style.formItem}>
          Login
        </Button>
      )}
      {onRegister && (
        <Button
          mode="contained"
          onPress={handleRegister}
          disabled={!enabled}
          style={style.formItem}>
          Register
        </Button>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  form: {
    width: '80%',
  },
  formItem: {
    marginBottom: 20,
  },
});
