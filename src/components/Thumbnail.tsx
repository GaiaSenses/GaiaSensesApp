/**
 * @format
 */

import React from 'react';
import { ImageStyle, StyleSheet } from 'react-native';
import { Image, ImageSourcePropType } from 'react-native';
import { Spacing } from '../styles';
import { Containers } from '../styles/containers';

type ThumbnailProps = {
  source: ImageSourcePropType;
  size?: number;
  style?: ImageStyle;
};

export default function Thumbnail({
  source,
  size,
  style,
}: ThumbnailProps): JSX.Element {
  if (size) {
    styles.container.height = size;
    styles.container.width = size;
  }

  return <Image source={source} style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    ...Containers.card,
    ...Containers.rounded,
    margin: Spacing.small,
  },
});
