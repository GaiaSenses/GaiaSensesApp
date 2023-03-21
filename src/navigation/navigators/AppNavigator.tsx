/**
 * @format
 */

import React from 'react';

import Create from '../screens/Create';
import Discover from '../screens/Discover';
import Gallery from '../screens/Gallery';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const screens = [
  {
    name: 'Discover',
    component: Discover,
    options: {
      tabBarIcon: 'card-search',
    } as MaterialBottomTabNavigationOptions,
  },
  {
    name: 'Create',
    component: Create,
    options: {
      tabBarIcon: 'plus',
    } as MaterialBottomTabNavigationOptions,
  },
  {
    name: 'Gallery',
    component: Gallery,
    options: {
      tabBarIcon: 'account',
    } as MaterialBottomTabNavigationOptions,
  },
];

export default function AppNavigator() {
  return (
    <Tab.Navigator sceneAnimationType="shifting">
      {screens.map((screen) => (
        <Tab.Screen key={screen.name} {...screen} />
      ))}
    </Tab.Navigator>
  );
}
