/**
 * @format
 */

import React, { useCallback, useRef } from 'react';
import Composition from '../components/Composition';
import raw from 'raw.macro';
import { useFocusEffect } from '@react-navigation/native';
import PureDataModule from '../../modules/PureData';

export default function Lluvia({ play }: { play: boolean }): JSX.Element {
  const patchId = useRef(-1);

  useFocusEffect(
    useCallback(() => {
      PureDataModule.loadPatch(raw('./pd/lluvia.pd'))
        .then((id) => {
          patchId.current = id;
          PureDataModule.send(`fps_${id}`, 1000 / 5);
          if (play) {
            PureDataModule.startAudio(-1, 0, -1);
          }
        })
        .catch((err) => console.error(err));

      return () => {
        PureDataModule.destroyAudio();
        patchId.current = -1;
      };
    }, [play]),
  );

  return <Composition sketch={raw('./p5/lluvia.js')} />;
}
