/**
 * @format
 */

import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AppTabParamList } from '../types';
import { Create, Discover, Gallery } from '../screens';

const Tab = createMaterialBottomTabNavigator<AppTabParamList>();

export function AppTabNavigator() {
  return (
    <Tab.Navigator sceneAnimationType="shifting">
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{ tabBarIcon: 'card-search' }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{ tabBarIcon: 'plus' }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{ tabBarIcon: 'account' }}
      />
    </Tab.Navigator>
  );
}
