/**
 * @format
 */

import React from 'react';
import Composition from '../Composition';
import raw from 'raw.macro';

export function Rectangles(): JSX.Element {
  return <Composition sketch={raw('./p5/rectangles.js')} />;
}
