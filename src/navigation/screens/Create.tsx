/**
 * @format
 */

import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import {
  CompositionNames,
  ChaosTree,
  Rectangles,
  Curves,
  Lluvia,
  WeatherTree,
  ZigZag,
} from '../../components/compositions';
import Thumbnail from '../../components/Thumbnail';
import AnimatedModal from '../../components/AnimatedModal';
import { Containers } from '../../styles/containers';
import { Spacing, Typography } from '../../styles';

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

  const handleQuit = () => {
    setModalVisible(false);
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerText}>Select art:</Text>
        <Button title={composition} onPress={() => setModalVisible(true)} />
      </View>
      {modalVisible && (
        <AnimatedModal onQuit={handleQuit}>
          <FlatList
            data={thumbnails}
            renderItem={({ item }) => (
              <Thumbnail
                id={item.id}
                source={item.source}
                onSelect={handleSelect}
              />
            )}
            numColumns={2}
          />
        </AnimatedModal>
      )}
      {renderComposition()}
      <Button title={play ? 'Stop' : 'Play'} onPress={() => setPlay(!play)} />
    </View>
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
