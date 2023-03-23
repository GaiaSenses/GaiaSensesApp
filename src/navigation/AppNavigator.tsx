/**
 * @format
 */

import React from 'react';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
} from '@react-navigation/material-bottom-tabs';
import CreateNavigator from './CreateNavigator';
import DiscoverNavigator from './DiscoverNavigator';
import GalleryNavigator from './GalleryNavigator';

const Tab = createMaterialBottomTabNavigator();

const screens = [
  {
    name: 'DiscoverTab',
    component: DiscoverNavigator,
    options: {
      tabBarIcon: 'card-search',
      tabBarLabel: 'Discover',
    } as MaterialBottomTabNavigationOptions,
  },
  {
    name: 'CreateTab',
    component: CreateNavigator,
    options: {
      tabBarIcon: 'plus',
      tabBarLabel: 'Create',
    } as MaterialBottomTabNavigationOptions,
  },
  {
    name: 'GalleryTab',
    component: GalleryNavigator,
    options: {
      tabBarIcon: 'account',
      tabBarLabel: 'Gallery',
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
