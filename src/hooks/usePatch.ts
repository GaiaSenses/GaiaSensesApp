/**
 * @format
 */

import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import PureData, { AudioOptions } from '../../modules/PureData';

export type Patch = {
  id: number;
  start: (options?: Partial<AudioOptions>) => void;
  stop: () => void;
  send: (sym: string, val?: number) => void;
};

export default function usePatch(source: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const patchId = useRef(-1);

  useFocusEffect(
    useCallback(() => {
      const loadPatch = async () => {
        try {
          setLoaded(false);
          patchId.current = await PureData.loadPatch(source);
        } catch (e: any) {
          setError(e);
        } finally {
          setLoaded(true);
        }
      };

      if (source) {
        loadPatch();
      }

      return () => {
        PureData.destroyAudio();
        patchId.current = -1;
      };
    }, [source]),
  );

  const start = (options?: Partial<AudioOptions>) => {
    PureData.startAudio({
      sampleRate: options?.sampleRate || -1,
      outChannels: options?.outChannels || -1,
      inChannels: options?.inChannels || 0,
    });
  };

  const stop = () => {
    PureData.stopAudio();
  };

  const send = (sym: string, val?: number) => {
    if (val !== undefined) {
      PureData.send(sym, val);
    } else {
      PureData.sendBang(sym);
    }
  };

  const patch = { id: patchId.current, start, stop, send } as Patch;

  return { patch, loaded, error };
}
