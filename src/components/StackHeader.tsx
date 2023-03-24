/**
 * @format
 */

import React from 'react';
import { Appbar } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';

export function StackHeader({
  navigation,
  options,
  route,
  back,
}: StackHeaderProps): JSX.Element {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
