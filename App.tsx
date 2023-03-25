/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { AppNavigator } from './src/navigation/navigators';
import {
  AppDarkTheme,
  AppLightTheme,
  NavigatorDarkTheme,
  NavigatorLightTheme,
} from './src/styles';

export default function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const appTheme = isDark ? AppDarkTheme : AppLightTheme;
  const navTheme = isDark ? NavigatorDarkTheme : NavigatorLightTheme;

  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer theme={navTheme}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={appTheme.colors.background}
        />
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
