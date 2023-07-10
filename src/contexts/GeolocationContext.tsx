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
      try {
        const { latitude, longitude } = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 3000,
        });
        setLocation({ latitude, longitude });
      } catch (e) {
        console.error(e);
      }
    };

    getPosition();
  }, []);

  return (
    <GeolocationContext.Provider value={location}>
      {children}
    </GeolocationContext.Provider>
  );
}
