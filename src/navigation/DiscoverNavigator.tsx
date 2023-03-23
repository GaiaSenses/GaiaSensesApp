/**
 * @format
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppHeader from '../components/AppHeader';
import Discover from '../screens/Discover';

const Stack = createStackNavigator();

export default function DiscoverNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        header: AppHeader,
      }}>
      <Stack.Screen name="Discover" component={Discover} />
    </Stack.Navigator>
  );
}
