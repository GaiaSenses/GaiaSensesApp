/**
 * @format
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  DigitalOrganism,
  PaintBrush,
  StormEye,
  ColorFlower,
  CloudBubble,
  Bonfire,
  LightningTrees,
} from '../../compositions';
import { Containers } from '../../styles/containers';
import { Spacing, Typography } from '../../styles';
import { Button, IconButton } from 'react-native-paper';
import { CompositionHandle, SelectCompositionDialog } from '../../components';
import { AppTabScreenProps } from '../types';
import {
  useLightning,
  useWeather,
  useFire,
  useBrightnessTemperature,
} from '../../hooks/useWeather';

type CreateProps = AppTabScreenProps<'Create'>;

export function Create({ navigation }: CreateProps): JSX.Element {
  const [play, setPlay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [composition, setComposition] = useState(Composition.Names.LLUVIA);
  const ref = useRef<CompositionHandle>(null);

  const { weather } = useWeather();
  const { lightning } = useLightning();
  const { fire } = useFire();
  const { brightness } = useBrightnessTemperature();

  useEffect(() => {
    if (fire?.count) {
      setComposition(Composition.Names.BONFIRE); 
    }
    else if (brightness && brightness.temp < -50) {
      setComposition(Composition.Names.CURVES);
    }
    else if (weather?.rain && weather.rain['1h'] && weather.rain['1h'] > 5) {
      setComposition(Composition.Names.LLUVIA);
    }
    else if (lightning && lightning.count > 5) {
      setComposition(Composition.Names.ZIG_ZAG);
    }
    else {
      setComposition(Composition.Names.COLOR_FLOWER);
    }
  }, [fire, brightness, weather, lightning]);

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
    ref.current?.setVariable('fire', fire);
    ref.current?.setVariable('brightness', brightness);
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
        [Composition.Names.DIGITAL_ORGANISM]: DigitalOrganism,
        [Composition.Names.PAINT_BRUSH]: PaintBrush,
        [Composition.Names.STORM_EYE]: StormEye,
        [Composition.Names.COLOR_FLOWER]: ColorFlower,
        [Composition.Names.CLOUD_BUBBLE]: CloudBubble,
        [Composition.Names.BONFIRE]: Bonfire,
        [Composition.Names.LIGHTNING_TREES]: LightningTrees,
      };
      const Component = map[composition];
      return (
        <Component
          ref={ref}
          weather={weather}
          lightning={lightning}
          fire={fire}
          brightness={brightness}
          {...props}
        />
      );
    },
    [composition, lightning, weather, fire, brightness],
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
