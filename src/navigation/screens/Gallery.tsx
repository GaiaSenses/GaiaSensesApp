/**
 * @format
 */

import React, { useState } from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Divider, IconButton, Menu } from 'react-native-paper';
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
    name: CompositionNames.WEATHER_TREE,
    source: require('../../assets/weather-tree.png'),
    like: true,
  },
  {
    id: 1,
    name: CompositionNames.ZIG_ZAG,
    source: require('../../assets/zig-zag.png'),
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
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handlePublish = () => {
    console.log('published');
    closeMenu();
  };

  const handleDelete = () => {
    console.log('deleted');
    closeMenu();
  };

  return (
    <View>
      <View style={style.iconsContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="dots-vertical"
              mode="contained"
              onPress={openMenu}
            />
          }>
          <Menu.Item
            leadingIcon="publish"
            title="Publish"
            onPress={handlePublish}
          />
          <Divider />
          <Menu.Item
            leadingIcon="trash-can"
            title="Delete"
            onPress={handleDelete}
          />
        </Menu>
        <IconButton
          icon={item.like ? 'heart' : 'heart-outline'}
          mode="contained"
          onPress={() => onPress()}
        />
      </View>
      <Thumbnail source={item.source} size={180} />
    </View>
  );
}

export function Gallery(): JSX.Element {
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
      <TabHeader title="Gallery" />

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
  iconsContainer: {
    ...Containers.overlayed,
    flex: 1,
    flexDirection: 'column',
    right: 0,
  },
  flatlist: {
    flex: 1,
    alignItems: 'center',
  },
});
