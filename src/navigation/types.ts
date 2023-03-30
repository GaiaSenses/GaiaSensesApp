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

// root drawer navigator
export type RootDrawerParamList = {
  Root: NavigatorScreenParams<AppStackParamList>;
};

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
  DrawerScreenProps<RootDrawerParamList, T>;

// root stack
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// app stack navigator
export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList>;
  Save: { imageUri: string };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AppStackParamList, T>,
    RootDrawerScreenProps<keyof RootDrawerParamList>
  >;

// app tab navigator
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
