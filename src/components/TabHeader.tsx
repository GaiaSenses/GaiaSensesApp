/**
 * @format
 */

import React from 'react';
import { Appbar } from 'react-native-paper';

type TabHeaderProps = { title: string };

export function TabHeader({ title }: TabHeaderProps): JSX.Element {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
