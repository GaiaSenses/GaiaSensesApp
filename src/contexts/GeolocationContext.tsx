/**
 * @format
 */

import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import GetLocation from 'react-native-get-location';

type GeolocationInfo = {
  latitude?: number;
  longitude?: number;
};

type GeolocationProviderProps = PropsWithChildren<{}>;

export const GeolocationContext = createContext<GeolocationInfo>({});

export function GeolocationProvider({ children }: GeolocationProviderProps) {
  const [location, setLocation] = useState<GeolocationInfo>({});

  useEffect(() => {
    const getPosition = async () => {
      const { latitude, longitude } = await GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 1000,
      });
      setLocation({ latitude, longitude });
    };

    getPosition();
  }, []);

  return (
    <GeolocationContext.Provider value={location}>
      {children}
    </GeolocationContext.Provider>
  );
}
