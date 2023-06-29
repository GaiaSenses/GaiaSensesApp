/**
 * @format
 */

import raw from 'raw.macro';

export namespace Composition {
  export enum Names {
    CHAOS_TREE = 'Chaos Tree',
    CURVES = 'Curves',
    LLUVIA = 'Lluvia',
    RECTANGLES = 'Rectangles',
    WEATHER_TREE = 'Weather Tree',
    ZIG_ZAG = 'Zig Zag',
    DIGITAL_ORGANISM = 'Digital Organism',
    PAINT_BRUSH = 'Paint Brush',
  }

  export const sources = {
    [Names.CHAOS_TREE]: {
      sketch: raw('./p5/chaosTree.js'),
      patch: '',
    },
    [Names.CURVES]: {
      sketch: raw('./p5/curves.js'),
      patch: '',
    },
    [Names.LLUVIA]: {
      sketch: raw('./p5/lluvia.js'),
      patch: raw('./pd/lluvia.pd'),
    },
    [Names.RECTANGLES]: {
      sketch: raw('./p5/rectangles.js'),
      patch: '',
    },
    [Names.WEATHER_TREE]: {
      sketch: raw('./p5/weatherTree.js'),
      patch: '',
    },
    [Names.ZIG_ZAG]: {
      sketch: raw('./p5/zigzag.js'),
      patch: '',
    },
    [Names.DIGITAL_ORGANISM]: {
      sketch: raw('./p5/digitalOrganism.js'),
      patch: '',
    },
    [Names.PAINT_BRUSH]: {
      sketch: raw('./p5/paintBrush.js'),
      patch: '',
    },
  };
}

export * from './util';
