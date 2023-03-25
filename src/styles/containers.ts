/**
 * @format
 */

import { StyleSheet } from 'react-native';

export const Containers = StyleSheet.create({
  rounded: {
    borderRadius: 10,
  },
  roundedTop: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  card: {
    width: 180,
    height: 180,
  },
  vcentered: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  hcentered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayed: {
    position: 'absolute',
    zIndex: 2,
  },
});
