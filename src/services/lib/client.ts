/**
 * @format
 */

import axios from 'axios';
import { APP_API_URL, WEATHER_API_URL } from '@env';

export const appClient = axios.create({
  baseURL: APP_API_URL,
});

export const weatherClient = axios.create({
  baseURL: WEATHER_API_URL,
});
