/**
 * @format
 */

import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// main navigator
export type AppTabParamList = {
  CreateTab: NavigatorScreenParams<CreateStackParamList>;
  DiscoverTab: undefined;
  GalleryTab: undefined;
};

export type AppTabScreenProps<T extends keyof AppTabParamList> =
  MaterialBottomTabScreenProps<AppTabParamList, T>;

// navigator from 'create' tab
export type CreateStackParamList = {
  Create: undefined;
  Save: { imageUri: string };
};

export type CreateStackScreenProps<T extends keyof CreateStackParamList> =
  CompositeScreenProps<
    StackScreenProps<CreateStackParamList, T>,
    AppTabScreenProps<keyof AppTabParamList>
  >;
