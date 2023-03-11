/**
 * @format
 */

import { NativeModules } from 'react-native';

const { PureDataModule } = NativeModules;

interface PureData {
  loadPatch(source: string): Promise<number>;
  startAudio(sampleRate: number, inChannels: number, outChannels: number): void;
  stopAudio(): void;
  destroyAudio(): void;
  send(symbol: string, value: number): void;
}

export default PureDataModule as PureData;
