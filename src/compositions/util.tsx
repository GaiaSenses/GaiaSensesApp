/**
 * @format
 */

import React, { forwardRef } from 'react';
import {
  CompositionHandle,
  CompositionViewProps,
  CompositionView,
} from '../components/CompositionView';
import { Composition } from '.';
import { Patch } from '../hooks/usePatch';
import {
  BrightnessTemperatureResponse,
  FireResponse,
  LightningResponse,
  RainfallResponse,
} from '../services/weather';

export type CompositionProps = Pick<CompositionViewProps, 'play' | 'onLoad'> & {
  weather?: RainfallResponse;
  lightning?: LightningResponse;
  fire?: FireResponse;
  brightness?: BrightnessTemperatureResponse;
};

export const ChaosTree = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Chaos Tree'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const Curves = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Curves'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const Lluvia = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Lluvia'];
    const { weather } = props;
    const rain = (weather?.rain && weather.rain['1h']) || 5;

    const handlePlay = (patch: Patch) => {
      patch.send(`fps_${patch.id}`, 1000 / rain);
      patch.start();
    };

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        onPlay={handlePlay}
        {...props}
      />
    );
  },
);

export const Rectangles = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Rectangles'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const WeatherTree = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Weather Tree'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const ZigZag = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Zig Zag'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const DigitalOrganism = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } =
      Composition.sources['Digital Organism'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const PaintBrush = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Paint Brush'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const StormEye = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Storm Eye'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const ColorFlower = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Color Flower'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const CloudBubble = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Cloud Bubble'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const Bonfire = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } = Composition.sources['Bonfire'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);

export const LightningTrees = forwardRef<CompositionHandle, CompositionProps>(
  (props, ref) => {
    const { sketch, patch: patchSource } =
      Composition.sources['Lightning Trees'];

    return (
      <CompositionView
        ref={ref}
        sketch={sketch}
        patchSource={patchSource}
        {...props}
      />
    );
  },
);
