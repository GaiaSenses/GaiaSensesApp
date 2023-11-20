/**
 * @format
 */

import { weatherClient } from './lib/client';

type RainfallResponse = {
  city: string;
  state: string;
  lat: number;
  lon: number;
  rain: {
    '1h'?: number;
    '3h'?: number;
  };
  snow: {
    '1h'?: number;
    '3h'?: number;
  };
  wind: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    grnd_level?: number;
  };
  clouds: number;
  visibility: number;
};

type FireResponse = {
  city: string;
  state: string;
  count: number;
  events: Array<{
    lat: number;
    lon: number;
    dist: number;
  }>;
};

type LightningResponse = {
  city: string;
  state: string;
  count: number;
  events: Array<{
    lat: number;
    lon: number;
    dist: number;
  }>;
};

export const weatherService = {
  getRainfall: async (lat: number, lon: number) => {
    const res = await weatherClient.get<RainfallResponse>('/rainfall', {
      params: { lat, lon },
    });
    return res.data;
  },
  getFireHotspots: async (lat: number, lon: number) => {
    const res = await weatherClient.get<FireResponse>('/fire', {
      params: { lat, lon },
    });
    return res.data;
  },
  getLightningFlashes: async (lat: number, lon: number) => {
    const res = await weatherClient.get<LightningResponse>('/lightning', {
      params: { lat, lon },
    });
    return res.data;
  },
};
