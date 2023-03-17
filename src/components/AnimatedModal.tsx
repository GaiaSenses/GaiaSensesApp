/**
 * @format
 */

import React, { PropsWithChildren } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Spacing, Typography } from '../styles';
import { Containers } from '../styles/containers';

type AnimatedModalProps = PropsWithChildren<{ onQuit: () => void }>;

type HeaderProps = {
  title: string;
  onQuit: () => void;
};

function ModalHeader({ title, onQuit }: HeaderProps): JSX.Element {
  return (
    <View style={style.header}>
      <Text style={style.title}>{title}</Text>
      <Icon
        name="close"
        size={style.title.fontSize}
        color={style.title.color}
        onPress={() => onQuit()}
      />
    </View>
  );
}

export default function AnimatedModal({
  children,
  onQuit,
}: AnimatedModalProps): JSX.Element {
  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={style.overlay}>
        <View style={style.modal}>
          <ModalHeader title="Art Type" onQuit={onQuit} />
          {children}
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modal: {
    ...Containers.vcentered,
    ...Containers.roundedTop,
    elevation: 5,
    marginTop: 100,
    padding: Spacing.large,
    shadowColor: Colors.dark.border,
    backgroundColor: Colors.dark.background,
  },
  header: {
    ...Containers.hcentered,
    width: '100%',
  },
  title: {
    ...Typography.header,
    color: Colors.dark.text,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
