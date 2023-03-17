/**
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import { createStyle } from '../../style';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  CompositionNames,
  ChaosTree,
  Rectangles,
  Curves,
  Lluvia,
  WeatherTree,
  ZigZag,
} from '../../components/compositions';

type ThumbnailProps = {
  id: CompositionNames;
  source: ImageSourcePropType;
  onSelect: (name: CompositionNames) => void;
};

type CompositionModalProps = {
  onSelect: (name: CompositionNames) => void;
  onQuit: () => void;
};

type HeaderProps = {
  title: string;
  onQuit: () => void;
};

function Thumbnail({ id, source, onSelect }: ThumbnailProps): JSX.Element {
  return (
    <Pressable onPress={() => onSelect(id)}>
      <Image source={source} style={style.thumbnail} />
    </Pressable>
  );
}

function Header({ title, onQuit }: HeaderProps): JSX.Element {
  return (
    <View style={style.header}>
      <Text style={style.title}>{title}</Text>
      <Icon name="close" size={style.title.fontSize} onPress={() => onQuit()} />
    </View>
  );
}

function SelectCompositionModal({
  onSelect,
  onQuit,
}: CompositionModalProps): JSX.Element {
  const theme = useTheme();
  style.modal.backgroundColor = theme.colors.card;

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

  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={style.overlay}>
        <View style={[style.centered, style.modal]}>
          <Header title="Art Type" onQuit={onQuit} />
          <FlatList
            data={thumbnails}
            renderItem={({ item }) => (
              <Thumbnail
                id={item.id}
                source={item.source}
                onSelect={onSelect}
              />
            )}
            numColumns={2}
          />
        </View>
      </View>
    </Modal>
  );
}

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
    <View style={style.centered}>
      <Button title="modal" onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <SelectCompositionModal onSelect={handleSelect} onQuit={handleQuit} />
      )}
      {renderComposition()}
      <Button title={play ? 'Stop' : 'Play'} onPress={() => setPlay(!play)} />
    </View>
  );
}

const style = createStyle({});
