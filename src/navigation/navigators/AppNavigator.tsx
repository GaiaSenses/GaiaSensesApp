/**
 * @format
 */

import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Create from '../screens/Create';
import Discover from '../screens/Discover';
import Gallery from '../screens/Gallery';

const Tab = createBottomTabNavigator();

const getIcon = (name: string) => {
  return (props: { focused: boolean; color: string; size: number }) => (
    <Icon
      name={props.focused ? name : `${name}-outline`}
      size={props.size}
      color={props.color}
    />
  );
};

const screens = [
  {
    name: 'Discover',
    component: Discover,
    options: {
      tabBarIcon: getIcon('search'),
    } as BottomTabNavigationOptions,
  },
  {
    name: 'Create',
    component: Create,
    options: {
      tabBarIcon: getIcon('add-circle'),
    } as BottomTabNavigationOptions,
  },
  {
    name: 'Gallery',
    component: Gallery,
    options: {
      tabBarIcon: getIcon('person'),
    } as BottomTabNavigationOptions,
  },
];

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      {screens.map((screen) => (
        <Tab.Screen key={screen.name} {...screen} />
      ))}
    </Tab.Navigator>
  );
}
