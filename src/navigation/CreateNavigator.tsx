/**
 * @format
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppHeader from '../components/AppHeader';
import Create from '../screens/Create';
import Save from '../screens/Save';

const Stack = createStackNavigator();

export default function CreateNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        header: AppHeader,
      }}>
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Save" component={Save} />
    </Stack.Navigator>
  );
}
