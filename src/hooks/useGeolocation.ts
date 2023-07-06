/**
 * @format
 */

import { useContext } from 'react';
import { GeolocationContext } from '../contexts/GeolocationContext';

export default function useGeolocation() {
  const location = useContext(GeolocationContext);
  return location;
}
