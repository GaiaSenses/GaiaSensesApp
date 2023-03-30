/**
 * @format
 */

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppStackNavigator } from './AppStackNavigator';
import { RootDrawerParamList, RootStackParamList } from '../types';
import { DrawerContent } from '../../components';
import useAuth from '../../hooks/useAuth';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from '../screens';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator(): JSX.Element {
  const { userData } = useAuth();

  return (
    <>
      {userData ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Root" component={AppStackNavigator} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </>
  );
}
