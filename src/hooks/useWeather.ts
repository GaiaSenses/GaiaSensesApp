/**
 * @format
 */

import { useState, useEffect } from 'react';
import GetLocation from 'react-native-get-location';
import { weatherService } from '../services/weather';

type Cache = { lightning: any; weather: any; fire: any };

const cache: Cache = {
  lightning: null,
  weather: null,
  fire: null,
};

export function useLightning() {
  const [lightning, setLightning] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const { latitude, longitude } = await GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 1000,
      });

      const flashes = await weatherService.getLightningFlashes(
        latitude,
        longitude,
      );

      cache['lightning'] = flashes;
      setLightning(flashes);
    };

    if (cache['lightning']) {
      setLightning(cache['lightning']);
    } else {
      fetchData();
    }
  }, [lightning]);

  const refreshLightning = () => {
    cache['lightning'] = null;
    setLightning({});
  };

  return { lightning, refreshLightning };
}

export function useWeather() {
  const [weather, setWeather] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const { latitude, longitude } = await GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 1000,
      });

      const rainfall = await weatherService.getRainfall(latitude, longitude);
      console.log(rainfall);
      cache['weather'] = rainfall;
      setWeather(rainfall);
    };

    if (cache['weather']) {
      setWeather(cache['weather']);
    } else {
      fetchData();
    }
  }, [weather]);

  const refreshWeather = () => {
    cache['weather'] = null;
    setWeather(undefined);
  };

  return { weather, refreshWeather };
}
