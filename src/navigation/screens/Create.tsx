/**
 * @format
 */

import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Style } from '../../style';
import Lluvia from '../../compositions/Lluvia';

export default function Create(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={Style.container}>
      <Lluvia play={isPlaying} />
      <Button
        title={isPlaying ? 'Stop' : 'Play'}
        onPress={() => setIsPlaying(!isPlaying)}
      />
    </View>
  );
}
