/**
 * @format
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppHeader from '../components/AppHeader';
import Gallery from '../screens/Gallery';

const Stack = createStackNavigator();

export default function GalleryNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        header: AppHeader,
      }}>
      <Stack.Screen name="Gallery" component={Gallery} />
    </Stack.Navigator>
  );
}
