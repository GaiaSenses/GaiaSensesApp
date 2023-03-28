/**
 * @format
 */

import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CompositionNames } from '../../compositions';
import { Post, PostInfo } from '../../components';
import { Containers } from '../../styles';

const thumbnails: PostInfo[] = [
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

export function Discover(): JSX.Element {
  const [posts, setPosts] = useState(thumbnails);

  const handleLike = (itemId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === itemId ? { ...post, like: !post.like } : post,
      ),
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} onLike={handleLike} />}
        contentContainerStyle={style.flatlist}
        numColumns={2}
      />
    </View>
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
});
