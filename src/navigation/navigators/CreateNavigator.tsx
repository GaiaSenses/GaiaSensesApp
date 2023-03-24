/**
 * @format
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StackHeader } from '../../components';
import { Create, Save } from '../screens';
import { CreateStackParamList } from '../types';

const Stack = createStackNavigator<CreateStackParamList>();

export function CreateNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        header: StackHeader,
      }}>
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Save" component={Save} />
    </Stack.Navigator>
  );
}
