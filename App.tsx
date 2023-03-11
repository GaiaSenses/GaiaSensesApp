/**
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/navigators/AppNavigator';
import { DarkTheme, LightTheme } from './src/style';

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  return (
    <NavigationContainer theme={isDark ? DarkTheme : LightTheme}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={
          isDark ? DarkTheme.colors.card : LightTheme.colors.card
        }
      />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
