/**
 * @format
 */

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LikeInfo, Post } from '../../components';
import { postService } from '../../services/post';
import { Containers } from '../../styles';

export function Discover(): JSX.Element {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshPosts();
    }, []),
  );

  const refreshPosts = async () => {
    setIsRefreshing(true);

    const data = await postService.getRecent();
    setPosts(data);

    setIsRefreshing(false);
  };

  const handleLike = async (postId: number, likeInfo: LikeInfo) => {
    if (likeInfo.liked) {
      await postService.like(postId);
    } else {
      await postService.removeLike(postId);
    }
  };

  return (
    <View style={style.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} onLike={handleLike} />}
        contentContainerStyle={style.flatlist}
        numColumns={2}
        refreshing={isRefreshing}
        onRefresh={refreshPosts}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    ...Containers.vcentered,
  },
  flatlist: {
    alignItems: 'center',
  },
});
