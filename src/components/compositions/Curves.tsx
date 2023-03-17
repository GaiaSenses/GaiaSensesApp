/**
 * @format
 */

import React from 'react';
import Composition from '../Composition';
import raw from 'raw.macro';

export function Curves(): JSX.Element {
  return <Composition sketch={raw('./p5/curves.js')} />;
}
