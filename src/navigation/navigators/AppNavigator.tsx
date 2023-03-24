/**
 * @format
 */

import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CreateNavigator } from './CreateNavigator';
import { AppTabParamList } from '../types';
import { Discover, Gallery } from '../screens';

const Tab = createMaterialBottomTabNavigator<AppTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator sceneAnimationType="shifting">
      <Tab.Screen
        name="DiscoverTab"
        component={Discover}
        options={{ tabBarIcon: 'card-search', tabBarLabel: 'Discover' }}
      />
      <Tab.Screen
        name="CreateTab"
        component={CreateNavigator}
        options={{ tabBarIcon: 'plus', tabBarLabel: 'Create' }}
      />
      <Tab.Screen
        name="GalleryTab"
        component={Gallery}
        options={{ tabBarIcon: 'account', tabBarLabel: 'Gallery' }}
      />
    </Tab.Navigator>
  );
}
