import useAxiosInstance from '@hooks/useAxiosInstance';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@stores/index';
import {
  setFeedbacks,
  setLoading,
  setError,
} from '@stores/slices/lecturerFeedbackSlice';
import type { LecturerFeedback } from '@custom-types/lecturerFeedback';
import { isAxiosError } from '@custom-types/errors';
import { BACKEND_BASE_URL } from '@/config';

const FALLBACK_UUID = 'f2a26e3f-3b50-44ac-a7f9-02fe3b41cf6a'; // TODO: Remove fallback after testing

const useLecturerFeedbackApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);
  const dispatch = useDispatch<AppDispatch>();

  const extractErrorMessage = (
    error: unknown,
    defaultMessage: string
  ): string => {
    if (isAxiosError(error)) {
      return (
        error.response?.data?.error?.message ?? error.message ?? defaultMessage
      );
    }
    return defaultMessage;
  };

  const getLecturerFeedback = useCallback(
    async (studentUuid: string) => {
      console.log('[DEBUG] getLecturerFeedback called with UUID:', studentUuid);
      console.log('[DEBUG] Base URL:', BACKEND_BASE_URL);
      console.log('[DEBUG] Full URL:', `${BACKEND_BASE_URL}/lecturer-feedback/${studentUuid}`);
      
      dispatch(setLoading());
      try {
        const response = await axiosInstance.get<LecturerFeedback[]>(
          `/lecturer-feedback/${studentUuid}`
        );

        console.log('[DEBUG] Lecturer feedback response:', response.data);
        console.log('[DEBUG] Lecturer feedback response length:', response.data?.length);
        
        // If empty array, try fallback
        if (!response.data || response.data.length === 0) {
          console.warn(
            `[DEBUG] Empty data for UUID ${studentUuid}, trying fallback UUID ${FALLBACK_UUID}`
          );

          try {
            const fallbackResponse = await axiosInstance.get<LecturerFeedback[]>(
              `/lecturer-feedback/${FALLBACK_UUID}`
            );

            console.log('[DEBUG] Fallback lecturer feedback response:', fallbackResponse.data);
            dispatch(setFeedbacks(fallbackResponse.data));
            return fallbackResponse.data;
          } catch (fallbackError: unknown) {
            console.error('[DEBUG] Fallback also failed:', fallbackError);
            const errorMessage = extractErrorMessage(
              fallbackError,
              'Failed to fetch lecturer feedback'
            );
            dispatch(setError(errorMessage));
            throw fallbackError;
          }
        }
        
        dispatch(setFeedbacks(response.data));
        return response.data;
      } catch (error: unknown) {
        console.warn(
          `[DEBUG] Error for UUID ${studentUuid}, trying fallback UUID ${FALLBACK_UUID}`
        );

        try {
          const fallbackResponse = await axiosInstance.get<LecturerFeedback[]>(
            `/lecturer-feedback/${FALLBACK_UUID}`
          );

          console.log('[DEBUG] Fallback lecturer feedback response:', fallbackResponse.data);
          dispatch(setFeedbacks(fallbackResponse.data));
          return fallbackResponse.data;
        } catch (fallbackError: unknown) {
          console.error('[DEBUG] Fallback also failed:', fallbackError);
          const errorMessage = extractErrorMessage(
            fallbackError,
            'Failed to fetch lecturer feedback'
          );
          dispatch(setError(errorMessage));
          throw fallbackError;
        }
      }
    },
    [axiosInstance, dispatch]
  );

  return {
    getLecturerFeedback,
  };
};

export default useLecturerFeedbackApi;
