/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CompositionNames,
  ChaosTree,
  Rectangles,
  Curves,
  Lluvia,
  WeatherTree,
  ZigZag,
} from '../../components/compositions';
import { Containers } from '../../styles/containers';
import { Spacing, Typography } from '../../styles';
import { Button, IconButton } from 'react-native-paper';
import AppHeader from '../../components/AppHeader';
import SelectCompositionDialog from '../../components/SelectCompositionDialog';

export default function Create(): JSX.Element {
  const [play, setPlay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [composition, setComposition] = useState(CompositionNames.LLUVIA);

  const renderComposition = () => {
    const map: Record<string, JSX.Element> = {
      [CompositionNames.CHAOS_TREE]: <ChaosTree />,
      [CompositionNames.CURVES]: <Curves />,
      [CompositionNames.LLUVIA]: <Lluvia play={play} />,
      [CompositionNames.RECTANGLES]: <Rectangles />,
      [CompositionNames.WEATHER_TREE]: <WeatherTree />,
      [CompositionNames.ZIG_ZAG]: <ZigZag />,
    };

    return map[composition];
  };

  const handleSelect = (name: CompositionNames) => {
    setComposition(name);
    setModalVisible(false);
  };

  const handleDismiss = () => {
    setModalVisible(false);
  };

  return (
    <>
      <AppHeader title="Create" />
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
          {renderComposition()}
        </View>

        <View style={style.buttonRow}>
          <Button
            mode="outlined"
            icon="palette"
            onPress={() => setModalVisible(true)}>
            {composition}
          </Button>
          <Button mode="contained" onPress={() => console.log('saved')}>
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
