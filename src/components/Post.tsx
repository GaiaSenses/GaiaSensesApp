/**
 * @format
 */

import React, { useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import {
  Menu,
  IconButton,
  Divider,
  Text,
  Avatar,
  Surface,
} from 'react-native-paper';
import { CompositionNames } from '../compositions';
import useAuth from '../hooks/useAuth';
import { Containers, Spacing } from '../styles';
import { FlipView } from './FlipView';
import { Thumbnail } from './Thumbnail';

export type PostInfo = {
  id: number;
  name: CompositionNames;
  source: ImageSourcePropType;
  like: boolean;
};

type PostProps = {
  post: PostInfo;
  onLike: (postId: number) => void;
  onDelete?: (postId: number) => void;
  onPublish?: (postId: number) => void;
};

type PostImageProps = PostProps;

function PostImage({
  post,
  onLike,
  onDelete,
  onPublish,
}: PostImageProps): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLike = () => {
    onLike(post.id);
  };

  const handleDelete = () => {
    onDelete && onDelete(post.id);
    closeMenu();
  };

  const handlePublish = () => {
    onPublish && onPublish(post.id);
    closeMenu();
  };

  return (
    <Surface style={style.frontItem}>
      <View style={style.iconsContainer}>
        {onDelete && onPublish && (
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
        )}
        <IconButton
          icon={post.like ? 'heart' : 'heart-outline'}
          mode="contained"
          onPress={handleLike}
        />
      </View>
      <Thumbnail source={post.source} />
    </Surface>
  );
}

function PostInfo(): JSX.Element {
  const { userData } = useAuth();

  return (
    <Surface style={style.backItem}>
      <Text>Hello World!</Text>
      <View style={style.userInfo}>
        {userData ? (
          <Avatar.Image
            source={{ uri: userData.avatar }}
            size={32}
            style={style.avatar}
          />
        ) : (
          <Avatar.Icon icon="account" size={32} style={style.avatar} />
        )}
        <Text variant="bodySmall">User Name</Text>
      </View>
    </Surface>
  );
}

export function Post(props: PostProps): JSX.Element {
  return <FlipView front={<PostImage {...props} />} back={<PostInfo />} />;
}

const style = StyleSheet.create({
  iconsContainer: {
    ...Containers.overlayed,
    flex: 1,
    flexDirection: 'column',
    right: 0,
  },
  frontItem: {
    ...Containers.rounded,
  },
  backItem: {
    ...Containers.centered,
    ...Containers.card,
    ...Containers.rounded,
  },
  userInfo: {
    ...Containers.hcentered,
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: Spacing.small,
  },
  avatar: {
    marginRight: Spacing.small,
  },
});
