/**
 * @format
 */

import { Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#478ea5',
    background: '#1a1a1a',
    card: '#1f1f1f',
    text: '#f0f0f0',
    border: '#303030',
    notification: '#eababa',
  },
};

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#478ea5',
    background: '#ffffff',
    card: '#f1f4f6',
    text: '#0a0a0a',
    border: '#a0a0a0',
    notification: '#eababa',
  },
};

export const BaseStyle = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  composition: {
    flex: 0,
    width: '90%',
    height: '80%',
  },
  webview: {
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    elevation: 5,
    marginTop: 100,
    padding: 20,
    shadowColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 32,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0.0, 0.0, 0.0, 0.5)',
  },
});

export function createStyle<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(overrides: T) {
  return StyleSheet.create({ ...BaseStyle, ...overrides });
}
