/**
 * @format
 */

import { useState, useEffect } from 'react';
import {
  BrightnessTemperatureResponse,
  FireResponse,
  LightningResponse,
  RainfallResponse,
  weatherService,
} from '../services/weather';
import useGeolocation from './useGeolocation';

type Cache = {
  lightning: LightningResponse | null;
  weather: RainfallResponse | null;
  fire: FireResponse | null;
  brightness: BrightnessTemperatureResponse | null;
};

const cache: Cache = {
  lightning: null,
  weather: null,
  fire: null,
  brightness: null,
};

export function useLightning() {
  const { latitude, longitude } = useGeolocation();
  const [lightning, setLightning] = useState<LightningResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        const res = await weatherService.getLightningFlashes(
          latitude,
          longitude,
        );

        cache.lightning = res;
        setLightning(res);
      }
    };

    if (cache.lightning) {
      setLightning(cache.lightning);
    } else {
      fetchData();
    }
  }, [latitude, longitude]);

  const refreshLightning = () => {
    cache.lightning = null;
    setLightning(undefined);
  };

  return { lightning, refreshLightning };
}

export function useWeather() {
  const { latitude, longitude } = useGeolocation();
  const [weather, setWeather] = useState<RainfallResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        const res = await weatherService.getRainfall(latitude, longitude);

        cache.weather = res;
        setWeather(res);
      }
    };

    if (cache.weather) {
      setWeather(cache.weather);
    } else {
      fetchData();
    }
  }, [latitude, longitude]);

  const refreshWeather = () => {
    cache.weather = null;
    setWeather(undefined);
  };

  return { weather, refreshWeather };
}

export function useFire() {
  const { latitude, longitude } = useGeolocation();
  const [fire, setFire] = useState<FireResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        const res = await weatherService.getFireHotspots(latitude, longitude);

        cache.fire = res;
        setFire(res);
      }
    };

    if (cache.fire) {
      setFire(cache.fire);
    } else {
      fetchData();
    }
  }, [latitude, longitude]);

  const refreshFire = () => {
    cache.fire = null;
    setFire(undefined);
  };

  return { fire, refreshFire };
}

export function useBrightnessTemperature() {
  const { latitude, longitude } = useGeolocation();
  const [brightness, setBrightness] = useState<BrightnessTemperatureResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        const res = await weatherService.getBrightnessTemperature(
          latitude,
          longitude,
        );

        cache.brightness = res;
        setBrightness(res);
      }
    };

    if (cache.brightness) {
      setBrightness(cache.brightness);
    } else {
      fetchData();
    }
  }, [latitude, longitude]);

  const refreshBrightness = () => {
    cache.brightness = null;
    setBrightness(undefined);
  };

  return { brightness, refreshBrightness };
}
