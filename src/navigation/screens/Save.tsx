/**
 * @format
 */

import React, { useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Containers } from '../../styles';
import { AppStackScreenProps } from '../types';

type SaveProps = AppStackScreenProps<'Save'>;

export function Save({ navigation, route }: SaveProps): JSX.Element {
  const [text, setText] = useState('');
  const { imageUri } = route.params;

  const handleSave = () => {
    console.log('saved');
    navigation.pop();
  };

  return (
    <View style={style.container}>
      <Image
        source={{ uri: imageUri }}
        resizeMode="center"
        style={style.image}
      />
      <TextInput
        label="What's in your mind?"
        value={text}
        onChangeText={(newText) => setText(newText)}
        maxLength={200}
        multiline
        numberOfLines={5}
        style={style.textInput}
      />
      <Button mode="contained" onPress={() => handleSave()}>
        Save
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    ...Containers.vcentered,
  },
  textInput: {
    width: '90%',
  },
  image: {
    width: '90%',
    height: '50%',
  },
});
