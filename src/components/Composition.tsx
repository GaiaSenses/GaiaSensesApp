/**
 * @format
 */

import raw from 'raw.macro';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { Containers } from '../styles';

const getWebviewHTML = (sketch: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1" />
  <style>
    * {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  </style>
  <script>${raw('../../node_modules/p5/lib/p5.min.js')}</script>
  <script>${sketch}</script>
</head>
<body>
  <main></main>
</body>
</html>
`;

export default function Composition(props: { sketch: string }): JSX.Element {
  return (
    <View style={style.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: getWebviewHTML(props.sketch) }}
        scrollEnabled={false}
        bounces={false}
        setBuiltInZoomControls={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        containerStyle={style.webview}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    height: '100%',
  },
  webview: {
    ...Containers.rounded,
  },
});
