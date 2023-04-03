/**
 * @format
 */

import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ChaosTree,
  Composition,
  CompositionProps,
  Curves,
  Lluvia,
  Rectangles,
  WeatherTree,
  ZigZag,
} from '../../compositions';
import { Containers } from '../../styles/containers';
import { Spacing, Typography } from '../../styles';
import { Button, IconButton } from 'react-native-paper';
import { CompositionHandle, SelectCompositionDialog } from '../../components';
import { AppTabScreenProps } from '../types';
import { useLightning, useWeather } from '../../hooks/useWeather';

type CreateProps = AppTabScreenProps<'Create'>;

export function Create({ navigation }: CreateProps): JSX.Element {
  const [play, setPlay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [composition, setComposition] = useState(Composition.Names.LLUVIA);
  const ref = useRef<CompositionHandle>(null);

  const { weather } = useWeather();
  const { lightning } = useLightning();

  const handleSelect = (name: Composition.Names) => {
    setComposition(name);
    setModalVisible(false);
  };

  const handleDismiss = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    const imageUri = await ref.current?.saveCanvas();
    navigation.push('Save', { imageUri });
  };

  const handleCompositionLoad = () => {
    ref.current?.setVariable('weather', weather);
    ref.current?.setVariable('lightning', lightning);
  };

  const CompostionWrapper = useCallback(
    (props: Pick<CompositionProps, 'onLoad' | 'play'>) => {
      const map = {
        [Composition.Names.CHAOS_TREE]: ChaosTree,
        [Composition.Names.CURVES]: Curves,
        [Composition.Names.LLUVIA]: Lluvia,
        [Composition.Names.RECTANGLES]: Rectangles,
        [Composition.Names.WEATHER_TREE]: WeatherTree,
        [Composition.Names.ZIG_ZAG]: ZigZag,
      };
      const Component = map[composition];
      return (
        <Component
          ref={ref}
          weather={weather}
          lightning={lightning}
          {...props}
        />
      );
    },
    [composition, lightning, weather],
  );

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
          <CompostionWrapper play={play} onLoad={handleCompositionLoad} />
        </View>

        <View style={style.buttonRow}>
          <Button
            mode="outlined"
            icon="palette"
            onPress={() => setModalVisible(true)}>
            {composition}
          </Button>
          <Button mode="contained" onPress={handleSave}>
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
