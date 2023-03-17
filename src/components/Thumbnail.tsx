/**
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, ImageSourcePropType, Pressable } from 'react-native';
import { Spacing } from '../styles';
import { Containers } from '../styles/containers';
import { CompositionNames } from './compositions';

type ThumbnailProps = {
  id: CompositionNames;
  source: ImageSourcePropType;
  onSelect: (name: CompositionNames) => void;
};

export default function Thumbnail({
  id,
  source,
  onSelect,
}: ThumbnailProps): JSX.Element {
  return (
    <Pressable onPress={() => onSelect(id)}>
      <Image source={source} style={style.container} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    ...Containers.card,
    ...Containers.rounded,
    margin: Spacing.medium,
  },
});
