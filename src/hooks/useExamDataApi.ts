import { useCallback } from 'react';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import type { CourseResponse } from '@custom-types/examData';
import { useUser } from '@hooks/useUser';

const useExamDataApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);
  const { getUserId } = useUser();

  const getAllCourses = useCallback(async (): Promise<CourseResponse[]> => {
    const studentId = getUserId();
    if (!studentId) {
      throw new Error('Student ID not available');
    }
    const response = await axiosInstance.get(
      `/data/students/${studentId}/courses`
    );
    return response.data as CourseResponse[];
  }, [axiosInstance, getUserId]);

  return { getAllCourses };
};

export default useExamDataApi;
