/**
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export function AppTitle(): JSX.Element {
  const { colors } = useTheme();

  return (
    <View style={style.title}>
      <Text
        variant="headlineLarge"
        style={{
          color: colors.primary,
        }}>
        Gaia
      </Text>
      <Text
        variant="headlineLarge"
        style={{
          color: colors.secondary,
        }}>
        Senses
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  title: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
