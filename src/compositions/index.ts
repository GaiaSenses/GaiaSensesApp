/**
 * @format
 */

import raw from 'raw.macro';
import { CompositionProps } from '../components/Composition';

export enum CompositionNames {
  CHAOS_TREE = 'Chaos Tree',
  CURVES = 'Curves',
  LLUVIA = 'Lluvia',
  RECTANGLES = 'Rectangles',
  WEATHER_TREE = 'Weather Tree',
  ZIG_ZAG = 'Zig Zag',
}

export const CompositionMap: Record<string, Omit<CompositionProps, 'play'>> = {
  [CompositionNames.CHAOS_TREE]: {
    sketch: raw('./p5/chaosTree.js'),
    patchSource: '',
  },
  [CompositionNames.CURVES]: {
    sketch: raw('./p5/curves.js'),
    patchSource: '',
  },
  [CompositionNames.LLUVIA]: {
    sketch: raw('./p5/lluvia.js'),
    patchSource: raw('./pd/lluvia.pd'),
    onPlay: (patch) => {
      patch.send(`fps_${patch.id}`, 1000 / 5);
      patch.start();
    },
  },
  [CompositionNames.RECTANGLES]: {
    sketch: raw('./p5/rectangles.js'),
    patchSource: '',
  },
  [CompositionNames.WEATHER_TREE]: {
    sketch: raw('./p5/weatherTree.js'),
    patchSource: '',
  },
  [CompositionNames.ZIG_ZAG]: {
    sketch: raw('./p5/zigzag.js'),
    patchSource: '',
  },
};
