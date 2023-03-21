/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { CompositionNames } from './compositions';
import Thumbnail from './Thumbnail';

type SelectCompositionDialogProps = {
  title: string;
  visible: boolean;
  current: CompositionNames;
  data: ArrayLike<any>;
  onDismiss: () => void;
  onSelect: (name: CompositionNames) => void;
};

export default function SelectCompositionDialog(
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
            data={props.data}
            renderItem={({ item }) => (
              <Thumbnail
                id={item.id}
                source={item.source}
                selected={selected === item.id}
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
});
