/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Menu,
  IconButton,
  Divider,
  Text,
  Avatar,
  Surface,
  Badge,
} from 'react-native-paper';

import useAuth from '../hooks/useAuth';
import { Containers, Spacing } from '../styles';
import { FlipView } from './FlipView';
import { Thumbnail } from './Thumbnail';

export type PostInfo = {
  id: number;
  userId: number;
  user: { name: string; avatar: string };
  content: string;
  url: string;
  likes: LikeInfo;
  published: boolean;
};

export type LikeInfo = {
  count: number;
  liked: boolean;
  users: any[];
};

type PostProps = {
  post: PostInfo;
  onLike: (postId: number, likeInfo: LikeInfo) => void;
  onDelete?: (postId: number) => void;
  onPublish?: (postId: number, publishInfo: boolean) => void;
};

type PostFrontProps = PostProps;

function PostFront({
  post,
  onLike,
  onDelete,
  onPublish,
}: PostFrontProps): JSX.Element {
  const { userData } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [likeInfo, setLikeInfo] = useState<LikeInfo>({
    count: 0,
    liked: false,
    users: [],
  });

  useEffect(() => {
    setLikeInfo(post.likes);
  }, [post.likes]);

  useEffect(() => {
    setIsPublished(post.published);
  }, [post.published]);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLike = () => {
    const isLiked = likeInfo.liked;
    const newLikeInfo: LikeInfo = {
      liked: !isLiked,
      count: isLiked ? likeInfo.count - 1 : likeInfo.count + 1,
      users: isLiked
        ? [...likeInfo.users].filter((user) => user.name !== userData?.name)
        : [...likeInfo.users].concat([{ name: userData?.name }]),
    };

    setLikeInfo(newLikeInfo);
    onLike(post.id, newLikeInfo);
  };

  const handleDelete = () => {
    onDelete && onDelete(post.id);
    closeMenu();
  };

  const handlePublish = () => {
    const newIsPublished = !isPublished;

    setIsPublished(newIsPublished);
    onPublish && onPublish(post.id, newIsPublished);

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
              disabled={isPublished}
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
        <View>
          <IconButton
            icon={likeInfo.liked ? 'heart' : 'heart-outline'}
            mode="contained"
            onPress={handleLike}
          />
          <Badge visible={likeInfo.count !== 0} style={style.badge}>
            {likeInfo.count}
          </Badge>
        </View>
      </View>
      <Thumbnail source={{ uri: post.url }} />
    </Surface>
  );
}

function PostBack({ post }: { post: PostInfo }): JSX.Element {
  return (
    <Surface style={style.backItem}>
      <Text>{post.content}</Text>
      <View style={style.userInfo}>
        <Avatar.Image
          source={{ uri: post.user.avatar }}
          size={32}
          style={style.avatar}
        />
        <Text variant="bodySmall">{post.user.name}</Text>
      </View>
    </Surface>
  );
}

export function Post(props: PostProps): JSX.Element {
  return (
    <FlipView
      front={<PostFront {...props} />}
      back={<PostBack post={props.post} />}
    />
  );
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
  badge: {
    position: 'absolute',
  },
});
