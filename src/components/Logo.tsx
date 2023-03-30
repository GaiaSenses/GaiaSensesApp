/**
 * @format
 */

import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type LogoProps = { style?: StyleProp<ImageStyle> };

const logoSource = {
  light: require('../assets/gs_logo.png'),
  dark: require('../assets/gs_logo-inverted.png'),
};

export function Logo({ style }: LogoProps): JSX.Element {
  const { dark } = useTheme();
  const source = dark ? logoSource.dark : logoSource.light;

  return <Image source={source} style={[styles.logo, style]} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
    margin: 50,
  },
});
