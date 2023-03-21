/**
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, ImageSourcePropType } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { Spacing } from '../styles';
import { Containers } from '../styles/containers';
import { CompositionNames } from './compositions';

type ThumbnailProps = {
  id: CompositionNames;
  source: ImageSourcePropType;
  selected?: boolean;
  onSelect?: (name: CompositionNames) => void;
};

export default function Thumbnail({
  id,
  source,
  selected,
  onSelect,
}: ThumbnailProps): JSX.Element {
  const handleSelect = onSelect || (() => {});

  return (
    <TouchableRipple onPress={() => handleSelect(id)}>
      <>
        {selected && (
          <IconButton
            icon="check"
            mode="contained"
            style={style.icon}
            selected
          />
        )}
        <Image
          source={source}
          style={selected ? [style.container, style.selected] : style.container}
        />
      </>
    </TouchableRipple>
  );
}

const style = StyleSheet.create({
  container: {
    ...Containers.card,
    ...Containers.rounded,
    margin: Spacing.small,
  },
  selected: {
    backgroundColor: '#000',
    opacity: 0.5,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
});
