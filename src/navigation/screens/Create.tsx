/**
 * @format
 */

import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Style } from '../../style';
import Lluvia from '../../compositions/Lluvia';

export default function Create(): JSX.Element {
  const [play, setPlay] = useState(false);

  return (
    <View style={Style.container}>
      <Lluvia play={play} />
      <Button title={play ? 'Stop' : 'Play'} onPress={() => setPlay(!play)} />
    </View>
  );
}
