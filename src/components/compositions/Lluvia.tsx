/**
 * @format
 */

import React, { useEffect } from 'react';
import Composition from '../Composition';
import raw from 'raw.macro';
import usePatch from '../../hooks/usePatch';

export default function Lluvia({ play }: { play: boolean }): JSX.Element {
  const { patch, loaded } = usePatch(raw('./pd/lluvia.pd'));

  useEffect(() => {
    if (loaded) {
      if (play) {
        patch.send(`fps_${patch.id}`, 1000 / 5);
        patch.start();
      } else {
        patch.stop();
      }
    }
  }, [loaded, patch, play]);

  return <Composition sketch={raw('./p5/lluvia.js')} />;
}
