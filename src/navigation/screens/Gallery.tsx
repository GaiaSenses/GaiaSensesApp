/**
 * @format
 */

import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CompositionNames } from '../../compositions';
import { Post, PostInfo, TabHeader } from '../../components';
import { Containers } from '../../styles';

const thumbnails: PostInfo[] = [
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

export function Gallery(): JSX.Element {
  const [posts, setPosts] = useState(thumbnails);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, like: !post.like } : post,
      ),
    );
  };

  const handleDelete = (postId: number) => {
    console.log(`deleted ${postId}`);
  };

  const handlePublish = (postId: number) => {
    console.log(`published ${postId}`);
  };

  return (
    <>
      <TabHeader title="Gallery" />

      <View style={style.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Post
              post={item}
              onLike={handleLike}
              onDelete={handleDelete}
              onPublish={handlePublish}
            />
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
});
