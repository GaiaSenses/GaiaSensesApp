/**
 * @format
 */

import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Spacing } from '../styles';

type FlipViewProps = {
  front: React.ReactElement;
  back: React.ReactElement;
};

export function FlipView({ front, back }: FlipViewProps): JSX.Element {
  const angle = useRef({
    front: new Animated.Value(0),
    back: new Animated.Value(1),
  }).current;
  let directionFlag = useRef(true).current;

  const flip = () => {
    const frontAnimation = Animated.spring(angle.front, {
      toValue: directionFlag ? 1 : 0,
      mass: 2,
      stiffness: 100,
      useNativeDriver: true,
    });

    const backAnimation = Animated.spring(angle.back, {
      toValue: directionFlag ? 0 : 1,
      mass: 2,
      stiffness: 100,
      useNativeDriver: true,
    });

    Animated.parallel([frontAnimation, backAnimation]).start();
    directionFlag = !directionFlag;
  };

  const animatedStyle = {
    front: {
      transform: [
        {
          rotateY: angle.front.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        },
        { perspective: 1000 },
      ],
    },
    back: {
      transform: [
        {
          rotateY: angle.back.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        },
        { perspective: 1000 },
      ],
    },
  };

  return (
    <TouchableRipple onPress={() => flip()} borderless>
      <View style={style.container}>
        <Animated.View style={[style.back, animatedStyle.back]}>
          {back}
        </Animated.View>
        <Animated.View style={[style.front, animatedStyle.front]}>
          {front}
        </Animated.View>
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
