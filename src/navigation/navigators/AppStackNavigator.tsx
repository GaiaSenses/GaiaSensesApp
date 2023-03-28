/**
 * @format
 */

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StackHeader } from '../../components';
import { Save } from '../screens';
import { AppStackParamList } from '../types';
import { AppTabNavigator } from './AppTabNavigator';

const Stack = createStackNavigator<AppStackParamList>();

export function AppStackNavigator(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ header: StackHeader }}>
      <Stack.Screen
        name="Tabs"
        component={AppTabNavigator}
        options={({ route }) => {
          const headerTitle = getFocusedRouteNameFromRoute(route) ?? 'Discover';
          return { headerTitle };
        }}
      />
      <Stack.Screen name="Save" component={Save} />
    </Stack.Navigator>
  );
}
