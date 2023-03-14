/**
 * @format
 */

import React from 'react';
import Composition from '../Composition';
import raw from 'raw.macro';

export default function WeatherTree(): JSX.Element {
  return <Composition sketch={raw('./p5/weatherTree.js')} />;
}
