/**
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, Drawer, Text } from 'react-native-paper';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import useAuth from '../hooks/useAuth';

export function DrawerContent(props: DrawerContentComponentProps): JSX.Element {
  const { authActions } = useAuth();

  const handleQuit = () => {
    authActions.signOut();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.container}>
        <View style={style.userInfo}>
          <Avatar.Icon icon="account" />
          <Text variant="titleLarge" style={style.title}>
            Welcome, User!
          </Text>
        </View>
        <View style={style.weatherInfo}>
          <Divider horizontalInset />
          <Drawer.Item icon="map-marker" label="São Paulo" />
          <Divider horizontalInset />
          <Drawer.Item icon="thermometer" label="30 ºC" />
          <Divider horizontalInset />
          <Drawer.Item icon="arrow-collapse-all" label="1017 hPa" />
          <Divider horizontalInset />
        </View>
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
    marginTop: 10,
    fontWeight: 'bold',
  },
  weatherInfo: {
    marginVertical: 20,
  },
});
