/**
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import useAuth from '../hooks/useAuth';
import { useWeather } from '../hooks/useWeather';

export function DrawerContent(props: DrawerContentComponentProps): JSX.Element {
  const { userData, authActions } = useAuth();
  const { weather, refreshWeather } = useWeather();
  const { colors } = useTheme();

  const handleQuit = () => {
    authActions.signOut();
  };

  const handleRefresh = () => {
    refreshWeather();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.container}>
        <View style={style.userInfo}>
          {userData ? (
            <Avatar.Image source={{ uri: userData.avatar }} />
          ) : (
            <Avatar.Icon icon="account" />
          )}
          <View style={style.buttonRow}>
            <Text variant="titleLarge" style={style.title}>
              Welcome,
            </Text>
            <Text
              variant="titleLarge"
              style={[style.title, { color: colors.tertiary }]}>
              {` ${userData?.name}`}
            </Text>
            <Text variant="titleLarge" style={style.title}>
              !
            </Text>
            <IconButton icon="refresh" onPress={handleRefresh} />
          </View>
        </View>

        <Drawer.Section showDivider={false} style={style.weatherInfo}>
          <Drawer.Item
            icon="map-marker"
            label={`${weather?.city || '---'} - ${weather?.state || ''}`}
            active
            style={style.weatherItem}
          />

          <Drawer.Item
            icon="thermometer"
            label={`${weather?.main?.temp || '---'} ºC`}
            active
            style={style.weatherItem}
          />

          <Drawer.Item
            icon="water-percent"
            label={`${weather?.main?.humidity || '---'} %`}
            active
            style={style.weatherItem}
          />

          <Drawer.Item
            icon="arrow-collapse-all"
            label={`${weather?.main?.pressure || '---'} hPa`}
            active
            style={style.weatherItem}
          />
        </Drawer.Section>

        <Button icon="logout" onPress={handleQuit}>
          Quit
        </Button>
      </View>
    </DrawerContentScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 30,
    paddingLeft: 30,
  },
  title: {
    fontWeight: 'bold',
  },
  weatherInfo: {
    marginVertical: 10,
  },
  weatherItem: {
    marginBottom: 10,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
