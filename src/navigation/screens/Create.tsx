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
import Lluvia from '../../components/compositions/Lluvia';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChaosTree from '../../components/compositions/ChaosTree';
import Curves from '../../components/compositions/Curves';
import Rectangles from '../../components/compositions/Rectangles';
import WeatherTree from '../../components/compositions/WeatherTree';
import ZigZag from '../../components/compositions/ZigZag';

type ThumbnailProps = {
  id: string;
  source: ImageSourcePropType;
  onSelect: (name: string) => void;
};

type CompositionModalProps = {
  onSelect: (name: string) => void;
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
    { id: 'chaos-tree', source: require('../../assets/chaos-tree.png') },
    { id: 'curves', source: require('../../assets/curves.png') },
    { id: 'lluvia', source: require('../../assets/lluvia.png') },
    { id: 'rectangles', source: require('../../assets/rectangles.png') },
    { id: 'weather-tree', source: require('../../assets/weather-tree.png') },
    { id: 'zig-zag', source: require('../../assets/zig-zag.png') },
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
  const [composition, setComposition] = useState('lluvia');

  const renderComposition = () => {
    const map: Record<string, JSX.Element> = {
      ['chaos-tree']: <ChaosTree />,
      ['curves']: <Curves />,
      ['lluvia']: <Lluvia play={play} />,
      ['rectangles']: <Rectangles />,
      ['weather-tree']: <WeatherTree />,
      ['zig-zag']: <ZigZag />,
    };

    return map[composition];
  };

  const handleSelect = (name: string) => {
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
