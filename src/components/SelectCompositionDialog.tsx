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
import { CompositionNames } from '../compositions';
import { Thumbnail } from './Thumbnail';

type SelectCompositionDialogProps = {
  title: string;
  visible: boolean;
  current: CompositionNames;
  onDismiss: () => void;
  onSelect: (name: CompositionNames) => void;
};

type ItemInfo = {
  id: number;
  name: CompositionNames;
  source: ImageSourcePropType;
};

type ItemProps = {
  item: ItemInfo;
  selected: boolean;
  onSelect: (name: CompositionNames) => void;
};

const thumbnails: ItemInfo[] = [
  {
    id: 0,
    name: CompositionNames.CHAOS_TREE,
    source: require('../assets/chaos-tree.png'),
  },
  {
    id: 1,
    name: CompositionNames.CURVES,
    source: require('../assets/curves.png'),
  },
  {
    id: 2,
    name: CompositionNames.LLUVIA,
    source: require('../assets/lluvia.png'),
  },
  {
    id: 3,
    name: CompositionNames.RECTANGLES,
    source: require('../assets/rectangles.png'),
  },
  {
    id: 4,
    name: CompositionNames.WEATHER_TREE,
    source: require('../assets/weather-tree.png'),
  },
  {
    id: 5,
    name: CompositionNames.ZIG_ZAG,
    source: require('../assets/zig-zag.png'),
  },
];

function Item({ item, selected, onSelect }: ItemProps): JSX.Element {
  return (
    <TouchableRipple onPress={() => onSelect(item.name)}>
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
  const [selected, setSelected] = useState(CompositionNames.LLUVIA);
  const { current } = props;

  useEffect(() => {
    setSelected(current);
  }, [current]);

  const handleSelect = (name: CompositionNames) => {
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
  thumbnail: {
    width: 150,
    height: 150,
    margin: Spacing.small,
  },
  selected: {
    opacity: 0.5,
  },
});
