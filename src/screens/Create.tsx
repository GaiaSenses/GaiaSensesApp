/**
 * @format
 */

import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CompositionMap, CompositionNames } from '../compositions';
import { Containers } from '../styles/containers';
import { Spacing, Typography } from '../styles';
import { Button, IconButton } from 'react-native-paper';
import SelectCompositionDialog from '../components/SelectCompositionDialog';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import Composition, { CompositionHandle } from '../components/Composition';

type CreateProps = {
  navigation: StackNavigationProp<ParamListBase, string, undefined>;
};

export default function Create({ navigation }: CreateProps): JSX.Element {
  const [play, setPlay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [composition, setComposition] = useState(CompositionNames.LLUVIA);
  const ref = useRef<CompositionHandle>(null);

  const handleSelect = (name: CompositionNames) => {
    setComposition(name);
    setModalVisible(false);
  };

  const handleDismiss = () => {
    setModalVisible(false);
  };

  const handleSave = (data: string) => {
    navigation.push('Save', { imageUri: data });
  };

  const handleSavePressed = () => {
    ref.current?.saveCanvas();
  };

  return (
    <>
      <View style={style.container}>
        <SelectCompositionDialog
          title="Select Art"
          visible={modalVisible}
          current={composition}
          onDismiss={handleDismiss}
          onSelect={handleSelect}
        />

        <View style={style.compositionContainer}>
          <IconButton
            icon={play ? 'volume-high' : 'volume-off'}
            mode="contained"
            selected={play}
            onPress={() => setPlay(!play)}
            style={style.soundIcon}
          />
          <Composition
            ref={ref}
            play={play}
            onSaveCanvas={handleSave}
            {...CompositionMap[composition]}
          />
        </View>

        <View style={style.buttonRow}>
          <Button
            mode="outlined"
            icon="palette"
            onPress={() => setModalVisible(true)}>
            {composition}
          </Button>
          <Button mode="contained" onPress={handleSavePressed}>
            Save
          </Button>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    ...Containers.vcentered,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
  },
  headerText: {
    ...Typography.default,
    padding: Spacing.small,
  },
  compositionContainer: {
    flex: 0,
    width: '90%',
    height: '90%',
  },
  soundIcon: {
    ...Containers.overlayed,
    top: 0,
    right: 0,
  },
});
