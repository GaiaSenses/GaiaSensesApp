/**
 * @format
 */

import { NativeModules } from 'react-native';

export type AudioOptions = {
  sampleRate: number;
  inChannels: number;
  outChannels: number;
};

export interface IPureDataModule {
  loadPatch(source: string): Promise<number>;
  startAudio(options: AudioOptions): void;
  stopAudio(): void;
  destroyAudio(): void;
  send(symbol: string, value: number): void;
  sendBang(symbol: string): void;
}

const { PureDataModule } = NativeModules;
const PureData = PureDataModule as IPureDataModule;

export default PureData;
