/**
 * @format
 */

import { DrawerScreenProps } from '@react-navigation/drawer';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// drawer navigator
export type RootParamList = {
  Root: NavigatorScreenParams<AppStackParamList>;
};

export type RootScreenProps<T extends keyof RootParamList> = DrawerScreenProps<
  RootParamList,
  T
>;

// stack navigator
export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList>;
  Save: { imageUri: string };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AppStackParamList, T>,
    RootScreenProps<keyof RootParamList>
  >;

// tab navigator
export type AppTabParamList = {
  Create: undefined;
  Discover: undefined;
  Gallery: undefined;
};

export type AppTabScreenProps<T extends keyof AppTabParamList> =
  CompositeScreenProps<
    MaterialBottomTabScreenProps<AppTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;
