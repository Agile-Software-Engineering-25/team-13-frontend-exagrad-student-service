import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';
import type { Units } from '@custom-types/weather';
import type { getCurrentWeatherReturn } from '@custom-types/brighsky';

const useApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  const getCurrentWeather = useCallback(
    async (latitude: number, longitude: number, units: Units) => {
      const response = await axiosInstance.get('/current_weather', {
        params: { lat: latitude, lon: longitude, units },
      });
      return response.data as getCurrentWeatherReturn;
    },
    [axiosInstance]
  );

  return { getCurrentWeather };
};

export default useApi;
