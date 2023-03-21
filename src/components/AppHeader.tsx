/**
 * @format
 */

import React from 'react';
import { Appbar } from 'react-native-paper';

export default function AppHeader(props: any): JSX.Element {
  return (
    <Appbar.Header>
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
}
