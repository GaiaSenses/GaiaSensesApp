/**
 * @format
 */

import { useState, useEffect } from 'react';
import { weatherService } from '../services/weather';
import useGeolocation from './useGeolocation';

type Cache = { lightning: any; weather: any; fire: any };

const cache: Cache = {
  lightning: null,
  weather: null,
  fire: null,
};

export function useLightning() {
  const { latitude, longitude } = useGeolocation();
  const [lightning, setLightning] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        const flashes = await weatherService.getLightningFlashes(
          latitude,
          longitude,
        );

        cache.lightning = flashes;
        setLightning(flashes);
      }
    };

    if (cache.lightning) {
      setLightning(cache.lightning);
    } else {
      fetchData();
    }
  }, [lightning, latitude, longitude]);

  const refreshLightning = () => {
    cache.lightning = null;
    setLightning({});
  };

  return { lightning, refreshLightning };
}

export function useWeather() {
  const { latitude, longitude } = useGeolocation();
  const [weather, setWeather] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        const rainfall = await weatherService.getRainfall(latitude, longitude);

        cache.weather = rainfall;
        setWeather(rainfall);
      }
    };

    if (cache.weather) {
      setWeather(cache.weather);
    } else {
      fetchData();
    }
  }, [weather, latitude, longitude]);

  const refreshWeather = () => {
    cache.weather = null;
    setWeather(undefined);
  };

  return { weather, refreshWeather };
}

export function useFire() {
  const { latitude, longitude } = useGeolocation();
  const [fire, setFire] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        const hotspots = await weatherService.getFireHotspots(
          latitude,
          longitude,
        );

        cache.fire = hotspots;
        setFire(hotspots);
      }
    };

    if (cache.fire) {
      setFire(cache.fire);
    } else {
      fetchData();
    }
  }, [fire, latitude, longitude]);

  const refreshFire = () => {
    cache.fire = null;
    setFire(undefined);
  };

  return { fire, refreshFire };
}
