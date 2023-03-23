/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from './src/styles';

export default function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const theme: Theme = {
    dark: isDark,
    colors: {
      primary: Colors.primary,
      background: isDark ? Colors.dark.background : Colors.light.background,
      card: isDark ? Colors.dark.surface : Colors.light.surface,
      text: isDark ? Colors.dark.text : Colors.light.text,
      border: isDark ? Colors.dark.border : Colors.light.border,
      notification: Colors.secondary,
    },
  };

  return (
    <PaperProvider>
      <NavigationContainer theme={theme}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? theme.colors.card : theme.colors.card}
        />
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
