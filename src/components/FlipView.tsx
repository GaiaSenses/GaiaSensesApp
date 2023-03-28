/**
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Spacing } from '../styles';

type FlipViewProps = {
  front: React.ReactElement;
  back: React.ReactElement;
};

export function FlipView({ front, back }: FlipViewProps): JSX.Element {
  const angleBack = useSharedValue(180);
  const angleFront = useSharedValue(0);
  const directionFlag = useSharedValue(true);

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${angleBack.value}deg` }],
    };
  });

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${angleFront.value}deg` }],
    };
  });

  const flip = () => {
    angleBack.value = withSpring(directionFlag.value ? 0 : 180, {
      mass: 0.5,
    });
    angleFront.value = withSpring(directionFlag.value ? 180 : 0, {
      mass: 0.5,
    });
    directionFlag.value = !directionFlag.value;
  };

  return (
    <TouchableRipple onPress={() => flip()} borderless>
      <View style={style.container}>
        <Animated.View style={[style.back, backStyle]}>{back}</Animated.View>
        <Animated.View style={[style.front, frontStyle]}>{front}</Animated.View>
      </View>
    </TouchableRipple>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 0,
    width: 180,
    height: 180,
    margin: Spacing.small,
  },
  front: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    transform: [{ rotateY: '180deg' }],
    backfaceVisibility: 'hidden',
  },
});
