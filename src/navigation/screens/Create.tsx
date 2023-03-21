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
import { Button } from 'react-native-paper';
import AppHeader from '../../components/AppHeader';
import SelectCompositionDialog from '../../components/SelectCompositionDialog';

const thumbnails = [
  {
    id: CompositionNames.CHAOS_TREE,
    source: require('../../assets/chaos-tree.png'),
  },
  {
    id: CompositionNames.CURVES,
    source: require('../../assets/curves.png'),
  },
  {
    id: CompositionNames.LLUVIA,
    source: require('../../assets/lluvia.png'),
  },
  {
    id: CompositionNames.RECTANGLES,
    source: require('../../assets/rectangles.png'),
  },
  {
    id: CompositionNames.WEATHER_TREE,
    source: require('../../assets/weather-tree.png'),
  },
  {
    id: CompositionNames.ZIG_ZAG,
    source: require('../../assets/zig-zag.png'),
  },
];

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
        <View style={style.header}>
          <Button
            mode="outlined"
            icon="palette"
            onPress={() => setModalVisible(true)}>
            {composition}
          </Button>
        </View>

        <SelectCompositionDialog
          title="Select Art"
          visible={modalVisible}
          current={composition}
          data={thumbnails}
          onDismiss={handleDismiss}
          onSelect={handleSelect}
        />

        {renderComposition()}

        <Button
          icon={play ? 'volume-high' : 'volume-off'}
          onPress={() => setPlay(!play)}>
          {play ? 'Stop' : 'Play'}
        </Button>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    ...Containers.vcentered,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  headerText: {
    ...Typography.default,
    padding: Spacing.small,
  },
});
