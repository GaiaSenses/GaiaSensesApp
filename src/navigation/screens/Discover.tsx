/**
 * @format
 */

import React, { useState } from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { CompositionNames } from '../../compositions';
import { TabHeader, Thumbnail } from '../../components';
import { Containers } from '../../styles';

type ItemInfo = {
  id: number;
  name: CompositionNames;
  source: ImageSourcePropType;
  like: boolean;
};

type ItemProps = {
  item: ItemInfo;
  onPress: () => void;
};

const thumbnails: ItemInfo[] = [
  {
    id: 0,
    name: CompositionNames.CHAOS_TREE,
    source: require('../../assets/chaos-tree.png'),
    like: true,
  },
  {
    id: 1,
    name: CompositionNames.CURVES,
    source: require('../../assets/curves.png'),
    like: false,
  },
  {
    id: 2,
    name: CompositionNames.LLUVIA,
    source: require('../../assets/lluvia.png'),
    like: true,
  },
];

function Item({ item, onPress }: ItemProps): JSX.Element {
  return (
    <View>
      <IconButton
        icon={item.like ? 'heart' : 'heart-outline'}
        mode="contained"
        onPress={() => onPress()}
        style={style.icon}
      />
      <Thumbnail source={item.source} size={180} />
    </View>
  );
}

export function Discover(): JSX.Element {
  const [posts, setPosts] = useState(thumbnails);

  const handlePress = (item: ItemInfo) => {
    setPosts(
      posts.map((post) =>
        post.id === item.id ? { ...post, like: !post.like } : post,
      ),
    );
  };

  return (
    <>
      <TabHeader title="Discover" />

      <View style={style.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Item item={item} onPress={() => handlePress(item)} />
          )}
          contentContainerStyle={style.flatlist}
          numColumns={2}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    ...Containers.vcentered,
  },
  flatlist: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    ...Containers.overlayed,
    top: 0,
    right: 0,
  },
});
