/**
 * @format
 */

import { weatherClient } from './lib/client';

export const weatherService = {
  getRainfall: async (lat: number, lon: number) => {
    const res = await weatherClient.get('/rainfall', { params: { lat, lon } });
    return res.data;
  },
  getFireSpots: async (lat: number, lon: number) => {
    const res = await weatherClient.get('/fire', { params: { lat, lon } });
    return res.data;
  },
  getLightningFlashes: async (lat: number, lon: number) => {
    const res = await weatherClient.get('/lightning', { params: { lat, lon } });
    return res.data;
  },
};
