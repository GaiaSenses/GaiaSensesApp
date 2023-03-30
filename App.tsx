/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import {
  AppDarkTheme,
  AppLightTheme,
  NavigatorDarkTheme,
  NavigatorLightTheme,
} from './src/styles';
import { RootNavigator } from './src/navigation/navigators';
import { AuthProvider } from './src/contexts/UserContext';

export default function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const appTheme = isDark ? AppDarkTheme : AppLightTheme;
  const navTheme = isDark ? NavigatorDarkTheme : NavigatorLightTheme;

  return (
    <AuthProvider>
      <PaperProvider theme={appTheme}>
        <NavigationContainer theme={navTheme}>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={appTheme.colors.background}
          />
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
