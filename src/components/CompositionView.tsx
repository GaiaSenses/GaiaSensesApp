/**
 * @format
 */

import raw from 'raw.macro';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
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
</head>
<body>
  <main></main>
  <script>${raw('../../node_modules/p5/lib/p5.min.js')}</script>
  <script>${sketch}</script>
</body>
</html>
`;

export type CompositionViewProps = {
  sketch: string;
  patchSource: string;
  play: boolean;
  onPlay?: (patch: Patch) => void;
  onStop?: (patch: Patch) => void;
  onSaveCanvas?: (data: string) => void;
  onLoad?: () => void;
};

export type CompositionHandle = {
  saveCanvas: () => Promise<any>;
  setVariable: (name: string, value: any) => void;
};

export const CompositionView = forwardRef<
  CompositionHandle,
  CompositionViewProps
>(
  (
    { sketch, patchSource, play, onPlay, onStop, onLoad }: CompositionViewProps,
    ref,
  ): JSX.Element => {
    const { patch, loaded } = usePatch(patchSource);
    const [message, setMessage] = useState<{ caller: string; payload: any }>();
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
        const saveCanvas = async () => {
          webviewRef.current?.injectJavaScript(`(() => {
            const canvas = document.querySelector('canvas');
            const dataURL = canvas.toDataURL('image/jpeg', 0.2);
            const msg = JSON.stringify({ caller: 'saveCanvas', payload: dataURL });

            window.ReactNativeWebView.postMessage(msg);
          })();
          true;
          `);

          return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
              if (message) {
                const { payload } = message;
                setMessage(undefined);
                resolve(payload);
              } else if (Date.now() - start > 2000) {
                reject(new Error('timeout waiting for canvas data URI'));
              } else {
                setTimeout(check, 50);
              }
            };
            check();
          });
        };

        const setVariable = (name: string, value: any) => {
          webviewRef.current?.injectJavaScript(`(() =>{
            window.App.${name} = JSON.parse('${JSON.stringify(value)}');
          })();
          true;
          `);
        };

        return { saveCanvas, setVariable };
      },
      [message],
    );

    const injectGlobalVariable = () => `
      window.App = {};
      true;
    `;

    const handleMessage = (event: WebViewMessageEvent) => {
      const msg = JSON.parse(event.nativeEvent.data);
      setMessage(msg);
    };

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
          onMessage={handleMessage}
          injectedJavaScriptBeforeContentLoaded={injectGlobalVariable()}
          onLoadStart={() => onLoad && onLoad()}
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
