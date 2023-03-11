/**
 * @format
 */

import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const Colors = {
  white: '#ffffff',
  black: '#080808',
  darkGray: '#0f0f0f',
  darkBlue: '#14073a',
  lightBlue: '#f1f4f6',
  blue: '#478ea5',
  lightGreen: '#f0fff0',
};

const DarkTheme: Theme = {
  dark: true,
  colors: {
    ..._DarkTheme.colors,
    primary: Colors.blue,
    background: Colors.black,
    card: Colors.darkGray,
  },
};

const LightTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue,
    background: Colors.lightBlue,
  },
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  compositionContainer: {
    flex: 0,
    width: '90%',
    height: '80%',
  },
  webview: {
    borderRadius: 10,
  },
});

export { Style, Colors, DarkTheme, LightTheme };
