/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import { FlatList, ImageSourcePropType, StyleSheet } from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TouchableRipple,
} from 'react-native-paper';
import { Containers, Spacing } from '../styles';
import { Composition } from '../compositions';
import { Thumbnail } from './Thumbnail';

type SelectCompositionDialogProps = {
  title: string;
  visible: boolean;
  current: Composition.Names;
  onDismiss: () => void;
  onSelect: (name: Composition.Names) => void;
};

type ItemInfo = {
  id: number;
  name: Composition.Names;
  source: ImageSourcePropType;
};

type ItemProps = {
  item: ItemInfo;
  selected: boolean;
  onSelect: (name: Composition.Names) => void;
};

const thumbnails: ItemInfo[] = [
  {
    id: 0,
    name: Composition.Names.CHAOS_TREE,
    source: require('../assets/chaos-tree.png'),
  },
  {
    id: 1,
    name: Composition.Names.CURVES,
    source: require('../assets/curves.png'),
  },
  {
    id: 2,
    name: Composition.Names.LLUVIA,
    source: require('../assets/lluvia.png'),
  },
  {
    id: 3,
    name: Composition.Names.RECTANGLES,
    source: require('../assets/rectangles.png'),
  },
  {
    id: 4,
    name: Composition.Names.WEATHER_TREE,
    source: require('../assets/weather-tree.png'),
  },
  {
    id: 5,
    name: Composition.Names.ZIG_ZAG,
    source: require('../assets/zig-zag.png'),
  },
  {
    id: 6,
    name: Composition.Names.DIGITAL_ORGANISM,
    source: require('../assets/digital-organism.png'),
  },
  {
    id: 7,
    name: Composition.Names.PAINT_BRUSH,
    source: require('../assets/paint-brush.png'),
  },
  {
    id: 8,
    name: Composition.Names.STORM_EYE,
    source: require('../assets/storm-eye.png'),
  },
  {
    id: 9,
    name: Composition.Names.COLOR_FLOWER,
    source: require('../assets/color-flower.png'),
  },
  {
    id: 10,
    name: Composition.Names.CLOUD_BUBBLE,
    source: require('../assets/cloud-bubble.png'),
  },
  {
    id: 11,
    name: Composition.Names.BONFIRE,
    source: require('../assets/bonfire.png'),
  },
  {
    id: 12,
    name: Composition.Names.LIGHTNING_TREES,
    source: require('../assets/lightning-trees.png'),
  },
  
];

function Item({ item, selected, onSelect }: ItemProps): JSX.Element {
  return (
    <TouchableRipple
      borderless
      onPress={() => onSelect(item.name)}
      style={style.thumbnailContainer}>
      <>
        {selected && (
          <IconButton
            icon="check"
            mode="contained"
            style={style.icon}
            selected
          />
        )}
        <Thumbnail
          source={item.source}
          style={[style.thumbnail, selected ? style.selected : undefined]}
        />
      </>
    </TouchableRipple>
  );
}

export function SelectCompositionDialog(
  props: SelectCompositionDialogProps,
): JSX.Element {
  const [selected, setSelected] = useState(Composition.Names.LLUVIA);
  const { current } = props;

  useEffect(() => {
    setSelected(current);
  }, [current]);

  const handleSelect = (name: Composition.Names) => {
    setSelected(name);
  };

  return (
    <Portal>
      <Dialog visible={props.visible} dismissable onDismiss={props.onDismiss}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.ScrollArea>
          <FlatList
            data={thumbnails}
            renderItem={({ item }) => (
              <Item
                item={item}
                selected={selected === item.name}
                onSelect={handleSelect}
              />
            )}
            contentContainerStyle={style.flatlist}
            numColumns={2}
          />
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => props.onDismiss()}>Cancel</Button>
          <Button onPress={() => props.onSelect(selected)}>Select</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const style = StyleSheet.create({
  flatlist: {
    alignItems: 'center',
  },
  icon: {
    ...Containers.overlayed,
    top: 0,
    right: 0,
  },
  thumbnailContainer: {
    margin: Spacing.small,
  },
  thumbnail: {
    width: 150,
    height: 150,
  },
  selected: {
    opacity: 0.5,
  },
});
