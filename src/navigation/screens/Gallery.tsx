/**
 * @format
 */

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LikeInfo, Post, PostInfo } from '../../components';
import { postService } from '../../services/post';

export function Gallery(): JSX.Element {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshPosts();
    }, []),
  );

  const refreshPosts = async () => {
    setIsRefreshing(true);

    const data = await postService.getFromUser();
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

  const handleDelete = async (postId: number) => {
    setIsRefreshing(true);

    setPosts(posts.filter((post) => post.id !== postId));
    await postService.delete(postId);

    setIsRefreshing(false);
  };

  const handlePublish = async (postId: number, publishInfo: boolean) => {
    if (publishInfo) {
      await postService.publish(postId);
    } else {
      // TODO: implement 'unpublish' action
    }
  };

  return (
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
        refreshing={isRefreshing}
        onRefresh={refreshPosts}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    alignItems: 'center',
  },
});
