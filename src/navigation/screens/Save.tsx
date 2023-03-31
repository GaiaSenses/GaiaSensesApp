/**
 * @format
 */

import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { postService } from '../../services/post';
import { Containers } from '../../styles';
import { AppStackScreenProps } from '../types';

type SaveProps = AppStackScreenProps<'Save'>;

export function Save({ navigation, route }: SaveProps): JSX.Element {
  const [text, setText] = useState('');
  const [showMissingInput, setShowMissingInput] = useState(false);

  const { imageUri } = route.params;

  const isInputMissing = (input: string) => input.trim() === '';

  const handleSave = async () => {
    if (isInputMissing(text)) {
      setShowMissingInput(true);
      return;
    }

    try {
      await postService.create({ url: imageUri, content: text });
      navigation.pop();
    } catch (e) {
      console.log((e as AxiosError).response?.data);
    }
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
        error={showMissingInput && isInputMissing(text)}
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
