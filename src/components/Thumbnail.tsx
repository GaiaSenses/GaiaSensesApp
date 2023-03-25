/**
 * @format
 */

import React from 'react';
import { ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { Image, ImageSourcePropType } from 'react-native';
import { Containers } from '../styles/containers';

type ThumbnailProps = {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
};

export function Thumbnail({ source, style }: ThumbnailProps): JSX.Element {
  return <Image source={source} style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    ...Containers.card,
    ...Containers.rounded,
  },
});
