/**
 * @format
 */

import raw from 'raw.macro';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import usePatch, { Patch } from '../hooks/usePatch';
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

export type CompositionProps = {
  sketch: string;
  patchSource: string;
  play: boolean;
  onPlay?: (patch: Patch) => void;
  onStop?: (patch: Patch) => void;
  onSaveCanvas?: (data: string) => void;
};

export type CompositionHandle = {
  saveCanvas: () => void;
};

export const Composition = forwardRef<CompositionHandle, CompositionProps>(
  (
    {
      sketch,
      patchSource,
      play,
      onPlay,
      onStop,
      onSaveCanvas,
    }: CompositionProps,
    ref,
  ): JSX.Element => {
    const { patch, loaded } = usePatch(patchSource);
    const webviewRef = useRef<WebView>(null);

    useEffect(() => {
      if (loaded) {
        if (play && onPlay) {
          onPlay(patch);
        } else if (!play && onStop) {
          onStop(patch);
        } else if (!play) {
          patch.stop();
        }
      }
    }, [loaded, onPlay, onStop, patch, play]);

    useImperativeHandle(
      ref,
      () => {
        const saveCanvas = () => {
          webviewRef.current?.injectJavaScript(`(() => {
            const canvas = document.querySelector('canvas');
            const dataURL = canvas.toDataURL('image/jpeg', 0.2);

            window.ReactNativeWebView.postMessage(dataURL);
          })();
          true;
          `);
        };
        return { saveCanvas };
      },
      [],
    );

    return (
      <View style={style.container}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: getWebviewHTML(sketch) }}
          scrollEnabled={false}
          bounces={false}
          setBuiltInZoomControls={false}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          containerStyle={style.webview}
          onMessage={(e) => onSaveCanvas && onSaveCanvas(e.nativeEvent.data)}
        />
      </View>
    );
  },
);

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
