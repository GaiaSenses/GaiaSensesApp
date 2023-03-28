/**
 * @format
 */

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppStackNavigator } from './AppStackNavigator';
import { RootParamList } from '../types';
import { DrawerContent } from '../../components';

const Drawer = createDrawerNavigator<RootParamList>();

export function RootNavigator(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Root" component={AppStackNavigator} />
    </Drawer.Navigator>
  );
}
